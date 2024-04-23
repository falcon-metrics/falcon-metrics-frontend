import useSWR from 'swr';
import withProps from 'react-recompose/withProps';
import isFunction from 'lodash/isFunction';

import fetch from 'core/api/fetch';

const client = (key) => {
  return fetch.get(key).then(({ data }) => data);
};

export default function withFetch(
  key,
  fetcher:
    | ((key: any) => Promise<any>)
    | ((...key: any[]) => Promise<any>) = client,
) {
  return function (WrappedComponent) {
    const WithFetch = withProps((props) => {
      const cacheKey = isFunction(key) ? key(props) : key;
      const query = useSWR(cacheKey, fetcher, {
        suspense: true,
        shouldRetryOnError: false,
      }); // TODO: remove shouldRetryOnError to launch
      return query;
    })(WrappedComponent);
    WithFetch.displayName = `WithFetch(${getDisplayName(WrappedComponent)})`;
    return WithFetch;
  };
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
