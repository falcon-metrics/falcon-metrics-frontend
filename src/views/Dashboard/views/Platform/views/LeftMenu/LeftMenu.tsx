import Box from '@material-ui/core/Box';
import LeftNavBar from './components/LeftNavBar/LeftNavBar';
import useProfile from 'hooks/useProfile';
import useTrialInfo from 'hooks/fetch/useTrialInfo';
import useStyles from './LeftMenu.styles';
import ProductTourButton from '../ProductTour/components/ProductTourButton/ProductTourButton';
import ProductTour from '../ProductTour/ProductTour';
import SettingsMenu from 'views/Dashboard/views/Platform/views/LeftMenu/components/SettingsMenu';
import { useTourStepsGetter } from '../ProductTour/hooks/useTourSteps';
import OrganisationLogo from './components/OrganisationLogo';
import useAuthentication, { Roles } from 'hooks/useAuthentication';

const Space = () => <Box m="0.5rem" />;

const LeftMenu = () => {
  const classes = useStyles();
  const { data: profile } = useProfile();
  const { isAdmin, isInRole } = useAuthentication();
  const { trialInfo } = useTrialInfo();
  const { isTrial } = trialInfo ?? {};
  const productTourButtonIsWithinCogwheel = !isTrial && isAdmin;
  const pageHasTour = !!useTourStepsGetter();

  const showSettingsCogwheel = isInRole(Roles.AdminUser) || isInRole(Roles.Administrator);

  return (
    <Box className={classes.appLeftColumn}>
      <Box className={[classes.column, classes.container].join(' ')}>
        <Box className={classes.column}>
          <OrganisationLogo />
          <LeftNavBar />
        </Box>
        <Box className={classes.column}>
          {showSettingsCogwheel && (
            <>
                <SettingsMenu
                  shouldShowProductTourOption={
                    pageHasTour && !!productTourButtonIsWithinCogwheel
                  }
                />
            </>
          )}
          <Space />
          {!productTourButtonIsWithinCogwheel && pageHasTour && (
            <ProductTourButton />
          )}
          <ProductTour userId={profile?.user_id} />
          <Space />
        </Box>
      </Box>
    </Box>
  );
};

export default LeftMenu;
