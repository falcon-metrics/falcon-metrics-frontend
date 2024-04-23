import { makeStyles } from "@fluentui/react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import { SettingsData } from "../../../../types";
import useSettingsStyles from "../../settings.styles";
import { WorkItemLevelNameMap } from "../../types";

export interface Props {
  settings: SettingsData;
  onSettingsChange: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function WorkItemLevel({ settings, onSettingsChange }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const settingDataKey = name;
    if (settingDataKey && checked !== undefined) {
      onSettingsChange((prevState) => {
        const newState = {};
        newState[settingDataKey] = checked;
        return {
          ...prevState,
          ...newState,
        };
      });
    }
  };
  // const levelNameMap:{
  //   [key: string]:{
  //     display: string,
  //     dataKey: keyof ForecastLevel,
  //   }
  // } ={
  //   portfolio : {
  //     display: 'Portfolio',
  //     dataKey: 'forecastPortfolio'
  //   },
  //   team : {
  //     display: 'Team',
  //     dataKey: 'forecastTeam'
  //   },
  //   individualContributor : {
  //     display: 'Individual Contributor',
  //     dataKey: 'forecastIndividualContributor'
  //   },
  // }
  const useWorkItemLevelStyles = makeStyles({
    CheckboxRow: {
      display: "flex",
      flexDirection: "row !important",
      width: "110%"
      // justifyContent: "space-evenly",
      // marginTop: "5px",
    },
    checkBox: {
      width: "30%",
    },
    label: {
      fontSize: "0.7em",
      fontFamily: "Open Sans",
    },
  });
  const workItemLevelClasses = useWorkItemLevelStyles();
  const settingClasses = useSettingsStyles();
  const CheckboxOptions = () => {
    return Object.keys(WorkItemLevelNameMap).map((levelName) => {
      const level = WorkItemLevelNameMap[levelName];
      return (
        <FormControlLabel
          key={level.display}
          control={
            <Checkbox
              checked={
                settings[level.dataKey] !== undefined
                  ? settings[level.dataKey]
                  : true //default to true
              }
              onChange={handleChange}
              name={level.dataKey}
              color="primary"
            />
          }
          label={
            <Box
              component="span"
              fontSize={12}
              className={workItemLevelClasses.label}
            >
              {level.display}
            </Box>
          }
          className={workItemLevelClasses.checkBox}
        />
      );
    });
  };
  return (
    <Box className={settingClasses.settingSection}>
      <FormControl component="fieldset">
        <FormLabel component="legend" style={{ fontSize: "14px" }}>
          Which level do you want to view the forecasting for?
        </FormLabel>
        <FormGroup className={workItemLevelClasses.CheckboxRow}>
          {CheckboxOptions()}
        </FormGroup>
      </FormControl>
    </Box>
  );
}
