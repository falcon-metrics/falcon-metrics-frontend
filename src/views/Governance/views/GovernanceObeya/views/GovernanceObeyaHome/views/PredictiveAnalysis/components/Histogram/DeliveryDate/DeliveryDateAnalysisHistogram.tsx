import { Box } from "@material-ui/core";
import { DeliveryDateHistogramData } from "../../../types";
import Histogram from "../Histogram";

export interface Props {
  histogramData: DeliveryDateHistogramData[];
}
export const DeliveryDateAnalysisHistogram = ({ histogramData }: Props) => {
  /*
  Parameters:
    scaleXLabel,
    tooltipText,
    xValues,
    yValues,
    dataParameter1
    yLabel
  */
  return (
    <Box>
      <Histogram
        scaleXLabel="Delivery Date"
        // data={histogramData}
        tooltipText = '<p>%data-parameter1% of chance the obeya will be delivered before %kt </p>'
        hideSubTitle= {true}
        chartHeight = {400}
        xValues={histogramData.map(item => new Date(item.deliveryDate).toLocaleDateString())}
        yValues={histogramData.map(item => item.frequency)}
        dataParameter1={histogramData.map(item => item.accumulatedProbability)}
        yLabel={'Frequency of Simulation'}
      />
    </Box>
  );
};
