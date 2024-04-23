import { Box } from "@material-ui/core";
import { PredictiveAnalysisResponse } from "../../types";
import { useAssumptionStyles } from "./assumptions.style";
import ErrorIcon from '@material-ui/icons/Error';
export interface Props {
  analysisData: PredictiveAnalysisResponse;
}

export function Assumptions({ analysisData }: Props) {
  const assumptionsClasses = useAssumptionStyles();
  const { assumptions } = analysisData;
  return <Box className={assumptionsClasses.container}>
    <Box className={assumptionsClasses.heading}>
      <ErrorIcon fontSize="small" style={{ color: '#F3BD48' }} />Forecast influenced by user settings. Assumptions:
    </Box>
    <Box className={assumptionsClasses.assumptionContainer} component='ul'>
      <Box className={assumptionsClasses.assumptionItem} component='li'>
        {assumptions.teamPerformance}
      </Box>
      <Box className={assumptionsClasses.assumptionItem} component='li'>
        {assumptions.workExpansion}
      </Box>
      <Box className={assumptionsClasses.assumptionItem} component='li'>
        {assumptions.workItemLevel}
      </Box>
      <Box className={assumptionsClasses.assumptionItem} component='li'>
        {assumptions.fullFocus}
      </Box>
      <Box className={assumptionsClasses.assumptionItem} component='li'>
        {assumptions.precision}
      </Box>
    </Box>
  </Box>;
}