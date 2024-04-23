import { DateTime } from "luxon";
import { PredictiveAnalysisResponse, SettingsData } from "../../../types";
import { PredictiveAnalysisDisplay } from "../predictionDisplay";
import useStyles from "../PredictionDisplay.styles";
import { DEFAULT_MONTH_YEAR_FORMAT, formatDate } from "utils/dateTime";

export interface Props {
    data: PredictiveAnalysisResponse['deliveryDateAnalysis'];
    settingsData: SettingsData;
}

export function DeliveryDatePredictiveAnalysisDisplay({ data, settingsData }: Props) {
    const classes = useStyles();
    const confidenceDateStyle = (desiredDate: string, comparisonDate: string) => {
        let comparisonDateObj = DateTime.fromISO(comparisonDate);
        // Shift the comparison date to the end of the interval
        if (settingsData.predictiveAnalysisPrecision === "week") {
            comparisonDateObj = comparisonDateObj.endOf('week');
        }

        // Compare both dates at the start of the day to fix
        // Or else for weekly precision, the background color is incorrect
        const beforeDesiredDate = comparisonDateObj.isValid &&
            comparisonDateObj.startOf('day') <= DateTime.fromISO(desiredDate).startOf('day');

        const backGroundColor = beforeDesiredDate
            ? classes.beforeDesiredGoal
            : classes.afterDesiredGoal;
        return `${classes.deliveryDate} ${backGroundColor}`;
    };
    const confidenceLevelColor = (desiredDateConfidenceLevel: number) => {
        if (desiredDateConfidenceLevel <= 64) return classes.lowConfidence;
        if (desiredDateConfidenceLevel <= 84 && desiredDateConfidenceLevel > 64)
            return classes.mediumConfidence;
        else return classes.highConfidence;
    };

    const formatText = (dateString: string | number) => {
        if (dateString === '-') return dateString;
        const date = DateTime.fromISO(dateString as string);
        let text = formatDate(date);
        if (settingsData.predictiveAnalysisPrecision === "week") {
            text = `Week of ${formatDate(date.startOf('week'))}`;
        }
        return text;
    };

    const desiredDate = data.desiredDeliveryDate ? DateTime.fromISO(data.desiredDeliveryDate) : undefined;
    return <PredictiveAnalysisDisplay
        data={data}
        headerText1="Estimated Delivery Date"
        keyConfidencePoints={{
            formatText,
            '50PercentileColor': confidenceDateStyle(data.desiredDeliveryDate, data['50Percentile']),
            '85PercentileColor': confidenceDateStyle(data.desiredDeliveryDate, data['85Percentile']),
            '98PercentileColor': confidenceDateStyle(data.desiredDeliveryDate, data['98Percentile']),
        }}
        desiredGoalConfidence={{
            textLine1: desiredDate ? desiredDate.day : "-",
            textLine2: desiredDate ? desiredDate.toFormat(DEFAULT_MONTH_YEAR_FORMAT) : "-",
            description: 'Desired Delivery Date',
            percentage: data.desiredDeliveryDateConfidenceLevelPercentage,
            confidenceLevelColor

        }}
    />;
}