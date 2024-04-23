import { Redirect, Route, Switch } from 'react-router-dom';

import SignupPage from './SignupPage';

export default function Routes() {
  return (
    <Switch>
      <Route path="/signup" component={SignupPage} />
      <Redirect to="/signup" />
    </Switch>
  );
}
