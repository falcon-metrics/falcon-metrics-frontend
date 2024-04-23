import { useRef } from 'react';

const useMountTimeLogger = (callerName: string) => {
  const mountTime = useRef(new Date());
  if (process.env.REACT_APP_IS_DEVELOPMENT) {
    console.log(callerName, mountTime.current);
  }
};

export default useMountTimeLogger;
