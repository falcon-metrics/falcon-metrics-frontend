import DashboardSwitchBannerContent from './content/DashboardSwitchBannerContent';

export type Props = {
  label: string;
  buttonText: string;
};

const DashboardSwitchBanner = ({ label, buttonText, ...props }: Props) => {
  
  return (
    <DashboardSwitchBannerContent
      label={label}
      buttonText={buttonText}
      {...props}
    />
  );
};

export default DashboardSwitchBanner;
