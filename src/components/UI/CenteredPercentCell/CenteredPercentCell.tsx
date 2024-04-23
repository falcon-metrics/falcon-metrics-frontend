import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';
import { ReactNode } from 'react';

const Cell = styled(Box)({
  width: '100%',
});

type Props = {
  value: ReactNode;
  formattedValue?: ReactNode;
};
 

const CenteredPercentCell = ({ value, formattedValue = value }: Props) => {
  return (
    <Cell style={{ textAlign: 'center' }}>{
      formattedValue ? (
        typeof formattedValue === 'number' ? Math.round(formattedValue) : formattedValue
      ) : 0
      }%
    </Cell>
  );
};

export default CenteredPercentCell;