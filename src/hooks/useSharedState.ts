import { useEffect } from 'react';
import useSWR, { Fetcher } from 'swr';
import { PublicConfiguration } from 'swr/_internal';


/**
 * This map of keys and types defines the keys for the useSharedState hook. This allows for
 * strong typing on all shared state values and setters.
 */
type SharedStateTypeMap = {
  ANALYTICS_DASHBOARD_IS_LOADING: boolean;
  PRODUCT_TOUR_IS_OPEN: boolean;
};

type SharedStateKeys = keyof SharedStateTypeMap;

type GetSharedStateKeyTypes<T extends SharedStateKeys> = SharedStateTypeMap[T];

const getStoreKey = (key: SharedStateKeys) => 'SHARED_STATE_KEY_' + key;

function useSWRContext<T extends SharedStateKeys>(
  key: T,
  fetcher?: Fetcher<GetSharedStateKeyTypes<T>>,
  options?: Partial<PublicConfiguration>,
) {
  const storeKey = getStoreKey(key);
  return useSWR<GetSharedStateKeyTypes<T>>(storeKey, (fetcher ?? null) as any, options as any);
}

/**
 * This hook works similar to react's native useState hook, but the value stored by the state is shared
 * between multiple components.
 * @param key The unique identifier of the value within the provider. This hook uses SWR internally,
 * so the scope is given by SWR's provider. In the internal usage the key gets prefixxed with
 * 'SHARED_STATE_KEY_', to avoid collisions with other SWR keys.
 * @param defaultValue The value to use if the identifier hasn't been set.
 * @returns Identical to react's useState: a tuple with the value of the state, and a setter function
 * to set the state.
 * @example const [tourIsOpen, setTourIsOpen] = useSharedState('PRODUCT_TOUR_IS_OPEN');
 */
export default function useSharedState<T extends SharedStateKeys>(
  key: T,
  defaultValue?: GetSharedStateKeyTypes<T>,
) {
  const { data, mutate } = useSWRContext(key, undefined, {
    fallbackData: defaultValue,
  });
  return [data, mutate] as const;
}

/**
 * This hook works along useSharedState, but with an approach similar to useEffect.
 * The value of the state identified by the key is set to the value of the value param,
 * whenever it changes.
 * @param key Unique identifier for the state.
 * @param value Value to set the state to.
 */
export function useSharedStateSetterEffect<T extends SharedStateKeys>(
  key: T,
  value: GetSharedStateKeyTypes<T>,
) {
  const [, mutate] = useSharedState(key);
  useEffect(() => {
    mutate(value);
  }, [value, key, mutate]);
}
