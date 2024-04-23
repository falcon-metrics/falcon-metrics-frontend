import { Redirect, Route, Switch } from 'react-router-dom';
import BillingCheckoutPage from './BillingCheckout.data';

export default function Routes() {
  return (
    <Switch>
      <Route path="/billing" component={BillingCheckoutPage} />
      <Redirect to="/billing" />
    </Switch>
  );
}
