import SpinnerFullSize from 'components/SpinnerFullSize/SpinnerFullSize';
import { Loading } from 'components/UI/LinearProgress';
import postAndMutate from 'core/api/postAndMutate';
import withData, { InternalProps } from 'core/api/withData';
import { ComponentType, useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { WithoutKeys } from 'utils/typescript/types';
import {
  useWizardContext,
  WizardState,
} from 'views/SetupWizard/contexts/useWizardContext';
import Providers from 'views/SetupWizard/interfaces/Providers';

export enum WizardEndpoints {
  projects = 'projects',
  workflows = 'workflows',
  contexts = 'contexts',
  customfields = 'customfields',
  settings = 'settings',
  normalization = 'normalization',
  summary = 'summary',

  //Kanbanize
  workitemtypes = 'workitemtypes'
}

export const getWizardApiUrl = (
  provider?: Providers,
  namespace?: string,
  selectedEndpoint?: WizardEndpoints | string,
) => `/datasources/${provider}/${namespace}/${selectedEndpoint}`;

function withWizardFetcher<
  FetcherResponse,
  Payload,
  ExternalProps extends WithoutKeys<
    ExternalProps,
    InternalProps<FetcherResponse, Payload, SubmitResponse> &
      FetcherResponse &
      WizardState
  >,
  SubmitResponse
>(
  Component: ComponentType<
    InternalProps<FetcherResponse, Payload, SubmitResponse> &
      FetcherResponse &
      ExternalProps &
      WizardState
  >,
  fetcher: (key: string, organisation?: string) => Promise<FetcherResponse>,
  endpoint: WizardEndpoints,
  defaultFetcherData: FetcherResponse,
  loadingShouldBeInside = false,
  submit?: (
    provider: Providers,
    namespace: string,
    payload: Payload,
  ) => Promise<any>,
) {
  const fallback = loadingShouldBeInside ? <SpinnerFullSize /> : <Loading />;
  const ComponentWithData = withData<
    FetcherResponse,
    Payload,
    ExternalProps & WizardState,
    SubmitResponse
  >(Component, fetcher, defaultFetcherData, fallback);

  return (props: ExternalProps) => {
    const { cache } = useSWRConfig();
    const wizardState = useWizardContext();
    const { provider, namespace } = wizardState;

    const url = getWizardApiUrl(provider, namespace, endpoint);

    const submitWithDatasource = useCallback(
      (payload: Payload) => {
        if (provider && namespace) {
          const _submit = (payload: Payload) =>
            submit
              ? submit(provider, namespace, payload)
              : postAndMutate<unknown>(url, payload);

          const mutateEndpointsAfterTheCurrent = (
            selectedEndpoint: WizardEndpoints,
          ) => {
            let isAfterCurrentEndpoint = false;
            for (const e in WizardEndpoints) {
              if (e === selectedEndpoint) {
                isAfterCurrentEndpoint = true;
              } else if (isAfterCurrentEndpoint) {
                cache.delete(
                  getWizardApiUrl(provider, namespace, WizardEndpoints[e]),
                );
              }
            }
          };

          mutateEndpointsAfterTheCurrent(endpoint);
          return _submit(payload);
        }
        return Promise.reject(
          "Submission couldn't be sent, because provider or namespace are not defined.",
        );
      },
      [provider, namespace, url, cache],
    );

    return (
      <ComponentWithData
        {...props}
        {...wizardState}
        submit={submitWithDatasource}
        url={url}
      />
    );
  };
}

export default withWizardFetcher;
