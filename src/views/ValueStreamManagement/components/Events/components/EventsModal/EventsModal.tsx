import { useState, useEffect } from 'react';
import BaseModal from 'components/UI/BaseModal/BaseModal2';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { DateTime } from 'luxon';
import { useStyles } from './EventsModal.styles';
import { useEvents, EventInfo } from '../../hooks/useEvents';
import { FormFields } from '../../interfaces';
import EventForm from '../EventForm';
import { sortEventsByDesc } from '../utils';

const EventsModal = ({
  isOpen,
  setOpenEditModal,
  enableDefaultPlusButton,
  title,
  eventInfo,
}: {
  isOpen?: boolean;
  enableDefaultPlusButton?: boolean;
  title?: string;
  setOpenEditModal?: any;
  eventInfo?: EventInfo;
}) => {
  /**
  * default styles
  */
  const classes = useStyles();

  /**
  * get postFunction to create a event
  */
  const { postEvent, mutate, updateEvent, data } = useEvents();

  /**
  * Should manage to close modal when create new event
  */
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleOpenModal = () => setModalIsOpen(true);
  /**
  * Submit function to create a new event
  */
  const handleSubmitEvent = async (
    values: FormFields,
    afterSuccess: any,
  ) => {
    try {
      /**
      * Should format the payload to have the same fieldName of the database
      */
      const formattedPayload = {
        context_id: values.contextId,
        description: values.description,
        event_name: values.eventName,
        user_id:values.userId,
        username: values.username,
        // when user is updating the form this values is comming as string
        efective_date: typeof values.efectiveDate === 'string'
          ? values.efectiveDate : DateTime.fromJSDate(values.efectiveDate as Date).toISODate(),
      };
        
     /**
      * Should update cache on SWR to do a new fetch
      */
      if (values.id) {
        const updatedEvent = {
          id: values.id,
          ...formattedPayload
        };

        const updatedList = data.map((eventInfo) => {
          if (eventInfo.id === values.id) {
            return updatedEvent;
          }
          return eventInfo;
        });
        mutate({ data: { events: updatedList } }, false);

        setModalIsOpen?.(false);
        setOpenEditModal?.(false);

        await updateEvent(updatedEvent);
        afterSuccess?.();

        mutate({ data: { events: updatedList } }, true);
      } else {
        const updatedListOfEvents = sortEventsByDesc([
          ...data,
          {
            ...formattedPayload,
            // convert to ISO to keep this sorted rightly after added
            efective_date: DateTime.fromJSDate(new Date(values.efectiveDate)).set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toISO(),
          }
        ] as EventInfo[]);
        console.log(`updatedListOfEvents ==>`, updatedListOfEvents);
        mutate(
          { data: { events: updatedListOfEvents } },
          false,
        );

        setModalIsOpen?.(false);
        setOpenEditModal?.(false);

        await postEvent(formattedPayload);
        afterSuccess?.();
        
        mutate(
          { data: { events: updatedListOfEvents } },
          true,
        );
      }
    } catch (error) {
      console.log(`error ==>`, error);
      setOpenEditModal?.(false);
    }
  };

  const openEventModal = (event) => {
    event.preventDefault();
    handleOpenModal();
  };

  useEffect(() => {
    setModalIsOpen(!!isOpen);
  }, [isOpen]);

  return (
    <div className={classes.sm}>
      {enableDefaultPlusButton ? (
        <IconButton aria-label="Add Event" size="small" className={classes.createButton} onClick={openEventModal}>
          <AddIcon />
        </IconButton>
      ): null}
      <BaseModal
        maxWidth='xs'
        open={isOpen || modalIsOpen}
        setOpen={setOpenEditModal || setModalIsOpen}
        title={title}
      >
        <EventForm onSubmit={handleSubmitEvent} eventInfo={eventInfo} />
      </BaseModal>   
    </div>
  );
}

export default EventsModal;
