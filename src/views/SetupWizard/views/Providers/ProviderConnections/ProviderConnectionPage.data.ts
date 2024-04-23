import compose from 'react-recompose/compose';
import withProps from 'react-recompose/withProps';
import { ProviderContext, withSnackbar } from 'notistack';
import isArray from 'lodash/isArray';
import jsonata from 'jsonata';
import fetch from 'core/api/fetch';
import ProviderConnectionPage, {
  FormValues,
  Props,
} from './ProviderConnectionPage';
import ProviderConnection from './interfaces/ProviderConnection';
import Providers from '../../../interfaces/Providers';
import { WizardRouteParams } from 'views/SetupWizard/interfaces/WizardRouteParams';
import { providers } from './interfaces/providers';
import { useLocation } from 'react-router-dom';

const submit = (
  connection: ProviderConnection,
  enqueueSnackbar,
  formValues: FormValues,
) => {
  const { username, password, namespace, serviceUrl } = formValues;
  // make it store plain text value
  const token = username === undefined ? password : `${username}:${password}`;
  return fetch
    .post(`/datasources/${connection.providerSlug}`, {
      namespace,
      token,
      serviceUrl,
    })
    .catch((error) => {
      if (error.response) {
        const { data, status, headers } = error.response;
        const message = !isArray(data)
          ? data.message
          : jsonata('*.message').evaluate(data).join('; ');
        console.warn({
          status,
          headers,
          message,
        });
        enqueueSnackbar(message, { variant: 'error' });
      } else if (error.request) {
        console.error(error.request);
        enqueueSnackbar('The request was made but no response was received.', {
          variant: 'warning',
        });
      } else {
        console.error('Error', error.message);
        enqueueSnackbar(error.message, { variant: 'warning' });
      }
      return Promise.reject(error);
    });
};

export default compose<Props, any>(
  withSnackbar,
  withProps<Props, ProviderContext & { match: { params: WizardRouteParams; }; }>(
    ({ enqueueSnackbar, match: { params } }) => {

      const connection = providers[params.provider ?? Providers.JIRA_CLOUD];

      let namespace;
      if (params.provider === Providers.JIRA_SERVER) {
        const location = useLocation() as { pathname: string; state: any; };
        namespace = location.state?.serviceUrl;
      } else {
        namespace = params.namespace;
      }

      return {
        defaultValues: { namespace: namespace },
        submit: (payload: FormValues) =>
          submit(connection, enqueueSnackbar, payload),
        connection,
      };
    },
  ),
)(ProviderConnectionPage);
