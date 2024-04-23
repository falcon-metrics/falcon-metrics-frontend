import compose from 'react-recompose/compose';
import mapProps from 'react-recompose/mapProps';
import DashboardSwitchBanner, { Props as DashboardSwitchBannerProps } from './DashboardSwitchBanner';

type Props = {
  isShowingNewDashboard: boolean;
};

export default compose<DashboardSwitchBannerProps, Props>(
  mapProps<DashboardSwitchBannerProps, Props>(({ isShowingNewDashboard }) => {

    const previewLabel = `Get early access to our new Flow Analytics`;
    const switchBackLabel = `Welcome to the new Flow Analytics. Continue using the original Flow Analytics`;

    const buttonText = isShowingNewDashboard ? 'Switch' : 'Preview';

    return {
      label: isShowingNewDashboard ? switchBackLabel : previewLabel,
      isShowingNewDashboard,
      buttonText,
    };
  }),
)(DashboardSwitchBanner);
