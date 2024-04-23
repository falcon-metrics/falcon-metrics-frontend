import { Redirect, Route, Switch } from 'react-router-dom';
import UnavailablePage from './UnavailablePage';

export default function Routes() {
  return (
    <Switch>
      <Route path="/unavailable" component={UnavailablePage} />
      <Redirect to="/unavailable" />
    </Switch>
  );
}
