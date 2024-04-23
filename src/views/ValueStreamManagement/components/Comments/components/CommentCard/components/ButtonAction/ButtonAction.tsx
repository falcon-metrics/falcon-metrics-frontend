import { useState } from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './ButtonAction.styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export const ButtonAction = ({ id, openEditModal, openDeleteConfirm }: {
    id?: number | string;
    openEditModal?: (commentId?: number | string) => void;
    openDeleteConfirm: (commentId?: number | string) => void;
}) => {
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
        <MenuItem className={classes.buttonActionItem} onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </> 
  )
}
