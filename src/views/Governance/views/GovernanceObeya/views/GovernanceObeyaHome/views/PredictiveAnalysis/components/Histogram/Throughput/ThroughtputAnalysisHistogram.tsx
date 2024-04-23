import { Box } from "@material-ui/core";
import { DateTime } from "luxon";
import { CommonHistogramData } from "../../../types";
import Histogram from "../Histogram";

export interface Props {
  histogramData: CommonHistogramData[];
  obeyaEndDate: string;
}
export const ThroughputAnalysisHistogram = ({ histogramData, obeyaEndDate }: Props) => {
  /*
  Parameters:
    scaleXLabel,
    tooltipText,
    xValues,
    yValues,
    dataParameter1
    yLabel
  */
 const obeyaEndDateText = DateTime.fromISO(obeyaEndDate).toLocaleString(DateTime.DATE_FULL)
  return (
    <Box>
      <Histogram
        scaleXLabel="Throughput"
        // data={histogramData}
        tooltipText = {`<p>%data-parameter1% of chance %kt flow item(s) will be delivered before ${obeyaEndDateText} </p>`}
        hideSubTitle= {true}
        chartHeight = {400}
        xValues={histogramData.map(item => item.bin)}
        yValues={histogramData.map(item => item.frequency)}
        dataParameter1={histogramData.map(item => item.accumulatedProbability)}
        yLabel={'Frequency of Simulation'}
      />
    </Box>
  );
};
