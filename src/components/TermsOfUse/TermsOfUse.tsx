import { Link, MessageBar, PrimaryButton } from 'office-ui-fabric-react';
import './styles.css';
import useUserInfo from 'hooks/fetch/useUserInfo';
import fetch from 'core/api/fetch';
import { Profile } from 'hooks/useProfile';
import { useEffect, useState } from 'react';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const acceptTermsOfUse = async (profile) => {
  type UserForm = {
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userAcceptTermsAndConditions: boolean;
  };

  const user: UserForm = {
    userFirstName: profile.given_name,
    userLastName: profile.family_name,
    userEmail: profile.email,
    userAcceptTermsAndConditions: true,
  };

  return fetch.post('/user', user);
};

const TermsConditions = ({ profile }: { profile?: Profile }) => {
  const { userInfo } = useUserInfo();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('Your changes are being saved...');
  const [alertSeverity, setAlertSeverity] = useState<Color>('info');
  const [showBanner, setShowBanner] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo?.showBanner) {
      setShowBanner(true);
    }
  }, [userInfo])

  const acceptTerms = async () => {
    handleShowAlert();
    try {
      await acceptTermsOfUse(profile);
      setAlertMessage('User info saved!');
      setAlertSeverity('success');
      setShowBanner(false);
    } catch (e) {
      setAlertMessage('Error saving User');
      setAlertSeverity('error');
    }
  };

  const handleShowAlert = () => setAlertOpen(true);

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  if (showBanner) {
    return (
      <>
        <MessageBar
          className="term-conditions"
          styles={{
            iconContainer: 'term-condition-disable-icon',
            text: 'term-conditions-text',
          }}
          messageBarIconProps={{ iconName: '' }}
        >
          By using Falcon Metrics you are agreeing to the
        <Link
            href="https://www.example.com/terms-of-use"
            target="_blank"
            underline
          >
            Terms of Use
        </Link>{' '}
        and
        <Link
            href="https://www.example.com/privacy-policy"
            target="_blank"
            underline
          >
            Privacy Policy.
        </Link>{' '}
          <PrimaryButton onClick={acceptTerms}>Accept</PrimaryButton>
        </MessageBar>

        <Snackbar
          open={alertOpen}
          autoHideDuration={4000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </>
    );
  }

  return null;
};

export default TermsConditions;


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}