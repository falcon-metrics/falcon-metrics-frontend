import {
  ComponentType,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import useSWR, { SWRResponse } from 'swr';
import { WithoutKeys } from 'utils/typescript/types';
import postAndMutate from 'core/api/postAndMutate';

export type Submit<Payload, SubmitResponse = unknown> = {
  submit: (payload: Payload) => Promise<SubmitResponse>;
};

export type InternalProps<FetcherResponse, Payload, SubmitResponse> = Submit<
  Payload,
  SubmitResponse
> &
  Omit<SWRResponse<FetcherResponse, unknown>, 'data'>;

function withData<
  FetcherResponse,
  Payload,
  ExternalProps extends WithoutKeys<
    ExternalProps,
    InternalProps<FetcherResponse, Payload, SubmitResponse> & FetcherResponse
  >,
  SubmitResponse
>(
  Component: ComponentType<
    InternalProps<FetcherResponse, Payload, SubmitResponse> &
      FetcherResponse &
      ExternalProps
  >,
  fetcher: (key: string) => Promise<FetcherResponse>,
  defaultFetcherData: FetcherResponse,
  fallback: ReactNode = null,
) {
  type Props = {
    url: string;
    submit?: (payload: Payload) => Promise<SubmitResponse>;
  } & ExternalProps;

  return (props: Props) => {
    const { url, submit } = props;
    const defaultSubmit = useCallback(
      (payload: Payload) => postAndMutate(url, payload),
      [url],
    );

    const { data, ...SWRValues } = useSWR<FetcherResponse>(url, fetcher, {
      revalidateOnFocus: false,
    });
    const { isValidating } = SWRValues;

    const [numberOfTimesValidated, setNumberOfTimesValidated] = useState(0);

    useEffect(() => {
      if (!isValidating) {
        setNumberOfTimesValidated((n) => n + 1);
      }
    }, [isValidating, setNumberOfTimesValidated]);

    const requiredNumberOfTimes = 1;
    const hasValidatedRequiredNumberOfTimes =
      numberOfTimesValidated >= requiredNumberOfTimes;
    if (!hasValidatedRequiredNumberOfTimes) {
      return <>{fallback}</>;
    }

    const fetcherData = data ?? defaultFetcherData;

    return (
      <Component
        {...props}
        {...fetcherData}
        {...SWRValues}
        numberOfTimesValidated={numberOfTimesValidated}
        submit={submit ?? defaultSubmit}
      />
    );
  };
}

export default withData;
