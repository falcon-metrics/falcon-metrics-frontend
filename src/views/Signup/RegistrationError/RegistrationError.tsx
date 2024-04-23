import { styled } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import { Alert, AlertTitle } from '@material-ui/lab';
import { WithAuth0Props } from '@auth0/auth0-react';

const Main = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'stretch',
  height: '100vh',
});

const Content = styled('div')({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const RegistrationError = ({ auth0 }: WithAuth0Props) => {
  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    auth0.logout({ returnTo: window.location.origin });
  };
  return (
    <Main>
      <Alert severity="error">
        <AlertTitle>Registration Error</AlertTitle>
        This domain has not been able to join —
        <Link href="#" onClick={handleClick}>
          signin with your organisation email!
        </Link>
      </Alert>
      <Content>
        {/* Insert your logo */}
      </Content>
    </Main>
  );
};

export default RegistrationError;
