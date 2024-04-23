import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import Box from "@material-ui/core/Box";
import ComparisonTable from "./components/FlowBasedMetrics";

const performanceCheckpointPreviewData = [
  {
    id: 290430,
    checkpoints_view_id: 2260,
    lead_time_portfolio_85: 95,
    lead_time_85: 7,
    flow_efficiency: 67,
    fitness_level: 91,
    lead_time_predictability: "Low",
  },
  {
    id: 290432,
    checkpoints_view_id: 2261,
    lead_time_portfolio_85: 145,
    lead_time_85: 7,
    flow_efficiency: 84,
    fitness_level: 93,
    lead_time_predictability: "Low",
  },
];

const sampleCheckpoint: any = [
  {
    id: "2261",
    name: "January",
    start_date: "2023-09-01T00:00:00.000Z",
    end_date: "2023-09-30T23:59:59.999Z",
    checked: true,
  },
  {
    id: "2260",
    name: "February",
    start_date: "2023-10-01T00:00:00.000Z",
    end_date: "2023-10-31T23:59:59.999Z",
    checked: true,
  },
];

const PerformanceCheckpointPreview = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      width={875}
    >
      <DashboardCard
        key="checkpoints-table"
        title=""
        isWidgetPreview={true}
      >
        <ComparisonTable
          isLoading={false}
          checkpointsSnapshots={performanceCheckpointPreviewData}
          selectedCheckpoints={sampleCheckpoint}
          metricsToDisplay={[
            "lead_time_portfolio_85",
            "lead_time_85",
            "lead_time_predictability",
            "fitness_level",
            "flow_efficiency",
          ]}
          customViewsToDisplay={[]}
        />
      </DashboardCard>
    </Box>
  );
};

export default PerformanceCheckpointPreview;
