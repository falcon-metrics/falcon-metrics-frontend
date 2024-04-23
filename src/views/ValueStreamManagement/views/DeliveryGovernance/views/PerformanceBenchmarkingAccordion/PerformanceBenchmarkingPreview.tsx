import Box from "@material-ui/core/Box";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { DataGridPro } from "@mui/x-data-grid-pro";

const performanceBenchmarkPreviewData: any = [
  {
    id: 0,
    metricName: "Lead Time team level items (85th)",
    "ad8a3b57-fa3d-46f3-a755-9b9e88009e82": "40 days",
    "0c2d0d12-996c-41fe-943a-3f3abdbd70b4": "60 days",
  },
  {
    id: 1,
    metricName: "Lead Time Target Met",
    "ad8a3b57-fa3d-46f3-a755-9b9e88009e82": "65%",
    "0c2d0d12-996c-41fe-943a-3f3abdbd70b4": "35%",
  },
  {
    id: 2,
    metricName: "Flow Efficiency (%)",
    "ad8a3b57-fa3d-46f3-a755-9b9e88009e82": "54%",
    "0c2d0d12-996c-41fe-943a-3f3abdbd70b4": "46%",
  },
  {
    id: 3,
    metricName: "Lead Time Predictability",
    "ad8a3b57-fa3d-46f3-a755-9b9e88009e82": "High",
    "0c2d0d12-996c-41fe-943a-3f3abdbd70b4": "Low",
  },
  {
    id: 4,
    metricName: "Throughput Predictability",
    "ad8a3b57-fa3d-46f3-a755-9b9e88009e82": "Low",
    "0c2d0d12-996c-41fe-943a-3f3abdbd70b4": "High",
  },
];

const columns = [
  {
    field: "metricName",
    headerName: "Flow-based Metrics",
    sortable: false,
    width: 400,
    minWidth: 420,
  },
  {
    field: "ad8a3b57-fa3d-46f3-a755-9b9e88009e82",
    headerName: "Marketing",
    sortable: false,
    minWidth: 300,
    width: 200,
  },
  {
    field: "0c2d0d12-996c-41fe-943a-3f3abdbd70b4",
    headerName: "Sales",
    sortable: false,
    minWidth: 300,
    width: 200,
  },
];

const PerformanceBenchmarkingPreview = () => {
  return (
    <Box display="flex" flexDirection="column" flexGrow={1} width={875}>
      <DashboardCard key="checkpoints-table" title="" isWidgetPreview={true}>
        <DataGridPro
          columns={columns}
          rows={performanceBenchmarkPreviewData}
          autoHeight
          hideFooter
          disableColumnReorder
        />
      </DashboardCard>
    </Box>
  );
};

export default PerformanceBenchmarkingPreview;
