import { Box } from "@material-ui/core";
import { DataGridPro, DataGridProProps } from "@mui/x-data-grid-pro";
import CustomGridPanel from "components/UI/CustomGridPanel";
import useAuthentication from "hooks/useAuthentication";

type Props = {
  query: string;
  queryFieldName: string;
  pageSize?: number;
  setSelection: (value: any) => void;
} & DataGridProProps;

const ArchiveTable = ({
  query,
  queryFieldName,
  pageSize = 10,
  setSelection,
  ...props
}: Props) => {
  const { isAdminOrPowerUser } = useAuthentication();

  return (
    <Box style={{ overflowY: "hidden", height: "auto", minHeight: 500 }}>
      <DataGridPro
        checkboxSelection={isAdminOrPowerUser}
        style={{ height: "auto", minHeight: 500, overflowY: "auto" }}
        pageSize={pageSize}
        hideFooterSelectedRowCount
        disableMultipleColumnsSorting
        disableColumnReorder
        disableSelectionOnClick
        onSelectionModelChange={(newSelection: any) => {
          setSelection(newSelection);
        }}
        filterModel={{
          items: [
            {
              columnField: queryFieldName,
              operatorValue: "contains",
              value: query,
            },
          ],
        }}
        components={{ Panel: CustomGridPanel }}
        {...props}
      />
    </Box>
  );
};

export default ArchiveTable;
