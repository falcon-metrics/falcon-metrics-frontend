import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';
export const counterSize = '1.5em';

const Counter = styled(Box)({
  fontFamily: 'Segoe UI Semibold',
  borderRadius: 100,
  height: counterSize,
  width: counterSize,
  lineHeight: counterSize,
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgb(0, 120, 212)',
});

const FilterCounter = ({ count }: { count: number }) => {
  if (!count) {
    return null;
  }
  return <Counter>{count}</Counter>;
};

export default FilterCounter;
