import { Redirect, Route, Switch } from 'react-router-dom';

import EndOfTrialPage from './EndOfTrialPage';

export default function Routes() {
  return (
    <Switch>
      <Route path="/endoftrial" component={EndOfTrialPage} />
      <Redirect to="/endoftrial" />
    </Switch>
  );
}
