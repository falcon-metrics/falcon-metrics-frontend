import { ReactNode, useCallback, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ContactUsForm from './components/ContactUsForm';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MessageSent from './components/MessageSent/MessageSent';
import CloseButton from './components/CloseButton';
import { ContactTypes, SubmissionResponse } from 'hooks/useContactUs';
import useStyles from './ContactUsModal.styles';

export interface Props {
  modalIsOpen: boolean;
  hideModal?: () => void;
  children: ReactNode;
  successMessage: string;
  contactType: ContactTypes;
}

const ContactUsModal = ({
  modalIsOpen,
  hideModal,
  successMessage,
  contactType,
  children,
}: Props) => {
  const classes = useStyles();
  const [messageWasSubmitted, setMessageWasSubmitted] = useState(false);
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState<
    SubmissionResponse['errorMessage']
  >();

  const onSubmit = useCallback(
    ({ errorMessage }: SubmissionResponse) => {
      setMessageWasSubmitted(true);
      setSubmissionErrorMessage(errorMessage);
    },
    [setMessageWasSubmitted, setSubmissionErrorMessage],
  );

  return (
    <div className="widget-expand-icon">
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalIsOpen}
        onClose={hideModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalIsOpen}>
          <Paper className={classes.paper}>
            <Box className={classes.column} ml={5} mr={5}>
              {messageWasSubmitted ? (
                <MessageSent
                  onClose={hideModal}
                  message={submissionErrorMessage ?? successMessage}
                />
              ) : (
                <Grid container className={classes.removeOutline}>
                  {!!hideModal && <CloseButton handleClose={hideModal} />}
                  <Box mt={3} mb={3} justifyContent="center">
                    {children}
                    <ContactUsForm
                      onSubmit={onSubmit}
                      contactType={contactType}
                    />
                  </Box>
                </Grid>
              )}
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default ContactUsModal;
