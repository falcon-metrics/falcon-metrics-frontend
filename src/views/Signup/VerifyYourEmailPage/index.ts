import { mapProps } from 'react-recompose';
import compose from 'react-recompose/compose';
import VerifyYourEmailPage from './VerifyYourEmailPage';
export default compose<any, any>(
  mapProps<any, any>((props) => {
    return props;
  }),
)(VerifyYourEmailPage);
