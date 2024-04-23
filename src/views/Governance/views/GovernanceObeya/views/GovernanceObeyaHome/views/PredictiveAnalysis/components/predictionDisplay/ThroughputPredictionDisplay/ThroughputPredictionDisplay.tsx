import { PredictiveAnalysisResponse } from '../../../types';
import { PredictiveAnalysisDisplay } from '../predictionDisplay';
import useStyles from '../PredictionDisplay.styles';

export interface Props {
    data: PredictiveAnalysisResponse['throughputAnalysis'];
}

export function ThroughputPredictiveAnalysisDisplay({ data }: Props) {
    const classes = useStyles();
    const goalConfidenceStyle = (desiredThroughput: number, comparisonThroughput: number)=>{
        const reachDesiredThroughput = comparisonThroughput >= desiredThroughput
        const backGroundColor = reachDesiredThroughput
            ? classes.beforeDesiredGoal
            : classes.afterDesiredGoal;
        return `${classes.deliveryDate} ${backGroundColor}`;
    }
    const confidenceLevelColor = (desiredDateConfidenceLevel: number) => {
    if (desiredDateConfidenceLevel <= 64) return classes.lowConfidence;
    if (desiredDateConfidenceLevel <= 84 && desiredDateConfidenceLevel > 64)
      return classes.mediumConfidence;
    else return classes.highConfidence;
  };
    const formatText = (throughput: string | number) => {
        return `${throughput} units`;
      };
    const desiredThroughput = data.obeyaRemainingItem;
    return <PredictiveAnalysisDisplay
    data = {data}
    headerText1="Forecasted Capacity"
    keyConfidencePoints={{
        formatText,
        '50PercentileColor': goalConfidenceStyle(desiredThroughput, data['50Percentile']),
        '85PercentileColor': goalConfidenceStyle(desiredThroughput, data['85Percentile']),
        '98PercentileColor': goalConfidenceStyle(desiredThroughput, data['98Percentile']),
    }}
    desiredGoalConfidence = {{
        textLine1: desiredThroughput,
        textLine2: 'flow items',
        description: 'Expected remaining work',
        percentage: Math.round(data.obeyaRemainingItemConfidenceLevelPercentage * 10) /10,
        confidenceLevelColor

    }}
    />
}