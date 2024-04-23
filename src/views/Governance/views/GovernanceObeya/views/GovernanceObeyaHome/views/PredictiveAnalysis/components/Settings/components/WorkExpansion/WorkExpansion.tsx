import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import { SettingsData } from "../../../../types";
import useSettingsStyles from "../../settings.styles";
import { workExpansionLevels } from "../../types";

export interface Props {
  settings: SettingsData;
  onSettingsChange: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function WorkExpansion({ settings, onSettingsChange }: Props) {
  const settingsClasses = useSettingsStyles();

  const handleChange = (value: number) => {
    onSettingsChange((prevState) => {
      return {
        ...prevState,
        workExpansionPercentage: value,
      };
    });
  };
  return (
    <Box className={settingsClasses.settingSection}>
      <Box className={settingsClasses.heading} style={{ marginTop: "0.5em", marginLeft: '-10%' }}>
        Work Expansion
      </Box>
      <FormControl className={settingsClasses.formControl}>
        <InputLabel id="demo-simple-select-helper-label">
          How much work is expected to expand?
        </InputLabel>
        <Select
          // native
          value={
            settings.workExpansionPercentage !== undefined
              ? settings.workExpansionPercentage
              : 100 //default
          }
          onChange={(event) => {
            if (typeof event.target.value === "number")
              handleChange(event.target.value);
          }}
          style={{ fontSize: 12 }}
        >
          {workExpansionLevels.map((level, index) => (
            <MenuItem key={index} value={level.value} style={{ fontSize: 12 }}>
              {`${level.display} (${level.value}%)`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
