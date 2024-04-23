import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

export const useStyles = makeStyles(() =>
  createStyles({
    deleteBtn: {
      display: 'inline-flex',
      borderRadius: 20,
      width: 40,
      height: 40,
      marginTop: 2
    },
    deleteIcon: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  }),
);

type Props = {
  onClick: () => void;
  ariaLabel: string;
};

const DeleteButton = ({ onClick, ariaLabel }: Props) => {
  const classes = useStyles();
  return (
    <Tooltip title={ariaLabel} aria-label="delete" arrow>
      <IconButton
        aria-label={ariaLabel}
        onClick={onClick}
        className={classes.deleteBtn}
      >
        <DeleteOutlineIcon className={classes.deleteIcon} />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
