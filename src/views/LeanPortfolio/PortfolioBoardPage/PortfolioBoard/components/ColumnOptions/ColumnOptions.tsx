import { Box, FormHelperText, MenuItem, Select } from "@material-ui/core";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import { PortfolioInfo } from "../../../../interfaces/PortfolioBoard";

interface Props {
  currentContextId: string | undefined;
  defaultColumnId: string;
  register: any;
  control: any;
  errors: any;
  columnOptions: PortfolioInfo[];
}

const ColumnOptions = ({
  defaultColumnId,
  register,
  control,
  errors,
  columnOptions
}: Props) => {
  return (
    <Box display="flex" flexDirection="row" width={250}>
      <Box display="flex" flexDirection="column" width={250}>
        <Select
          {...register("columnId")}
          control={control}
          errors={errors}
          required
          fullWidth
          name="columnId"
          defaultValue={defaultColumnId}          
        >
          {columnOptions.map((opt, index) => {
            return (
              <MenuItem key={index} value={opt.columnId}>
                {opt.columnName}
              </MenuItem>
            );
          })}
        </Select>
        {errors && (
          <FormHelperText error>{errors.columnId?.message}</FormHelperText>
        )}
      </Box>
      <Box style={{ margin: "15px 20px 0 35px" }}>
        <Spinner isVisible={!(columnOptions.length > 0)} />
      </Box>
    </Box>
  );
};

export default ColumnOptions;
