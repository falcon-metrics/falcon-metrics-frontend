import ZingChart from "zingchart-react";
import { useEffect, useState } from "react";
import {
  Box,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import CycleTimeScatterplot from "../CycleTimeScatterplot";
import { useBottleneckFinderData } from "../../hooks/useBottleneckFinderData";
import NoDataPanel from "views/ValueStreamManagement/components/NoDataPanel";
import { Workflow } from "./interfaces";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import SkeletonBarChart from "views/ValueStreamManagement/components/SkeletonBarChart";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

// const calculateThresholdWeight = (average, sumQueueWeights) => {
//   return average == null || average === 0
//     ? -1
//     : (average || 0) + sumQueueWeights;
// };

export const BottleneckFinderChart = () => {
  const { data, isLoading } = useBottleneckFinderData();

  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const [chartData, setChartData] = useState<any>([]);
  const [cycleTimeData, setCycleTimeData] = useState<Workflow>();

  const updateChartData = (selectedType) => {
    const dataForSelectedType =
      data &&
      data.length > 0 &&
      data.find((x) => x.workflowId === selectedType);

    // if (dataForSelectedType?.steps) {
    //   let sumQueueWeights = 0;

    //   for (const currentStep of dataForSelectedType.steps) {
    //     if (currentStep.type === "queue") {
    //       sumQueueWeights += currentStep.thresholdWeight || 0;
    //     }

    //     if (currentStep.type === "active") {
    //       // Set the thresholdWeight of the active step to -1 if its average is 0, null, or undefined,
    //       // otherwise, set it to the sum of its average and the sum of queue weights before it
    //       currentStep.thresholdWeight = calculateThresholdWeight(
    //         currentStep.average,
    //         sumQueueWeights
    //       );
    //     }
    //   }
    // }

    setChartData(generateChartData(dataForSelectedType));
    setCycleTimeData(dataForSelectedType);
  };

  const generateChartData = (data) => {
    const chartData: any = [];
    if (data?.steps)
      data?.steps.forEach((stepData) => {
        //zap and hourglass symbols respectively
        const iconComponent =
          stepData.type === "active" ? "&#x26A1;" : "&#x231B;";

        // const warning = stepData.type === "active" ? "❗" : "";
        const avgDayUnit = stepData.average?.toFixed(2) > 1 ? "days" : "day";
        const wipUnit =
          stepData.currentWipCount > 1 ? "flow units" : "flow unit";

        chartData.push({
          label: `${iconComponent}<b>${stepData.name}</b>\nAvg: ${
            stepData.average?.toFixed(2) || "-"
          } ${avgDayUnit}\nWIP: ${stepData.currentWipCount} ${wipUnit}`,
          value: parseFloat(stepData.thresholdWeight?.toFixed(2)) || 0,
          type: stepData.type,
          x: "15%",
          y: "5%",
          textAlign: "center",
        });
      });
    return chartData;
  };

  // Call updateChartData when the selectedFlowItemType changes
  useEffect(() => {
    updateChartData(selectedWorkflow);
  }, [selectedWorkflow]);

  useEffect(() => {
    if (data && data.length > 0) setSelectedWorkflow(data[0].workflowId);
  }, [data]);

  const bottleneckItems =
    cycleTimeData?.steps.filter((item: any) => item?.thresholdWeight > 1)
      .length ?? 0;

  const chartConfig = {
    globals: {
      fontFamily: "Open Sans",
      textAlign: "left",
    },
    graphset: [
      {
        type: "heatmap",
        backgroundColor: "#fff",
        title: {
          adjustLayout: true,
          backgroundColor: "none",
        },
        text: "No bottlenecks found",
        visible: bottleneckItems === 0,
        legend: {
          visible: false,
        },
        plot: {
          hoverState: {
            visible: false,
          },
          tooltip: {
            visible: false,
          },
          aspect: "brightness",
          rules: [
            {
              backgroundColor: "#D22730",
              rule: '"%data-type" == "active"',
            },
            {
              backgroundColor: "#CCCCCC",
              rule: '"%data-type" == "queue"',
            },
            {
              backgroundColor: "#FEFEFE",
              rule: "%v === 0",
            },
          ],
          border: "3px solid #FFF",
          shadow: false,
        },
        plotarea: {
          margin: "dynamic",
        },
        tooltip: {
          visible: true,
        },
        scaleX: {
          placement: "opposite",
          textAlign: "center",
          labels: chartData.map((item) => item.label),
          guide: {
            visible: "false",
          },
          lineWidth: "0px",
          tick: {
            visible: false,
          },
        },
        scaleY: {
          visible: false,
        },
        series: [
          {
            values: chartData.map((item) => item.value),
            "data-type": chartData.map((item) => item.type),
            visible: bottleneckItems > 0,
          },
        ],
      },
    ],
  };

  return (
    <Box className="full-width-chart">
      <Box className="obeya-container charts-page-grid">
        <DashboardCard title="Cycle Time Analysis" size={ChartSizes.fixed4}>
          <Box display="flex" flexDirection="column" width={"100%"}>
            <Box m={1}>
              <FormHelperText>Flow Item Type</FormHelperText>
              <Select
                disabled={isLoading && !data}
                style={{ width: 350 }}
                value={selectedWorkflow}
                onChange={(event) =>
                  setSelectedWorkflow(event.target.value as string)
                }
              >
                {data &&
                  data.length > 0 &&
                  data.map((x) => {
                    return (
                      <MenuItem value={x.workflowId} key={x.workflowId}>
                        {x.projectName} / {x.workItemTypeName}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Box>
            {!isLoading ? (
              <Box
                width={"100%"}
                flexDirection="column"
                display="flex"
                justifyContent="flex-start"
              >
                {cycleTimeData ? (
                  <>
                    <Box>
                      <Typography
                        style={{
                          fontFamily: "Open Sans",
                          fontSize: 16,
                          fontWeight: 600,
                          marginTop: 10,
                          marginLeft: 70,
                        }}
                      >
                        Bottleneck Indicator
                      </Typography>
                      {bottleneckItems > 0 ? (
                        <Typography
                          style={{
                            fontFamily: "Open Sans",
                            fontSize: 14,
                            marginLeft: 70,
                            color: "#818589",
                          }}
                        >
                          {bottleneckItems}{" "}
                          {bottleneckItems > 1 ? "bottlenecks" : "bottleneck"}
                        </Typography>
                      ) : (
                        <>&nbsp;</>
                      )}
                    </Box>
                    <Box
                      height={110}
                      style={{ marginLeft: 50, marginRight: 8 }}
                    >
                      <ZingChart data={chartConfig} />
                      {bottleneckItems === 0 && (
                        <Box
                          height={35}
                          width={"90%"}
                          style={{
                            bottom: 20,
                            top: 380,
                          }}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          position={"absolute"}
                        >
                          <Typography
                            style={{
                              fontFamily: "Open Sans",
                              fontSize: 14,
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              fontWeight: 600,
                            }}
                          >
                            No bottlenecks in your process &nbsp;
                            <EmojiEmotionsIcon style={{ color: "#2AD2C9" }} />
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <CycleTimeScatterplot scatterplotData={cycleTimeData} />
                  </>
                ) : (
                  <NoDataPanel />
                )}
              </Box>
            ) : (
              <SkeletonBarChart />
            )}
          </Box>
        </DashboardCard>
      </Box>
    </Box>
  );
};
