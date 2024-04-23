import { Box, FormHelperText, Typography, withStyles } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import {
  DefaultTeamCapacityPercentage,
  SettingsData,
  TeamFocusRowData,
} from "../../../../types";
import useSettingsStyles from "../../settings.styles";

const valuetext = (value) => {
  return `${value}%`;
};
export interface Props {
  focusMarker: number | undefined;
  rowData: TeamFocusRowData;
  onSettingsChange: React.Dispatch<React.SetStateAction<SettingsData>>;
  index: number;
}

const CustomSlider = withStyles({
  root: {
    color: "#0077c8",
    height: 8,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  thumb: {
    height: 12,
    width: 12,
    backgroundColor: "#0077c8",
    marginTop: -4,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

export default function TeamFocusRow({
  focusMarker,
  rowData,
  onSettingsChange,
  index,
}: Props) {
  const classes = useSettingsStyles();

  const handleChange = (contextId: string, capacityValue: number) => {
    onSettingsChange((prevState) => {
      const contextIndex = prevState.contextCapacity.findIndex(
        (context) => context.contextId === contextId
      );
      if (contextIndex !== -1) {
        //need all this shallow copy to make it work https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
        const newContextCapacity = [...prevState.contextCapacity];
        const contextCapacityToUpdate = { ...newContextCapacity[contextIndex] };
        contextCapacityToUpdate.capacityPercentage = capacityValue;
        newContextCapacity[contextIndex] = contextCapacityToUpdate;
        return {
          ...prevState,
          contextCapacity: newContextCapacity,
        };
      } else return prevState;
    });
  };

  const markerPosition = `calc(${focusMarker}%)`;
  const labelMarkerPosition = `calc(${focusMarker}%`;
  const maxStep = 100; // represents 100%

  const marks = [];

  return (
    <Box
      className={
        classes.teamFocusRow +
        (index === 0 ? " " + classes.teamFocusFirstRow : "")
      }
    >
      <Box className={classes.teamFocusTextContainer}>
        <Typography
          style={{
            fontFamily: "Open Sans",
            fontSize: "12px",
          }}
        >
          {rowData.contextName}
        </Typography>
        <Typography
          color="primary"
          style={{
            fontFamily: "Open Sans",
            fontSize: 11,
            backgroundColor: "#ebf4fb",
            borderRadius: 4,
            padding: "2px 6px",
            color: "#0077c8",
            textAlign: "center",
          }}
        >
          {rowData.capacityPercentage}%
        </Typography>
      </Box>
      <Box className={classes.teamFocusSliderContainer}>
        {/* <div style={{ position: 'relative' }}> */}
        <CustomSlider
          aria-label={rowData.contextId}
          defaultValue={
            rowData.capacityPercentage ?? DefaultTeamCapacityPercentage
          }
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={0}
          max={maxStep}
          track="normal"
          getAriaValueText={valuetext}
          valueLabelFormat={valuetext}
          key={`slider-${rowData.contextId}`}
          onChangeCommitted={(_, value) => {
            if (typeof value === "number") {
              handleChange(rowData.contextId, value);
            }
          }}
          // ValueLabelComponent={SliderValueLabel}
        />

        <div
          style={{
            position: "absolute",
            height: "20px",
            top: 25,
            width: 1,
            borderRadius: 6,
            backgroundColor: "#0077c8",
            left: markerPosition,
          }}
        >
          <FormHelperText
            style={{
              fontSize: 10,
              fontWeight: 600,
              fontFamily: "Open Sans",
              position: "absolute",
              top: 18,
              color: "#0077c8",
              left: labelMarkerPosition,
              transform: "translateX(-50%)",
            }}
          >
            {focusMarker}%
          </FormHelperText>
        </div>
      </Box>
    </Box>
  );
}
