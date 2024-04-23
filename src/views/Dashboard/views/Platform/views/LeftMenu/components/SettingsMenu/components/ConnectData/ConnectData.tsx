import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ConnectYourDataModal from 'components/ConnectYourDataModal';
import { useState } from 'react';
import { ReactComponent as PlugAndPlayIcon } from 'assets/icons/plug-and-play.svg';
import useStyles from './ConnectData.styles';

function ConnectData() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const showModal = () => setModalIsVisible(true);
  const hideModal = () => setModalIsVisible(false);
  const classes = useStyles();

  return (
    <>
      <ConnectYourDataModal
        hideModal={hideModal}
        modalIsOpen={modalIsVisible}
      />
      <Box
        className={classes.container}
        onKeyPress={showModal}
        onClick={showModal}
      >
        <PlugAndPlayIcon data-tour="connect-your-data" />
        <Typography className={classes.typography}>
          Connect your
          <br />
          data to start
          <br />
          your Trial
        </Typography>
      </Box>
    </>
  );
}

export default ConnectData;
