import { AggregationKey } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';

export const getPredictabilityTooltipByAggregation = (
  aggregation: AggregationKey,
): string => {
  switch(aggregation) {
    case 'day':
      return "Predictability was %t on %kt"; 
    case 'month':
      return "Predictability was %t in %kt"; 
    default:
      return `Predictability was %t in the ${aggregation} of %kt`; 
  }
}

export const getProductivityTooltipByAggregation = (
  aggregation: AggregationKey,
): string => {

  if (aggregation === "day")
    return "Productivity was %t on %kt";
  else if (aggregation === "month")
    return "Productivity was %t in %kt";
  else 
    return `Productivity was %t in the ${aggregation} of %kt`;
}

export const predictabilityColors = 
[
  {label: "High", color: "#22A8A1"}, 
  {label: "Low", color: "#E1523E"},
];

export const getPredictabilityColor = (
  variability: string
): string => {

  switch(variability) {
    case 'High':
      return "#22A8A1"; 
    case 'Low':
      return "#E1523E"; 
    default:
      return "#EEEEEE"; 
  }
}

export const productivityColors = 
[
  {label: "No work completed", color: "#B22229"},
  {label: "Terrible", color: "#E03C31"},
  {label: "Bad", color: "#F56D5E"},
  {label: "Poor", color: "#F0870D"},
  {label: "Slightly Under", color: "#FF9E19"},
  {label: "Average", color: "#FFCB45"},
  {label: "Good", color: "#55DBD4"},
  {label: "Great", color: "#69CECC"},
  {label: "Excellent", color: "#00B5AE"},
  {label: "Phenomenal", color: "#008F80"},
];

export const getProductivityColor = (
  variability: string
): string => {
  
  switch(variability) {
    case 'No work completed':
      return "#B22229"; 
    case 'Terrible':
      return "#E03C31"; 
    case 'Bad':
      return "#F56D5E"; 
    case 'Poor':
      return "#F0870D"; 
    case 'Slightly Under':
      return "#FF9E19"; 
    case 'Average':
      return "#FFCB45"; 
    case 'Good':
      return "#55DBD4"; 
    case 'Great':
      return "#69CECC"; 
    case 'Excellent':
      return "#00B5AE"; 
    case 'Phenomenal':
      return "#008F80"; 
    default: // Out of range
      return "#EEEEEE"; 
  }
}