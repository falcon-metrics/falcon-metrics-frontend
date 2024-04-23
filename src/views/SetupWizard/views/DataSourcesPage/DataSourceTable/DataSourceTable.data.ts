import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import compose from 'react-recompose/compose';
import mapProps from 'react-recompose/mapProps';
import withHandlers from 'react-recompose/withHandlers';

import fetch from 'core/api/fetch';
import withFetch from 'core/api/withFetch';

import DataSourceTable from './DataSourceTable';
import { key as trialInfoSWRKey } from 'hooks/fetch/useTrialInfo';
import { mutate } from 'swr';

const updateTrialInfo = ({
  id,
  visible,
}: {
  id: string;
  visible?: boolean;
}) => {
  if (id !== 'demo' || visible === undefined) {
    return;
  }
  mutate(
    trialInfoSWRKey,
    (data: any): any => ({
      ...data,
      sampleDataOptionIsVisible: visible,
    }),
    false,
  );
};

export default compose<any, any>(
  withFetch('/datasources'),
  mapProps<any, any>(({ data, mutate }) => {
    if (!(data instanceof Array)) {
      console.warn('Unexpected datasources object type from the server:');
      if (data && data.error && data.error.message) {
        console.error(data.error);
      } else {
        console.log(data);
      }
      console.log('It is supposed to be an array. This is request reply error. An empty array will be used.');
      data = [];
    }

    const dataset = data.map(
      ({ datasourceId, datasourceType, namespace, enabled, serviceUrl, isDemoDatasource }) => ({
        namespace,
        id: datasourceId,
        provider: datasourceType,
        name: serviceUrl,
        enable: enabled,
        isDemoDatasource: isDemoDatasource,
        serviceUrl,
      }),
    );

    return { dataset, mutate };
  }),
  withRouter,
  withSnackbar,
  withHandlers({
    onChange:
      (props: RouteComponentProps & WithSnackbarProps) => (event: any) => {
        const { id, ...payload } = event;
        fetch
          .patch(`/datasources/${id}`, payload)
          .then(() => {
            updateTrialInfo(event);
            props.enqueueSnackbar('Datasource updated successfully!', {
              variant: 'success',
            });
          })
          .catch(() => {
            props.enqueueSnackbar('Error updating the datasource!', {
              variant: 'error',
            });
          });
      },
    onEdit: (props: RouteComponentProps) => (event) => {
      const { history } = props;
      const { provider, namespace, serviceUrl } = event;

      const path = `/datasources/edit/${provider}/${namespace}/datasource`;
      console.log("onEdit ~", path);
      history.push({
        pathname: path,
        state: { serviceUrl }
      });
    },
    onDelete: (props: any) => (event) => {
      const { mutate } = props;
      const { id } = event;
      props.enqueueSnackbar('Deleting datasource...', {
        variant: 'primary',
      });
      fetch
        .delete(`/datasources/${id}`)
        .then(() => {
          props.enqueueSnackbar('Datasource deleted!', {
            variant: 'success',
          });
        })
        .catch(() => {
          props.enqueueSnackbar('Error deleting the datasource!', {
            variant: 'error',
          });
        })
        .finally(() => {
          mutate();
        });
    },
  }),
)(DataSourceTable);
