import compose from 'react-recompose/compose';
import withProps from 'react-recompose/withProps';
import { withAuth0 } from '@auth0/auth0-react';

import TrialModal from './TrialModal';
export type { Props } from './TrialModal';

export default compose<any, any>(
  withAuth0,
  withProps<any, any>((props) => {
    const email = props.auth0?.user?.email;
    return {
      ...props,
      email,
    };
  }),
)(TrialModal);
