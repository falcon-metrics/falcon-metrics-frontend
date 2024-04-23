import React from 'react';

import {
  Route,
  Switch,
} from 'react-router-dom';
import {
  InitiativeSocialFeedHome,
} from 'utils/routes';

const Initiatives = React.lazy(() => import('./views/GovernanceObeya'));

const InitiativeSocialFeed = () => (
  <Switch>
    <Route 
      path={InitiativeSocialFeedHome} 
      component={Initiatives} />
  </Switch>
);

export default InitiativeSocialFeed;
