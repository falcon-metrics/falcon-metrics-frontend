import { mapProps } from 'react-recompose';
import compose from 'react-recompose/compose';
import EndOfTrialPage from './EndOfTrialPage';
export default compose<any, any>(
  mapProps<any, any>((props) => {
    return props;
  }),
)(EndOfTrialPage);
