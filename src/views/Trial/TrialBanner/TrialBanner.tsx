import { ComponentType } from 'react';
import ConnectYourDataModal from 'components/ConnectYourDataModal';
import TrialModal, { Props as BannerProps } from '../TrialModal';
import LockDemoModal from 'components/LockDemoModal';
import LockTrialModal, { Props as LockProps } from 'components/LockTrialModal';
import BannerContent from './components/BannerContent/BannerContent';

export type Props = {
  isTrial: boolean;
  text: string;
  buttonText: string;
  isDemoTrial: boolean;
  blockAccess: boolean;
  email: string;
};

const TrialBanner = ({ isTrial, isDemoTrial, ...props }: Props) => {
  let BannerComponent: ComponentType<BannerProps>;
  let LockComponent: ComponentType<LockProps>;
  if (isTrial) {
    BannerComponent = TrialModal;
    LockComponent = LockTrialModal;
  } else if (isDemoTrial) {
    BannerComponent = ConnectYourDataModal;
    LockComponent = LockDemoModal;
  } else {
    return null;
  }
  return (
    <BannerContent
      BannerComponent={BannerComponent}
      LockComponent={LockComponent}
      {...props}
    />
  );
};

export default TrialBanner;
