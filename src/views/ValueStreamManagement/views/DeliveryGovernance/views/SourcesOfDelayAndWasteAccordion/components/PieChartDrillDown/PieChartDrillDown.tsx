import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { WorkItemGroupCount } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/interfaces/profileOfWork";
import StaticDonutChart from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/ProfileOfWorkSection/components/StaticDonutChart";
type Props = {
    data: WorkItemGroupCount[] | null | undefined;
    isValidating: boolean;
    notConfiguredMessage: string;
};
const PieChartDrillDown = ({
    data,
    isValidating,
    notConfiguredMessage
}: Props) => {
    if (!data) {
        return <Box sx={{
            height: 350,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Typography align="center"> {notConfiguredMessage}</Typography>
        </Box >;
    }
    return <Box>
        <StaticDonutChart
            data={data}
            isValidating={isValidating}
        />
    </Box>;
};

export default PieChartDrillDown;