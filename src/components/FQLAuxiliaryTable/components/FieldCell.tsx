import { GridCellParams } from '@mui/x-data-grid-pro';
import CopyToClipboardButton from 'components/UI/CopyToClipboardButton';

const FieldCell = ({ formattedValue }: GridCellParams) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
    }}
  >
    <span style={{ flex: '0 0' }}>{formattedValue}</span>
    <CopyToClipboardButton text={String(formattedValue)} />
  </div>
);

export default FieldCell;
