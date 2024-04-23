import { Box, makeStyles, Slider } from "@material-ui/core";
import { SettingsData } from "../../../../types";
import useSettingsStyles from "../../settings.styles";
import { TeamPerformanceLevels } from "../../types";
import SliderValueLabel from "../SliderValueLabel";

export interface Props {
  teamPerformance: number;
  onSettingsChange: React.Dispatch<React.SetStateAction<SettingsData>>;
}

export default function TeamPerformance({
  teamPerformance,
  onSettingsChange,
}: Props) {
  const handleChange = (value: number) => {
    console.log('handleChange : ', value)
    onSettingsChange((prevState) => {
      return {
        ...prevState,
        teamPerformancePercentage: value,
      };
    });
  };
  const useTeamPerformanceStyles = makeStyles({
    teamPerformanceSlider: {
      fontSize: "10px",
    },
    markLabel: {
      fontSize: "10px",
    },
    teamPerformanceSliderContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
      marginLeft: '8%'
    },
    teamPerformanceContainer: {
      display: "flex",
      flexDirection: "column",
      maxHeight: "25%",
      alignItems: "flex-start",
      width: "80%",
      marginBottom: 20
    },
    sliderMarkLabel: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

  const performanceClasses = useTeamPerformanceStyles();
  const settingsClasses = useSettingsStyles();


  const tpRange = TeamPerformanceLevels.range
  const tpDefaultValue = TeamPerformanceLevels.defaultValue

  // Set the value for slider to the default value
  let sliderValue = tpDefaultValue
  // Find the teamPerformance value in the range array, if found, set the sliderValue to the index of the element in the array
  const indexOfTpValue = tpRange.findIndex((tp) => tp.value === teamPerformance)
  if (indexOfTpValue !== -1) {
    sliderValue = indexOfTpValue
  } else {
    const errMsg = `Received an invalid value of team performance. Got ${teamPerformance}, expected one of these : ${tpRange.map(tp => tp.value)}`
    // Throw an error?
    console.error(errMsg)
  }


  // Marks on the slider
  const marks = tpRange.map(
    (tp, index) => {
      // This is to break up the label into multiple words
      // Couldnt get it to work with just CSS. 
      // So breaking the word and putting each word in a div so every word is in a separate line
      const lineSplit = tp.text.split(' ')
      if (index === sliderValue) {
        lineSplit.push(`(${tp.value}%)`)
      }
      return {
        // Use the index as the value for the slider. Retrieve the actual value from the array with this index
        value: index,
        label: (
          <Box className={performanceClasses.sliderMarkLabel}>
            {
              lineSplit.map((label, i) => <Box key={i}>{label}</Box>)
            }
          </Box>
        )
      }
    })



  return (
    <Box
      className={`${performanceClasses.teamPerformanceContainer}`}
    >
      <Box className={settingsClasses.heading}>Team Performance</Box>
      <Box className={performanceClasses.teamPerformanceSliderContainer}>
        <Slider
          classes={{
            root: performanceClasses.teamPerformanceSlider,
            markLabel: performanceClasses.markLabel
          }}
          track={false}
          aria-labelledby="track-false-slider"
          value={sliderValue}
          marks={marks}
          step={null}
          max={marks.length - 1}
          min={0}
          onChangeCommitted={(_, tpIndex) => {
            if (typeof tpIndex === "number") {
              handleChange(tpRange[tpIndex].value);
            }
          }}
          valueLabelFormat={(tpIndex) => `${tpRange[tpIndex].value}%`}
          // Custom component to display the label
          ValueLabelComponent={SliderValueLabel}
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );
}
