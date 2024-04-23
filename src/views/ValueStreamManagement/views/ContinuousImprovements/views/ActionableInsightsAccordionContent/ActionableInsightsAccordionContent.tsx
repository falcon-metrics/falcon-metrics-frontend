
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';
import ExpandableInsightEvidence from './components/ExpandableInsightEvidence/ExpandableInsightEvidence';
import { ActionableInsightsBodyResponse } from '../../hooks/useActionableInsightsData';
import { Skeleton } from '@material-ui/lab';
import ExtendedTooltip from 'views/ValueStreamManagement/components/ExtendedTooltip';

const AnalysisSeparationLine = styled(Box)({
  flexBasis: '100%',
  height: '1px',
  marginTop: '21px',
  backgroundColor: '#32383E38',
});

const BlueCircle = styled(Box)({
  width: '12px',
  height: '12px',
  backgroundColor: '#0077C8',
  borderRadius: '40px',
  flexShrink: 0,
});

const TealCircle = styled(Box)({
  width: '12px',
  height: '12px',
  backgroundColor: '#2AD2C9',
  borderRadius: '40px',
  flexShrink: 0,
});

const SmallTealCircle = styled(Box)({
  width: '8px',
  height: '8px',
  backgroundColor: '#2AD2C9C7',
  borderRadius: '40px',
  flexShrink: 0,
});

type Props = {
  data: ActionableInsightsBodyResponse | null;
  error?: Error;
  isLoading: boolean;
  showInsightsOnly: boolean;
}

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

const ActionableInsightsAccordionContent = ({
  data,
  error,
  isLoading,
  showInsightsOnly
}: Props) => {
  if (error) {
    if (isDevelopmentEnv) {
      return <Box display="flex" justifyContent="center" width="100%" padding="100px 0px">
        <div style={{ color: 'darkred' }}>Error: {error.message}</div>
      </Box>
    }
    return <Box display="flex" justifyContent="center" width="100%" padding="100px 0px">
      <div style={{ color: 'darkred' }}>There was an error while fetching data for this widget</div>
    </Box>
  }

  if (isLoading) {
    return (
      <Box className="all-actionable-insights" width="100%" display="flex" flexWrap="wrap">{
        [1, 2].map((index) => (
          <Box key={index} className="pattern-list" display="flex" flexWrap="wrap" flexBasis="50%" width="50%">
            <Box className="pattern" margin="1%" padding="20px" flexBasis="100%" width="100%" borderRadius="10px" paddingBottom="35px" boxShadow="0px 1px 3px 1px #002D4626, 0px 1px 2px 0px #1F49614D">
              
              <Box className="title-loading-skeleton" display="flex" alignItems="center" marginTop="20px" marginBottom="-10px">
                <Box display="flex" marginRight="9px">
                  <Skeleton variant="circle" width={12} height={12} />
                </Box>
                <Skeleton width={418} height={22} variant="text" />
              </Box>
              { !showInsightsOnly ? 
              <>
                {
                  [1, 2, 3].map((index) => (
                    <Box key={index} className="content-loading-skeleton">
                      <Box display="flex" alignItems="center" marginTop="40px" marginLeft="8px">
                        <Box display="flex" marginRight="9px">
                          <Skeleton variant="circle" width={10} height={10} />
                        </Box>
                        <Skeleton width={300} height={18} variant="text" />
                      </Box>
                      <Box display="flex" alignItems="center" marginTop="20px" marginLeft="35px">
                        <Box display="flex" marginRight="11px">
                          <Skeleton variant="circle" width={7} height={7} />
                        </Box>
                        <Skeleton width={164} height={11} variant="text" />
                      </Box>
                      <Box display="flex" alignItems="center" marginTop="12px" marginLeft="35px">
                        <Box display="flex" marginRight="11px">
                          <Skeleton variant="circle" width={7} height={7} />
                        </Box>
                        <Skeleton width={100} height={11} variant="text" />
                      </Box>
                      <Box display="flex" alignItems="center" marginTop="12px" marginLeft="35px" marginBottom="35px">
                        <Box display="flex" marginRight="11px">
                          <Skeleton variant="circle" width={7} height={7} />
                        </Box>
                        <Skeleton width={200} height={11} variant="text" />
                      </Box>
                      {index !== 3 ? <AnalysisSeparationLine /> : null}
                    </Box>
                  ))
                }
              </> : <></> 
              }
            </Box>
          </Box>
        ))
      }</Box>
    );
  }

  if (!data || !data.patterns || data.patterns.length === 0) {
    return <Box display="flex" justifyContent="center" width="100%" padding="100px 0px">
      <div style={{ color: 'gray' }}>There are no Actionable Insights for the current criteria.</div>
    </Box>
  }

  return (
    <Box className="all-actionable-insights" width="100%" display="flex" flexWrap="wrap">{
      data.patterns.map((pattern, index) => (
        <Box key={index} className="pattern-list" display="flex" flexWrap="wrap" flexBasis="50%" width="50%">
          <Box className="pattern" margin="1%" padding="20px" flexBasis="100%" width="100%" borderRadius="10px" boxShadow="0px 1px 3px 1px #002D4626, 0px 1px 2px 0px #1F49614D">
            <Box className="pattern-title" fontSize="21.6px" fontFamily="Open Sans" fontWeight="bold" marginTop="9px">Pattern identified: {pattern.title}</Box>
            
            { !showInsightsOnly ? 
            <>
              <Box className="descriptive-analysis">
                <Box className="header" display="flex" alignItems="center" marginTop="18px" marginBottom="4px">
                  <BlueCircle />
                  <Box fontSize="16px" margin="1px 0px 0px 12px" fontFamily="Open Sans">Descriptive Analysis - What has been identified</Box>
                </Box>
                <Box className="descriptive-analysis-list">{
                  pattern.descriptives.map((descriptive, index) => (
                    <ExpandableInsightEvidence key={index} title={descriptive.title} evidences={descriptive.evidence.map(e => e.description)} defaultExpanded={true}></ExpandableInsightEvidence>
                  ))
                }</Box>
              </Box>

              <AnalysisSeparationLine />

              <Box className="diagnostic-analysis">
                <Box className="header" display="flex" alignItems="center" marginTop="18px" marginBottom="4px">
                  <BlueCircle />
                  <Box fontSize="16px" margin="1px 0px 0px 12px" fontFamily="Open Sans">Diagnostic Analysis - Possible causes</Box>
                </Box>
                <Box className="diagnostic-analysis-list">{
                  pattern.diagnostics.map((diagnostic, index) => (
                    <ExpandableInsightEvidence key={index} title={diagnostic.title} evidences={diagnostic.evidence.map(e => e.description)} defaultExpanded={true}></ExpandableInsightEvidence>
                  ))
                }</Box>
              </Box>

              <AnalysisSeparationLine />

              <Box className="prescriptive-analysis">
                <Box className="header" display="flex" alignItems="center" marginTop="18px" marginBottom="4px">
                  <TealCircle />
                  <Box fontSize="16px" margin="1px 0px 0px 12px" fontFamily="Open Sans">Prescriptive Analysis - Possible course of action</Box>
                </Box>
                <Box className="prescriptive-analysis-list">{
                  pattern.prescriptions.map((prescription, index) => (
                    <Box marginLeft="32px" marginBottom="9px" marginTop="8px" key={index} display="flex" alignItems="center">
                      <SmallTealCircle />
                      <Box marginLeft="8px" fontSize="12.6px" fontFamily="Open Sans">{prescription.title}</Box>
                    </Box>
                  ))
                }</Box>
              </Box>
            </> : <></>
            }

            { !isLoading && pattern.widgetInfo?.length !== 0 ? 
            <ExtendedTooltip maxWidth="md" content={pattern.widgetInfo} /> : <></> }
          
          </Box>
        </Box>
      ))
    }</Box>
  );
};

export default ActionableInsightsAccordionContent;