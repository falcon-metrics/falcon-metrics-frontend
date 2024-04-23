import { useState } from 'react';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useAuthentication from 'hooks/useAuthentication';

import { useStyles } from './EventCard.styles';
import RelationshipsMinifiedDisplay from 'components/RelationsipsMinifiedDisplay';

const truncate = (words: string | undefined, maxlength: number): string => {
  return `${words?.slice(0, maxlength)}...`;
};

type Props = {
  title: string;
  description?: string;
  efectiveDate: string;
  authorName: string;
  userId?: string;
  ownerId?: string;
  eventId?: string | number;
  openEditModal?: (eventId?: number | string) => void;
  openDeleteConfirm: (eventId?: number | string) => void;
};

const LIMIT_OF_WORDS = 54;

export const EventCard = ({
  title, description, efectiveDate, authorName,
  userId, ownerId, eventId, openEditModal, openDeleteConfirm,
}: Props) => {
  const classes = useStyles();
  const [isSeeMore, setIsSeeMore] = useState(false);
  const { isAdmin, isPowerUser } = useAuthentication();

  const onClickSeeMore = () => {
    setIsSeeMore(!isSeeMore);
  };

  // truncate text with length above 59 (more than 2 lines on the description)
  const formattedDescription = description ? description?.trim() : '';
  const isLongDescription = formattedDescription?.length > LIMIT_OF_WORDS;
  const maxTextDescription = isLongDescription
    ? truncate(formattedDescription, LIMIT_OF_WORDS) : description;

  return (
    <>
      <Box className={classes.wrapperCard} style={isSeeMore ? { height: 'auto' } : {}}>
        <Box className={classes.dateCard}>
          <Box style={{ display: 'flex' }}>
            {efectiveDate}
            <Box style={{ marginLeft: 20 }}>
              <RelationshipsMinifiedDisplay elementId={eventId?.toString() || ''} elementType="event" elementName={title} />
            </Box>
          </Box>
          {/** When user is seeing his comment they are able to see the actions */}
          {userId === ownerId && (isPowerUser || isAdmin) && eventId ? (
            <ButtonAction
              openEditModal={openEditModal}
              openDeleteConfirm={(eventId) => openDeleteConfirm(eventId)}
              id={eventId}
            />
          ) : null}
        </Box>
        <Box className={classes.wrapperContent} style={isSeeMore ? { minHeight: 172 } : {}}>
          <Tooltip title={<Box className={classes.tooltipTitle}>{title}</Box>} arrow placement="top-start">
            <Box className={classes.titleCard}>
              {title}
            </Box>
          </Tooltip>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Box className={classes.wrapperDescription} style={isSeeMore ? { height: 'auto' } : {}}>
              {isSeeMore ? description : maxTextDescription}
            </Box>
            <Box>
              {
                isLongDescription
                  ? <Button className={classes.seeMoreButton} onClick={onClickSeeMore}>{isSeeMore ? 'See less' : 'See more'}</Button>
                  : null
              }
            </Box>
            <Box className={classes.authorName}>
              by {authorName}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

function ButtonAction({ id, openEditModal, openDeleteConfirm }: {
  id?: number | string;
  openEditModal?: (eventId?: number | string) => void;
  openDeleteConfirm: (eventId?: number | string) => void;
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    openDeleteConfirm(id);
  };

  const handleEdit = () => {
    openEditModal?.(id);
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.buttonAction}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.buttonActionItem} onClick={handleEdit}>Edit</MenuItem>
        <MenuItem disabled={!id} className={classes.buttonActionItem} onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}
