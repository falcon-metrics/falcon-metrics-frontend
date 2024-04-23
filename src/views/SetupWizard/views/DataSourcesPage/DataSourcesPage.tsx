import { useHistory } from 'react-router';
import { useContext, useEffect } from 'react';
import { Auth0ContextInterface, withAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Container from 'components/PageContainer';
import DataSourceTable from './DataSourceTable';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import useTrialInfo from 'hooks/fetch/useTrialInfo';
import React from 'react';
import useAuthentication from 'hooks/useAuthentication';
import { SelectedLeftNavContext } from 'components/UserStateProvider/UserStateProvider';
import { BaseRoutes } from 'utils/routes';

export type Props = {
  auth0: Auth0ContextInterface;
};

const Unavailable = React.lazy(() => import('views/UnavailablePage'));

const DataSources = (props: Props) => {
  const history = useHistory();
  const { isAdmin } = useAuthentication();
  const { mutate: mutateTrialInfo } = useTrialInfo();
  const sendTelemetry = useSendTelemetry();
  useEffect(() => {
    sendTelemetry(
      'DatasourcesManaging',
      'User accessed datasources',
      { page: 'wizard-settings', widget: 'datasource' }
    );
  }, [props.auth0]);

  const { tab } = useContext(SelectedLeftNavContext);
  let path = '/';
  if (tab === BaseRoutes.InitiativeSocialFeed) {
    path = '/vmo';
  }

  if (!isAdmin) {
    return <Unavailable />;
  }

  return (
    <Container title="Manage Data Sources" maxWidth="md" style={{ justifyContent: "center", minHeight: '100vh' }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <DataSourceTable />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Button
                fullWidth
                type="submit"
                size="large"
                variant="outlined"
                color="primary"
                onClick={() => {
                  mutateTrialInfo();
                  history.push(path);
                }}
              >
                Return
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                onClick={() => {
                  sendTelemetry(
                    'CreateDatasource',
                    'User creating datasource',
                    { page: 'wizard-settings', widget: 'datasource' }
                  );
                  history.push('/datasources/setup/provider');
                }}
              >
                Connect a New Datasource
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withAuth0<Props>(DataSources);
