import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import {
  Typography,
  Box,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { v4 as uuidV4 } from 'uuid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { styled } from '@material-ui/styles';
import useProfile from 'hooks/useProfile';

import { EventInfo } from '../../hooks/useEvents';
import EventCard from '../../components/EventCard';
import SkeletonCard from '../EventCard/SkeletonCard';
import { useEvents } from 'views/ValueStreamManagement/components/Events/hooks/useEvents';
import EmptyState from '../../components/EmptyState';
import EventsModal from '../EventsModal';
import Comments from '../../../Comments/components/CollapaseDrawer';
import { sortEventsByAsc, sortEventsByDesc } from '../utils';

import { useStyles } from './CollapseDrawer.styles';

const messageEmptyStateEvent ='Record key events that might affect the overall delivery performance of teams/processes';

const CustomAccordion = styled(AccordionItem)({
  marginTop: '6px !important',
  '& > .MuiAccordion-root.Mui-expanded': {
    marginTop: '6px !important',
    fontFamily: 'Open Sans'
  }
});

const CustomBoxAccordionContent = styled(Box)({
  '& > .makeStyles-wrapperSortedButton-118': {
    marginTop: 0,
  }
});

const CustomAccordionSummary = styled(AccordionSummary)({
  '& .MuiAccordionSummary-root.Mui-expanded': {
    height: 29
  },
  marginBottom: 22,
});

type AccordionItemsProps = {
  data: EventInfo[],
  sortType: string;
  accordionIndex: string;
  isLoadingEvents: boolean;
  title: string;
  deleteEvent?: (eventId) => void;
  isDescActive: boolean;
  handleAscClick: () => void;
  handleDescClick: () => void;
};

export const CollapseDrawer = () => {
  const {
    data: events,
    isLoadingEvents,
    removeEvent,
    mutate,
  } = useEvents();
  const [isDescActive, setIsDescActive] = useState(true);
  const [sortType, setSortType] = useState<'desc' | 'asc'>('desc');
  // force render the accordion item when sort is changed
  // when accordion is mounted nothing out change the accordio
  // to update each accordion item we are using the accordionIndex to force
  // react compare DOM nodes and update
  const [accordionKeys, setAccordionsKeys] = useState<string[]>([uuidV4(), uuidV4()]);
  const [sortedEvents, setSortedEvents] = useState<EventInfo[]>([]);

  useEffect(() => {
    if (events?.length) {
      if (sortType === 'desc') {
        setSortedEvents(sortEventsByDesc(events));
        setAccordionsKeys([uuidV4(), uuidV4()]);
      } else if (sortType === 'asc') {
        setSortedEvents(sortEventsByAsc(events));
        setAccordionsKeys([uuidV4(), uuidV4()]);
      } else {
        setSortedEvents(sortEventsByDesc(events));
        setAccordionsKeys([uuidV4(), uuidV4()]);
      }
    }
  }, [events, sortType]);


  const deleteEvent = async (eventId) => {
    if (eventId) {
      try {
        mutate(
          { data: { events: events.filter(e => e.id !== eventId ) } },
          false
        );
        await removeEvent(eventId);
      } catch(error) {
        console.log('error when delete event', error);
      }
    }
  };

  const handleDescClick = () => {
    setIsDescActive(true);
    setSortType('desc');
  };

  const handleAscClick = () => {
    setIsDescActive(false);
    setSortType('asc');
  };
  
  return (
    <>
      <CustomAccordion
        title='Meaningful Events'
        data={sortedEvents}
        sortType={sortType}
        accordionIndex={accordionKeys[0]}
        isLoadingEvents={isLoadingEvents}
        deleteEvent={deleteEvent}
        isDescActive={isDescActive}
        handleAscClick={handleAscClick}
        handleDescClick={handleDescClick}
      />
      <Comments />
    </>
  );
};

function AccordionItem({
  data,
  isLoadingEvents,
  title,
  deleteEvent,
  isDescActive,
  handleAscClick,
  handleDescClick,
  accordionIndex,
  sortType
}: AccordionItemsProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [isOpenEditModal, setOpenEditModal] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<string | undefined | number>(-1);
  const [currentEventToEdit, setEventToEdit] = useState<EventInfo | undefined>();
  const [dataList, setDataList] = useState<EventInfo[]>([]);
  const [confirmDeleteAlertOpen, setconfirmDeleteAlertOpen] = useState<boolean>(
    false,
  );

  useEffect(() => {
    if (data.length) {
      setDataList(data);
    }
  }, [sortType, data.length, accordionIndex])

  const openEditModal = (eventId?: string | number) => {
    if (eventId) {
      const eventInfoToEdit = data.find(eventInfo => eventInfo?.id === eventId);
      setEventToEdit(eventInfoToEdit);
    }
    setOpenEditModal(true);
  };

  const openAccordion = (event) => {
    /**
     *  Should open accordion when click on chevron icon or on the accordion title
     *  this was necessary to prevent propagate event and close when EventModal is
     *  opened
     */
    if (
      event?.target?.classList?.contains('MuiAccordionSummary-content') ||
      // capture only clicks on expand drawer box
      event?.target?.classList?.contains('expand-drawer') ||
      // capture click on title of accordion
      event?.target?.classList?.contains('MuiTypography-root') && event?.target?.classList?.contains('accordion-title') ||
      event?.target?.classList?.contains('MuiAccordionSummary-root') ||
      // when click on chevron svg icon to open
      event?.target?.tagName === 'path' && event?.target?.parentNode?.classList.contains('expand-drawer')
    ) {
      setOpen(isOpen => !isOpen);
    }
  };

  const closeAlerts = () => {
    setconfirmDeleteAlertOpen(false);
  };

  const deleteConfirmEvent = () => {
    setconfirmDeleteAlertOpen(false);
    deleteEvent?.(currentEventId);
  };

  const openDeleteConfirm = (eventId?: string | number) => {
    setconfirmDeleteAlertOpen(true);
    setCurrentEventId(eventId);
  };

  return(
    <Accordion 
      onClick={openAccordion}
      className={classes.accordion}
      expanded={open}
    >
      <CustomAccordionSummary
        expandIcon={<ExpandMoreIcon className='expand-drawer' />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography className={`${classes.heading} accordion-title`}>
          {title}
        </Typography>
        {/** Modal to Create Event and triggered by default + button */}
        <EventsModal enableDefaultPlusButton title='Create Event' />
        {/** Modal to Uodate Controlled and triggered by edit button */}
        <EventsModal
          isOpen={isOpenEditModal}
          title='Edit Event'
          setOpenEditModal={setOpenEditModal}
          eventInfo={currentEventToEdit}
        />
      </CustomAccordionSummary>
        <CustomBoxAccordionContent>
          {!data?.length && !isLoadingEvents 
            ? ''
            : title === 'Meaningful Events' &&
              <SortedEvent 
                isDescActive={isDescActive}
                handleAscClick={handleAscClick}
                handleDescClick={handleDescClick}
              />
          }
          <ListAccordion
              data={dataList}
            isLoadingEvents={isLoadingEvents}
            openDeleteConfirm={openDeleteConfirm}
            openEditModal={openEditModal}
          />
        </CustomBoxAccordionContent>
         <Dialog
          open={confirmDeleteAlertOpen}
          onClose={closeAlerts}
          // TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete this event?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {title}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAlerts} color="primary">
              No
            </Button>
            <Button onClick={deleteConfirmEvent} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
    </Accordion>
  );
}

function ListAccordion ({ data, isLoadingEvents, openEditModal, openDeleteConfirm } : {
  data: EventInfo[];
  isLoadingEvents: boolean;
  openEditModal: (eventId?: string | number) => void;
  openDeleteConfirm: (eventId?: string | number) => void;
}) {
  const classes = useStyles();
  const { data: userInfo } = useProfile();
  return (
    <Box className={classes.wrapperAccordionContent}>
     <Box display='flex' flexDirection='column'>
      {data?.length ? data.map((eventInfo) => {
        const formattedData = eventInfo.efective_date
          ? DateTime.fromISO(eventInfo.efective_date).toFormat('LLLL dd yyyy'): '';
          return (
            <EventCard
              key={eventInfo?.id || uuidV4()}
              title={eventInfo?.event_name}
              efectiveDate={formattedData}
              description={eventInfo?.description}
              authorName={eventInfo?.username}
              ownerId={eventInfo?.user_id}
              userId={userInfo?.user_id}
              openDeleteConfirm={openDeleteConfirm}
              eventId={eventInfo?.id}
              openEditModal={openEditModal}
            />
          );
      }) : null}
      {!data?.length && isLoadingEvents ? <><SkeletonCard /> <SkeletonCard /></>: null}
      {!data?.length && !isLoadingEvents ? (
        <Box className={classes.wrapperEmptyState}>
          <EmptyState message={messageEmptyStateEvent} typeText="an event" />
        </Box>
        ) : ''}
     </Box>
    </Box>
  )
};


function SortedEvent({ isDescActive, handleDescClick, handleAscClick }: {
  isDescActive: boolean,
  handleDescClick: () => void,
  handleAscClick: () => void
}) {
  const classes = useStyles();
  return (
    <Box className={classes.wrapperSortedButton}>
      <ButtonGroup disableElevation size='small' className={classes.buttonGroup}>
        <Button
          variant={isDescActive ? 'contained' : 'outlined'}
          color='primary'
          onClick={handleDescClick}
          className={classes.buttonSorted}
        >
          Desc
        </Button>
        <Button
          variant={!isDescActive ? 'contained' : 'outlined'}
          color='primary'
          onClick={handleAscClick}
          className={classes.buttonSorted}
        >
          Asc
        </Button>
      </ButtonGroup>
    </Box>
  )
};
