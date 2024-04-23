import { Box, Typography } from "@material-ui/core";
import { SettingsData, TeamFocusData } from "../../../../types";
import useSettingsStyles from "../../settings.styles";
import TeamFocusRow from "./TeamFocusRow";
import { useMemo } from "react";

export interface Props {
  data: TeamFocusData;
  focus: any;
  onSettingsChange: React.Dispatch<React.SetStateAction<SettingsData>>;
}


export default function TeamFocus({ data, focus, onSettingsChange }: Props) {
  const classes = useSettingsStyles();

  const transformedFocusData = useMemo(() => {
    if (!focus || typeof focus[Symbol.iterator] !== 'function') {
      return null;
    }

    const keyValuePairs = {};
    for (const board of focus) {
      keyValuePairs[board.boardName] = board;
    }

    return keyValuePairs;
  }, [focus]);

  return (
    <Box className={`${classes.settingPanelContainer}`}>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography className={classes.heading}>Team focus on this work</Typography>
        <Typography className={classes.helperText}> <hr style={{ height: "15px", color: "#0077c8", width: "1px" }} />&nbsp; represents your team focus marker</Typography>
      </Box>
      <Box className={classes.teamFocusRowDisplay}>
        {data.map((teamFocusRow, index) => {
          const focusMarker = transformedFocusData
            ? transformedFocusData[teamFocusRow.contextName]?.focusMarker || 0
            : 0;

          return (
            <TeamFocusRow
              focusMarker={focusMarker}
              rowData={teamFocusRow}
              key={`team-focus-row-${index}`}
              onSettingsChange={onSettingsChange}
              index={index}
            />
          );
        })}
      </Box>
    </Box>
  );
}

