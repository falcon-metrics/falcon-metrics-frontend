import { useCallback, useContext, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useStyles from './LeftNavBarButton.styles';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { TelemetryActions } from 'core/api/telemetry/types';
import { BaseRoutes } from 'utils/routes';
import { SelectedContextIdContext, SelectedLeftNavContext } from 'components/UserStateProvider/UserStateProvider';

interface Props {
  text: string;
  iconAltText: string;
  iconName: string;
  /**
   * Action name that send to telemetry
   */
  telemetryAction?: TelemetryActions;
  /**
   * Path to redirect the user on click
   */
  path: string;

  /**
   * Prefix to check for active route: If the current path starts with that prefix then its active
   */
  prefix?: string;
}

const LeftNavBarButton = ({ text, iconAltText, iconName, path, prefix, telemetryAction }: Props) => {
  const { pathname } = useLocation();
  const { setContextId: setGlobalContextId } = useContext(SelectedContextIdContext);

  const activeRoute = useMemo(() => {
    if (!prefix || !pathname) {
      return false;
    }
    for (const routeName in BaseRoutes) {
      const baseRoute = BaseRoutes[routeName];
      if (prefix.startsWith(baseRoute) && pathname.startsWith(baseRoute)) {
        return true;
      }
    }
    if (prefix && pathname) {
      return pathname.startsWith(prefix);
    }
    return pathname?.includes?.(path);
  }, [
    prefix, pathname, path
  ]);

  const history = useHistory();
  const sendTelemetry = useSendTelemetry();
  const goToPath = useCallback(() => history.push(path), [path]);
  const { setTab } = useContext(SelectedLeftNavContext);

  const handleOnClick = () => {
    console.log(`BaseRoutes`, path);

    if (path.includes(BaseRoutes.ValueStreamManagement)) {
      if(activeRoute) {
        setGlobalContextId('');
        goToPath();
        location.reload();
      }
      setTab(BaseRoutes.AnalyticsDashboard);
    } else if (path.includes(BaseRoutes.InitiativeSocialFeed)) {
      setTab(BaseRoutes.InitiativeSocialFeed);
    } else if (path.includes(BaseRoutes.NorthStar)) {
      setTab(BaseRoutes.NorthStar);
    }
    goToPath();
    if (telemetryAction)
      sendTelemetry(telemetryAction, `User accessed ${text}`, { page: text });
  };
  const classes = useStyles();

  return (
    <li
      className={[
        classes.button,
        activeRoute ? classes.selectedButton : null,
      ].join(' ')}
      onClick={handleOnClick}
      onKeyPress={handleOnClick}
    >
      <div className={classes.iconContainer}>
        <img
          src={`img/${iconName}.png`}
          className={classes.icon}
          alt={iconAltText}
        />
      </div>
      <div tabIndex={0} className={classes.title}>
        {text}
      </div>
    </li>
  );
};

export default LeftNavBarButton;
