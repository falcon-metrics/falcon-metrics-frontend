import compose from 'react-recompose/compose';
import withProps from 'react-recompose/withProps';
import branch from 'react-recompose/branch';
import renderComponent from 'react-recompose/renderComponent';
import { withAuth0 } from '@auth0/auth0-react';
import get from 'lodash/get';

import fetch from 'core/api/fetch';
import RegistrationError from 'views/Signup/RegistrationError';
import BillingCheckoutPage, { FormValues } from './BillingCheckout';

const whitelist = ['@example'];

async function submit(data: FormValues) {
  return await fetch.post('/billingCheckout', data);
}

const BillingCheckout = withProps({ submit })(BillingCheckoutPage);

export default compose<any, any>(
  withAuth0,
  branch((props) => {
    const email = get(props, 'auth0.user.email') as string;
    return !whitelist.some((allow) => email.includes(allow));
  }, renderComponent(RegistrationError)),
)(BillingCheckout);
