import { useAuth0 } from '@auth0/auth0-react';
import { useSendTelemetry } from '../../core/api/CustomerTelemetryClient';
import './auth_action.css'; // TODO: might be a better location for the css file

const LogoutButton = () => {
  const auth0 = useAuth0();
  const sendTelemetry = useSendTelemetry();
  return (
    <span
      role="link"
      key="logout"
      tabIndex={0}
      className="authAction__logout"
      onClick={async () => {
        sendTelemetry('SignOut', 'User sign out');
        auth0.logout({ returnTo: window.location.origin });
        localStorage.setItem('example.aggregateDataKey', 'Weeks');
      }}
    >
      Sign Out
    </span>
  );
};

export default LogoutButton;
