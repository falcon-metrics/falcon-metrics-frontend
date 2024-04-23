import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import useStyles from './CloseButton.styles';

type Props = {
  handleClose(): void;
};

function CloseButton({ handleClose }: Props) {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Box className={classes.closeButton}>
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Grid>
  );
}

export default CloseButton;
