import { Box, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ObeyaRoom } from "core/api/ApiClient/ObeyaGoalsClient";

type Props = {
  options: ObeyaRoom[];
  selectedInitiative: ObeyaRoom[];
  setSelectedInitiative: (value: ObeyaRoom[]) => void;
};

export function InitiativeSelector({
  options,
  selectedInitiative,
  setSelectedInitiative,
}: Props) {
  const defaultProps = {
    options: options.filter((item) => !item.isArchived),
    getOptionLabel: (option: ObeyaRoom) => option.roomName,
  };

  return (
    <Box paddingBottom={3} flexDirection="row">
      <Typography
        style={{
          fontSize: "12px",
          fontFamily: "Open Sans",
          fontWeight: 600,
          paddingBottom: 3,
        }}
      >
        Initiatives
      </Typography>
      <Autocomplete
        {...defaultProps}
        id="auto-complete"
        autoComplete
        includeInputInList
        multiple
        size="small"
        value={selectedInitiative}
        onChange={(_, newInputValue) => {
          setSelectedInitiative(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" style={{ minWidth: 500 }} />
        )}
      />
    </Box>
  );
}
