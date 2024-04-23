import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAuthentication from 'hooks/useAuthentication';
import { useStyles } from './OrganisationLogo.styles';
import useOrganizationSettings from 'hooks/fetch/useOrganizationSettings';

const stackedLogo = 'your_logo_url';

const images = {
  test: 'img/logo/test_logo.png',
};

const PROFILE_ORG_URL = 'your_org_url';

const getLogoCheckingOrgAndEmail = (email: string, orgId: string) => {
  if (
    (email.includes('info+trial@example.com') && orgId === 'acme') ||
    email === 'info+demo@example.com'
  ) {
    return images.test;
  }

  //TODO add "New Registration"n case here when we accept whatherver email
  if (email === 'info@example.com') {
    return stackedLogo;
  }


  return stackedLogo;
};

// Showing logo covering these test cases
const useFetchLogo = (isDemoUser: boolean, orgId: string, email = '') => {
  const { data } = useOrganizationSettings();

  const relatedOrgs = ['example'].includes(orgId);
  if (relatedOrgs || email.includes('example')) {
    return getLogoCheckingOrgAndEmail(email, orgId);
  }

  if (isDemoUser) {
    return stackedLogo;
  }

  if (data) {
    return data.logoUrl || stackedLogo;
  }

  return undefined;
};

const OrganisationLogo = () => {
  const { isDemoUser, user } = useAuthentication();
  const orgId = user?.[PROFILE_ORG_URL];
  const classes = useStyles();

  const src = useFetchLogo(isDemoUser, orgId, user?.email);

  if (src) {
    return (
      <img
        className={classes.img}
        src={src}
        width={70}
        height={70}
        alt={`${orgId} Logo`}
      />
    );
  }

  return (
    <Box className={classes.progressContainer}>
      <CircularProgress className={classes.loader} />
    </Box>
  );
};

const OrganisationLogoDataTour = () => (
  <Box data-tour="logo">
    <OrganisationLogo />
  </Box>
);

export default OrganisationLogoDataTour;
