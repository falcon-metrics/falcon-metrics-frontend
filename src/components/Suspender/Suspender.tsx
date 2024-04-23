import SpinnerFullSize from 'components/SpinnerFullSize';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
  shouldStartTimer?: boolean;
  timeMs?: number;
}

const Suspender = ({ children, timeMs = 0, shouldStartTimer = true }: Props) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (shouldStartTimer && !shouldShow) {
      setTimeout(() => setShouldShow(true), timeMs);
    }
  }, [shouldStartTimer, timeMs, shouldShow]);

  return <>{shouldShow ? children : <SpinnerFullSize />}</>;
}

export default Suspender;
