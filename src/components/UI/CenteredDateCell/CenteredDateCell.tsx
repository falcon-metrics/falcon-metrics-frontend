import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { formatDate } from 'utils/dateTime';

const Cell = styled(Box)({
  width: '100%',
});

const CenteredCell = ({ value }: GridRenderCellParams) => {
  return (
    <Cell
      style={{
        textAlign: typeof value === 'number' ? 'center' : 'initial',
      }}
    >
      {formatDate(value)}
    </Cell>
  );
};

export default CenteredCell;
