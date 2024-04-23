import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

export const useStyles = makeStyles(() =>
  createStyles({
    deleteBtn: {
      display: 'inline-flex',
      borderRadius: 8,
      width: 38,
    },
    deleteIcon: {
      marginTop: 2,
      fontSize: 20,
      fontWeight: 'bold',
    },
  }),
);

const AddButton = ({ onClick }: { onClick: any }) => {
  const classes = useStyles();
  return (
    <Tooltip title="Add key result" aria-label="Add key result" arrow>
      <IconButton
        aria-label="Add key result"
        onClick={onClick}
        className={classes.deleteBtn}
      >
        <AddIcon className={classes.deleteIcon} />
      </IconButton>
    </Tooltip>
  );
};

export default AddButton;
