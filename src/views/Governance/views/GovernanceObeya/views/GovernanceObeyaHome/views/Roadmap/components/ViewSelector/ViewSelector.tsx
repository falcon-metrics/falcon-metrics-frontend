import { Box, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const Options = [
  "Work breakdown", 
  "Boards and aggregations",
  "Flow Item Type",
  "Flow Item Level",
  "Goals",
];

type Props = {
  viewSelection: string;
  setViewSelection: (value: string) => void;
}

export function ViewSelector({ viewSelection, setViewSelection} : Props) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 320,
      },
    },
  };

  return (
    <Box flexDirection="row">
      <Typography style={{ fontSize: "12px", fontFamily: "Open Sans", fontWeight: 600, paddingBottom: 3 }}>
        View By
      </Typography>
      <Select
        margin="dense"
        variant="outlined"
        MenuProps={MenuProps}
        style={{ width: 240 }}
        defaultValue={viewSelection || 0}
        onChange={(e: any) => setViewSelection(e.target.value)}
      >
        {Options.map((item, index) => {
          return (
            <MenuItem key={index} dense value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}
