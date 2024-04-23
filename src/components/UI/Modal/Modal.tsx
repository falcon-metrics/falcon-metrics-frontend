import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:focus': {
        outline: 'none',
      },
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      position: 'relative',
      borderRadius: '8px',
      minHeight: '70vh',
      width: '60%',
      '&:focus': {
        outline: 'none',
      },
    },
    closeIcon: {
      position: 'absolute',
      top: 12,
      right: 10,
      cursor: 'pointer',
    },
  }),
);

type Props = {
  children?: any;
  onClose?(): void;
  isOpen: boolean;
  overlay?: boolean;
  className?: any;
  customClass?: any;
};

export default function MUIModal({
  children,
  onClose,
  isOpen,
  overlay = false,
  className,
  customClass,
}: Props) {
  const classes = useStyles();

  return (
    <Box>
      <Box>
        <Modal
          open={isOpen}
          onClose={onClose}
          className={`${classes.modal}`}
          BackdropProps={{ invisible: overlay }}
        >
          <Box
            className={className?.paper || `${classes.paper} ${customClass}`}
          >
            <CloseIcon className={classes.closeIcon} onClick={onClose} />
            {children}
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
