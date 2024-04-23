import useProfile from 'hooks/useProfile';
import TermOfUse from 'components/TermsOfUse';
import useTrialInfo, { TrialInfo } from 'hooks/fetch/useTrialInfo';
import TrialBanner from 'views/Trial/TrialBanner';
import useUserInfo from 'hooks/fetch/useUserInfo';
import memo from 'utils/typescript/memo';
import React from 'react';
import DashboardSwitchBanner from 'views/DashboardSwitchBanner';
import { BaseRoutes } from 'utils/routes';

const AnalyticsDashboard = React.lazy(
  () => import('./views/AnalyticsDashboard'),
);
export interface Props {
  isInOrgs?: boolean;
  isInObeyaRole?: boolean;
  classes?: any;
  showSummary?: boolean;
  showDemo?: boolean;
  trialInfo: TrialInfo;
}

const defaultTrialInfo: TrialInfo = {
  isTrial: false,
  daysRemaining: 0,
  blockAccess: false,
  sampleDataOptionIsVisible: true,
  hasDatasource: true,
};

const Dashboard = () => {
  const { data: profile } = useProfile();
  const { trialInfo = defaultTrialInfo } = useTrialInfo();
  const { userInfo: { email = '', analyticsDashboardUrl, enableDashboardBanner } = {} } = useUserInfo();

  const isShowingNewDashboard = analyticsDashboardUrl !== BaseRoutes.AnalyticsDashboard;

  let banner;

  if (trialInfo.isTrial) {
    banner = <TrialBanner trialInfo={trialInfo} email={email} />; 
  } else if (enableDashboardBanner) {
    banner = <DashboardSwitchBanner isShowingNewDashboard={isShowingNewDashboard} />;
  }

  return (
    <div>
      <div>
        {banner}
        
        <AnalyticsDashboard />
        <TermOfUse profile={profile} />
      </div>
    </div>
  );
};

export default memo(Dashboard);
