import React from 'react';

import Popover from '@material-ui/core/Popover';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
      fontFamily: 'Open Sans',
      fontSize: 13,
    },
    wrapperIcon: {
      cursor: 'pointer',
    },
    wrapperPopover: {
      display: 'inline-flex',
    },
  }),
);

type Props = {
  className?: string;
  helpText: string;
};

export const HelpPopover = ({ className, helpText }: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'custom-popover' : undefined;

  return (
    <div className={classes.wrapperPopover}>
      <span
        aria-describedby={id}
        onMouseEnter={handleClick}
        className={classes.wrapperIcon}
      >
        <HelpOutlineIcon className={className} />
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography className={classes.typography}>{helpText}</Typography>
      </Popover>
    </div>
  );
};