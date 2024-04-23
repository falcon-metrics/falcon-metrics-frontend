import { useReducer } from 'react';

const useForceUpdate = () => {
  const [, forceUpdate] = useReducer((counter) => counter + 1, 0);
  return forceUpdate;
};

export default useForceUpdate;
