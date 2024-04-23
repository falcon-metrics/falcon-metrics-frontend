import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseButton from '../CloseButton';
import useStyles from './MessageSent.styles';

type Props = {
  onClose?(): void;
  message: string;
};

function MessageSent({ onClose, message }: Props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.removeOutline}>
      <Grid item xs={12}>
        <Box mt={2} mb={4}>
          {onClose && <CloseButton handleClose={onClose} />}
          <Box mt={2}>
              {/* Insert your logo here */}
          </Box>
          <Box ml={2}>
            <Typography display="inline" className={classes.successMessage}>
              {message}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default MessageSent;
