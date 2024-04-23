import memo from 'utils/typescript/memo';

import { Box } from '@material-ui/core';
import Dependencies from '../Dependencies';
import Risk from '../Risk';
import DashboardCard from 'components/Charts/components/DashboardCard/DashboardCard';

export interface RisksAndDependenciesProps {
    obeyaRoomId?: string;
}

const RisksAndDependencies = ({
    obeyaRoomId
}: RisksAndDependenciesProps): JSX.Element => {

    return (
        <Box className="full-width-chart">
            <Box className="obeya-container charts-page-grid" style={{ padding: '13px 4px', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <DashboardCard
                    title="Risks"
                    fullScreen={true}>
                    <Risk obeyaRoomId={obeyaRoomId} />
                </DashboardCard>
                <DashboardCard
                    title="Dependencies"
                    fullScreen={true}>
                    <Dependencies obeyaRoomId={obeyaRoomId} />
                </DashboardCard>
            </Box>
        </Box >
    );
};

export default memo(RisksAndDependencies);
