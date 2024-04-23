import { Box, List, ListItem } from "@material-ui/core";
import { Fragment, memo } from "react";
import { PredictiveAnalysisResponse } from "../../types";
import useStyles from "./PredictionDisplay.styles";

/* 
Parameters
1. HeaderText1
2. DesiredDateConfidence:{
  1. text-line-1
  2. text-line-2
  3. description (ie. delivery date or work item)
  4. percentage
  5. confidenceLevelColor() -> classes.lowConfidence / mediumConfidence/ highConfidence
}
3. KeyConfidenceDates:{
  confidenceDateStyle() ->classes.beforeDesiredDate | classes.afterDesiredDate;
  formatText: (percentileData: string) => string
}
*/
export interface Props {
  data:
    | PredictiveAnalysisResponse["deliveryDateAnalysis"]
    | PredictiveAnalysisResponse["throughputAnalysis"];
  headerText1: string;
  desiredGoalConfidence: {
    textLine1: string | number;
    textLine2: string;
    description: string;
    percentage: number;
    confidenceLevelColor: (percentage: number) => string;
  };
  keyConfidencePoints: {
    formatText: (percentileData: string | number) => string;
    "50PercentileColor": string;
    "85PercentileColor": string;
    "98PercentileColor": string;
  };
}

export function PredictiveAnalysisDisplay({
  data,
  headerText1,
  keyConfidencePoints,
  desiredGoalConfidence: desiredDateConfidence,
}: Props) {
  const classes = useStyles();
  const Header = () => {
    return (
      <ListItem alignItems="center" className={classes.contentRow}>
        <Box display="inline-flex" className={classes.headerColumn}>
          Confidence Level
        </Box>
        <Box
          display="inline-flex"
          className={classes.headerColumn}
          aria-label="headerText"
        >
          {headerText1}
        </Box>
      </ListItem>
    );
  };
  const { formatText } = keyConfidencePoints;
  const {
    textLine1,
    textLine2,
    description,
    percentage,
    confidenceLevelColor,
  } = desiredDateConfidence;

  const DesiredDateConfidence = () => {
    // const desiredDate = DateTime.fromISO(data.desiredDeliveryDate);
    return (
      <Box className={classes.desiredGoalContainer}>
        <Box className={classes.desiredGoalBlock}>
          <Box sx={{ fontSize: 36, fontWeight: 600 }} aria-label="text-line-1">
            {textLine1.toString()}
          </Box>
          <Box sx={{ fontSize: 16, fontWeight: 600 }} aria-label="text-line-2">
            {textLine2}
          </Box>
          <Box aria-label="description">{description}</Box>
        </Box>
        <Box
          className={`${classes.desiredGoalBlock} ${confidenceLevelColor(
            percentage
          )}`}
        >
          <Box sx={{ fontSize: 36, fontWeight: 600 }}>{percentage}%</Box>
          <Box>Confidence Level</Box>
        </Box>
      </Box>
    );
  };
  const KeyConfidencePoints = ({
    data,
    keyConfidencePoints,
  }: {
    data:
      | PredictiveAnalysisResponse["deliveryDateAnalysis"]
      | PredictiveAnalysisResponse["throughputAnalysis"];
    keyConfidencePoints: {
      "50PercentileColor": string;
      "85PercentileColor": string;
      "98PercentileColor": string;
    };
  }) => {
    return (
      <Fragment>
        <ListItem alignItems="center" className={classes.contentRow}>
          <Box display="inline-flex" className={classes.contentColumn}>
            50%
          </Box>
          <Box display="inline-flex" className={classes.contentColumn}>
            <Box className={keyConfidencePoints["50PercentileColor"]}>
              {formatText(data["50Percentile"])}
            </Box>
          </Box>
        </ListItem>
        <ListItem alignItems="center" className={classes.contentRow}>
          <Box display="inline-flex" className={classes.contentColumn}>
            85%
          </Box>
          <Box display="inline-flex" className={classes.contentColumn}>
            <Box className={keyConfidencePoints["85PercentileColor"]}>
              {formatText(data["85Percentile"])}
            </Box>
          </Box>
        </ListItem>
        <ListItem alignItems="center" className={classes.contentRow}>
          <Box display="inline-flex" className={classes.contentColumn}>
            98%
          </Box>
          <Box display="inline-flex" className={classes.contentColumn}>
            <Box className={keyConfidencePoints["98PercentileColor"]}>
              {formatText(data["98Percentile"])}
            </Box>
          </Box>
        </ListItem>
      </Fragment>
    );
  };
  return (
    <Box className={classes.container}>
      <List className={classes.tableContainer}>
        <Header />
        <KeyConfidencePoints
          data={data}
          keyConfidencePoints={keyConfidencePoints}
        />
      </List>
      <DesiredDateConfidence />
    </Box>
  );
}

export default memo(PredictiveAnalysisDisplay);
