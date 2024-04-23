import { TrialInfo } from 'hooks/fetch/useTrialInfo';
import compose from 'react-recompose/compose';
import mapProps from 'react-recompose/mapProps';
import TrialBanner, { Props as TrialBannerProps } from './TrialBanner';

type Props = {
  trialInfo: TrialInfo;
  email: string;
};

export default compose<TrialBannerProps, Props>(
  mapProps<TrialBannerProps, Props>(({ trialInfo, email }) => {
    const { isTrial, daysRemaining, blockAccess, hasDatasource } = trialInfo;
    const isDemoTrial = isTrial && !hasDatasource;

    const demoPeriodMessage = `Your access to Falcon Metrics ends in ${daysRemaining || 0
      }
    ${daysRemaining === 1 ? 'day' : 'days'}.
      To experience Falcon Metrics with your own data`;

    const trialPeriodMessage = `
      Your trial ends in ${daysRemaining || 0}
      ${daysRemaining === 1 ? 'day' : 'days'
      }. For the full experience subscribe to Falcon Metrics 
    `;

    const buttonText = 'Contact us';

    return {
      text: isDemoTrial ? demoPeriodMessage : trialPeriodMessage,
      isTrial,
      buttonText,
      daysRemaining,
      isDemoTrial,
      email,
      blockAccess,
    };
  }),
)(TrialBanner);
