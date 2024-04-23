import Box from '@material-ui/core/Box';
import { CFDChart } from './components/CFDChart';
import { FlowDiagramResponse } from '../../hooks/useCumulativeFlowDiagramData';
import SkeletonBarChart from 'views/ValueStreamManagement/components/SkeletonBarChart';

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

type Props = {
  data: FlowDiagramResponse | null;
  error?: Error;
  isLoading?: boolean;
};

export const CumulativeFlowDiagramContent = ({
  data,
  error,
  isLoading,
}: Props) => {
  if (error) {
    if (isDevelopmentEnv) {
      return <Box display="flex" justifyContent="center" width="100%" padding="100px 0px">
        <div style={{ color: 'darkred' }}>Errors: {error.message}</div>
      </Box>;
    } else {
      return <Box display="flex" justifyContent="center" width="100%" padding="100px 0px">
        <div style={{ color: 'darkred' }}>There was an error while fetching data for this widget</div>
      </Box>;
    }
  }

  if (isLoading || data === null || data === undefined) {
    return <SkeletonBarChart />
  }

  return <CFDChart data={data.cfdData} />;
};
