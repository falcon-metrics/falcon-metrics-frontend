import Box from '@material-ui/core/Box';
import { CSSProperties } from 'react';
import CircularProgress from './components/CircularProgress';

type Props = {
  containerClass?: string;
  style?: CSSProperties | undefined;
};

const SpinnerFullSize = ({ containerClass, style}: Props) => (
  <Box className={containerClass} style={style}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      minHeight={250}
    >
      <CircularProgress size={0.25} />
    </Box>
  </Box>
);

export default SpinnerFullSize;
