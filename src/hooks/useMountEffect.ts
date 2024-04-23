import { useEffect } from 'react';

const useMountEffect = (effectFunction: () => void) =>
  // eslint-disable-next-line
  useEffect(effectFunction, []);

export default useMountEffect;
