import { useRef } from 'react';

/**
 * Returns a reference to .
 *
 * @param initialState must be typed using the utility @typedef RequiredKeys, to enforce the
 * contexts hability to create a setter for each of the states keys.
 * @example: const initialState : RequiredKeys<State> = {key1: '', key2: undefined}
 */
function usePromiseRef<T>(initialValue?: T | Promise<T>) {
  const promiseRef = useRef<Promise<T | undefined>>(
    Promise.resolve(initialValue),
  );

  const mutableThen = (onSucess: (result: T | undefined) => any) => {
    promiseRef.current.then((result) => {
      promiseRef.current.then((result) => onSucess(result));
      return result;
    });
    return promiseRef.current;
  };

  const mutableCatch = (onFailure: (error: any) => any) => {
    promiseRef.current.catch((error) => {
      promiseRef.current.catch((error) => onFailure(error));
      return error;
    });
    return promiseRef.current;
  };

  const mutableFinally = (onSettled: () => any) => {
    promiseRef.current.finally(() => {
      promiseRef.current.finally(() => onSettled());
    });
    return promiseRef.current;
  };

  return {
    current: promiseRef.current,
    mutableThen,
    mutableCatch,
    mutableFinally,
  };
}

export default usePromiseRef;
