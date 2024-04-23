import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { DataGridPro, DataGridProProps, GridRowId } from '@mui/x-data-grid-pro';
import useStyles from './ListWithBasicFilter.styles';
import CustomGridPanel from 'components/UI/CustomGridPanel';

type Props = {
  selectionModel: GridRowId[];
  setSelectionModel: (selectedIds: GridRowId[]) => void;
  queryFieldName: string;
  pageSize?: number;
  disableSelectionOnClick?: boolean;
} & DataGridProProps;

const ListWithBasicFilter = ({
  setSelectionModel,
  queryFieldName,
  pageSize = 10,
  disableSelectionOnClick,
  ...props
}: Props) => {
  const [query, setQuery] = useState('');
  const classes = useStyles();

  return (
    <>
      <TextField
        fullWidth
        label="Filter"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <DataGridPro
        className={classes.dataGrid}
        checkboxSelection
        disableSelectionOnClick={disableSelectionOnClick}
        pageSize={pageSize}
        onSelectionModelChange={(newSelection: any) => {
          setSelectionModel(newSelection);
        }}
        filterModel={{
          items: [
            {
              columnField: queryFieldName,
              operatorValue: 'contains',
              value: query,
            },
          ],
        }}
        components={{ Panel: CustomGridPanel }}
        {...props}
      />
    </>
  );
};

export default ListWithBasicFilter;
