import { useEffect } from 'react';
import Tour from 'reactour';
import Button from '@material-ui/core/Button';
import useTrialInfo from 'hooks/fetch/useTrialInfo';
import useUserInfo from 'hooks/fetch/useUserInfo';
import useSharedState from 'hooks/useSharedState';
import useTourSteps from './hooks/useTourSteps';
import { updateHideProductTourOnDatabase } from './utils/updateHideProductTourOnDatabase';

type Props = {
  userId?: string;
};

const ProductTour = ({ userId }: Props) => {
  const [tourIsOpen, setTourIsOpen] = useSharedState('PRODUCT_TOUR_IS_OPEN');
  const { trialInfo } = useTrialInfo();
  const { userInfo } = useUserInfo();
  const blockAccess: boolean = trialInfo?.blockAccess ?? true;

  const userSettingsHideProductTour = userInfo?.hideProductTour ?? true;

  useEffect(() => {
    const timeoutId = global.setTimeout(() => {
      if (!userSettingsHideProductTour && !blockAccess) {
        setTourIsOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [userSettingsHideProductTour, blockAccess, setTourIsOpen]);

  const closeTour = () => {
    setTourIsOpen(false);
    if (!userSettingsHideProductTour) {
      if (userId) {
        updateHideProductTourOnDatabase(userId, true);
      }
    }
  };

  const currentSteps = useTourSteps();
  if (userInfo?.analyticsDashboardUrl === 'analytics-dashboard') {
    return <></>;
  }
  return (
    <>
      {currentSteps.length > 0 && (<Tour
        startAt={0}
        showNavigation
        steps={currentSteps}
        isOpen={!!tourIsOpen}
        className="customTour"
        onRequestClose={closeTour}
        prevButton={<span style={{ display: 'none' }} />}
        scrollDuration={500}
        lastStepNextButton={
          <Button
            variant="contained"
            onClick={closeTour}
            style={{
              background: 'rgb(42 210 201)',
              color: 'white',
              position: 'absolute',
              right: 16,
              bottom: 16,
            }}
          >
            Finish
          </Button>
        }
        nextButton={
          <Button
            variant="contained"
            style={{ background: 'rgb(42 210 201)', color: 'white' }}
          >
            Next
          </Button>
        }
      />)}
    </>
  );
};

export default ProductTour;
