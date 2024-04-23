import compose from 'react-recompose/compose';
import withProps from 'react-recompose/withProps';
import branch from 'react-recompose/branch';
import renderComponent from 'react-recompose/renderComponent';
import { withAuth0 } from '@auth0/auth0-react';
import get from 'lodash/get';

import fetch from 'core/api/fetch';
import withFetch from 'core/api/withFetch';

import SignupPage, { FormValues } from './SignupPage';
import RegistrationError from '../RegistrationError';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import csv from '!!raw-loader!../blacklist.csv';
import csvtojson from 'csvtojson';

declare global {
  interface Window {
    lintrk: any;
  }
}

const lintrk = window.lintrk;

async function submit(data: FormValues) {
  try {
    lintrk && window?.lintrk('track', { conversion_id: 4683308 });
  } catch (e) {
    console.error('LinkedIn lintrk');
  }
  return await fetch.post('/signup', data);
}

const Signup = withProps({ submit })(SignupPage);

const fetcher = async () => await csvtojson().fromString(csv);

export default compose<any, any>(
  withAuth0,
  withFetch('/blacklist', fetcher),
  branch((props: any) => {
    const { data: blacklist } = props;
    const email = get(props, 'auth0.user.email') as string;
    return blacklist.some(({ domain }) => email.includes(domain));
  }, renderComponent(RegistrationError)),
)(Signup);
