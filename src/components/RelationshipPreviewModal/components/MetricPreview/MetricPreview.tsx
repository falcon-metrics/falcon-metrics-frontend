import { Box, Chip, Typography } from "@material-ui/core";
import { PreviewComponentProps } from "components/RelationshipPreviewModal/RelationshipPreviewModal";
import useSWR from "swr";
import fetch from "../../../../core/api/fetch";
import { Skeleton, ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import {
  Title,
  DividerLine,
} from "../../../../views/NorthStar/views/components/StrategicDriverDetail/components/StrategyTitle/StrategyTitle";
import {
  findContextAndParentDisplayNamesById,
  findContextAndParentIds,
  metricTypes,
} from "views/BusinessScorecard/utils/utils";
import useDashboardContexts from "views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts";
import {
  MetricSnapshot,
  MetricsEntry,
} from "views/BusinessScorecard/interfaces/interfaces";
import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import MetricValuesChart from "views/BusinessScorecard/components/MetricValuesChart";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { SelectedContextIdContext } from "components/UserStateProvider/UserStateProvider";
// import { useHistory } from "react-router-dom";

const fetchMetric = (url: string) => {
  return fetch.get(`${url}`).then((response) => response.data as MetricsEntry);
};

const MetricPreview = (props: PreviewComponentProps) => {
  const {
    data: response,
    isValidating,
  } = useSWR(`/business_scorecard/metrics/${props.entityId}`, fetchMetric, {
    revalidateOnFocus: false,
  });

  // const history = useHistory();
  const { setContextId, setSelectedKeys } = useContext(
    SelectedContextIdContext
  );
  const { contexts } = useDashboardContexts();
  const [selectedGranularity, setSelectedGranularity] = useState<string>("all");
  const [graphData, setGraphData] = useState<any>({ actual: [] });
  useEffect(() => {
    if (response) {
      populateGraphData(response);
    }
  }, [isValidating]);
  let targetString = "";
  let actualString = "";
  let improvementString = <></>;
  let improvement: number | undefined = undefined;
  let label, color, fontColor;
  let statusChip = <></>;
  if (response) {
    if (response.type === "fitness-criteria") {
      targetString = "minimum of " + response.target;
    } else if (response.type === "health-indicator") {
      targetString =
        "Between " + response.lowerLimit + " and " + response.upperLimit;
    } else if (response.type === "improvement-driver") {
      targetString = "target of " + response.target;
    } else {
      targetString = "";
    }
    if (
      response.metricValues &&
      response.metricValues?.length >= 1 &&
      response.metricValues[response.metricValues?.length - 1].value &&
      response.unit
    ) {
      actualString =
        response.metricValues[response.metricValues?.length - 1].value +
        response.unit;
    }
    if (
      response.metricValues &&
      response.metricValues.length >= 2 &&
      response.trendDirection
    ) {
      const currentValue =
        response.metricValues[response.metricValues?.length - 1].value;
      const previousValue =
        response.metricValues[response.metricValues?.length - 2].value;
      improvement =
        currentValue && previousValue
          ? ((currentValue - previousValue) / previousValue) * 100
          : 0;
    }
    improvementString =
      improvement !== undefined ? (
        <span>{Math.ceil(Math.abs(improvement)) + "%"}</span>
      ) : (
        <span>-</span>
      );
    let currentValue: number | undefined = undefined;
    if (
      response.metricValues?.length >= 1 &&
      response.metricValues[response.metricValues?.length - 1].value
    ) {
      currentValue =
        response.metricValues[response.metricValues?.length - 1].value;
    }
    if (response.type === "fitness-criteria") {
      if (currentValue && response.target && currentValue > response.target) {
        label = "Above threshold";
        color = "#7FE4DF";
        fontColor = "#000000";
      } else {
        label = "Below threshold";
        color = "#FF585D";
        fontColor = "#FFFFFF";
      }
    } else if (response.type === "improvement-driver") {
      if (currentValue && response.target && currentValue > response.target) {
        label = "Above target";
        color = "#7FE4DF";
        fontColor = "#000000";
      } else {
        label = "Below target";
        color = "#FF585D";
        fontColor = "#FFFFFF";
      }
    } else if (response.type === "health-indicator") {
      if (
        currentValue &&
        response.lowerLimit &&
        response.upperLimit &&
        currentValue >= response.lowerLimit &&
        currentValue <= response.upperLimit
      ) {
        label = "Healthy";
        color = "#7FE4DF";
        fontColor = "#000000";
      } else {
        label = "Unhealthy";
        color = "#FF585D";
        fontColor = "#FFFFFF";
      }
    } else {
      label = "Healthy";
      color = "#7FE4DF";
      fontColor = "#000000";
    }
    statusChip = (
      <Chip
        label={label}
        style={{
          backgroundColor: color,
          fontFamily: "'Roboto'",
          fontWeight: 400,
          fontSize: "13px",
          color: fontColor,
        }}
      />
    );
  }

  const filterValuesByGranularity = (
    values: MetricSnapshot[],
    granularity = selectedGranularity
  ) => {
    let months;
    switch (granularity) {
      case "1m":
        months = 1;
        break;
      case "3m":
        months = 3;
        break;
      case "6m":
        months = 6;
        break;
      case "1y":
        months = 12;
        break;
      default:
        months = 1;
        break;
    }
    if (granularity === "all") {
      return values;
    } else {
      const startDate = DateTime.now().minus({ months: months }).toMillis();
      const endDate = DateTime.now().toMillis();
      return values.filter((i) => {
        const time = DateTime.fromISO(i.recordedDate || "").toMillis();
        return time >= startDate && time <= endDate;
      });
    }
  };
  const populateGraphData = (metricData: MetricsEntry) => {
    const tempData: any = {
      actual: [],
      type: "",
      name: "",
    };
    if (metricData && metricData.metricValues) {
      tempData.actual = filterValuesByGranularity(metricData.metricValues).map(
        (i) => i.value
      );
      tempData.recordedDates = filterValuesByGranularity(
        metricData.metricValues
      ).map((i) =>
        i.recordedDate
          ? DateTime.fromISO(i.recordedDate).toLocaleString(DateTime.DATE_FULL)
          : ""
      );
      if (
        metricData &&
        (metricData.type === "fitness-criteria" ||
          metricData.type === "improvement-driver")
      ) {
        tempData.target = tempData.actual.map(() => metricData?.target);
      } else if (metricData && metricData.type === "health-indicator") {
        tempData.lowerLimit = tempData.actual.map(() => metricData?.lowerLimit);
        tempData.upperLimit = tempData.actual.map(() => metricData?.upperLimit);
      }
    }
    tempData.type = metricData?.type;
    tempData.name = metricData?.name;
    setGraphData(tempData);
  };

  const onChangeGranularity = (value) => {
    const tempData: any = {
      actual: [],
      type: "",
      name: "",
    };

    if (response && response.metricValues) {
      tempData.actual = filterValuesByGranularity(
        response?.metricValues,
        value
      ).map((i) => i.value);
      tempData.recordedDates = filterValuesByGranularity(
        response?.metricValues,
        value
      ).map((i) =>
        i.recordedDate
          ? DateTime.fromISO(i.recordedDate).toLocaleString(DateTime.DATE_FULL)
          : ""
      );
      if (
        response &&
        (response.type === "fitness-criteria" ||
          response.type === "improvement-driver")
      ) {
        tempData.target = tempData.actual.map(() => response?.target);
      } else if (response && response.type === "health-indicator") {
        tempData.lowerLimit = tempData.actual.map(() => response?.lowerLimit);
        tempData.upperLimit = tempData.actual.map(() => response?.upperLimit);
      }
    }
    tempData.type = response?.type;
    tempData.name = response?.name;
    setGraphData(tempData);
    setSelectedGranularity(value);
  };

  // console.log(response);
  const navigateToPage = () => {
    if (response?.context && contexts) {
      const contextIds = findContextAndParentIds(response.context, contexts);
      if (contextIds) {
        setContextId(contextIds[0]);
        setSelectedKeys(contextIds?.reverse());
        // history.push('/vmo/business-score-card');

        // Use window.open to open the page in a new tab
        const newTab = window.open("", "_blank");

        // Check if the newTab object is defined
        if (newTab) {
          newTab.location.href = `/vmo/business-score-card?contextId=${response.context}`;
        } else {
          console.log("Pop-up blocked. Please allow pop-ups for this site.");
        }
      }
    }
  };

  return (
    <>
      <Box
        style={{ cursor: "pointer", display: "flex", alignContent: "center" }}
        onClick={navigateToPage}
      >
        Go to page
        <OpenInNewIcon fontSize="small" />
      </Box>
      <Box style={{ paddingTop: 20 }}>
        {isValidating ? (
          <Skeleton height={400} variant="rect" />
        ) : response ? (
          <>
            <Title>Metric</Title>
            <DividerLine style={{ marginBottom: 20 }} />
            <Box
              style={{
                backgroundColor: "#FEFEFE",
                borderRadius: 16,
                padding: 30,
              }}
            >
              <Box style={{ marginTop: 20 }}>
                <Title>
                  {findContextAndParentDisplayNamesById(
                    response.context,
                    contexts || []
                  )
                    ?.reverse()
                    .join(" | ")}
                </Title>
                <DividerLine style={{ marginBottom: 20 }} />
                <Typography style={{ fontSize: 32 }}>
                  {response.name}
                </Typography>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography style={{ fontSize: 14 }}>
                    {metricTypes.find((i) => i.id === response.type)
                      ?.displayName || ""}
                  </Typography>
                  <Typography style={{ fontSize: 14 }}>
                    {"Target: " + targetString}
                  </Typography>
                  <Typography style={{ fontSize: 14 }}>
                    Actual: {actualString || "-"}
                  </Typography>
                  <Typography style={{ fontSize: 14 }}>
                    Improvement: {improvementString}
                  </Typography>
                  {statusChip}
                </Box>
                <Box style={{ backgroundColor: "#F0F0F0", marginTop: 20 }}>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      padding: 20,
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: "'Open Sans'",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "12px",
                        color: "#555D62",
                      }}
                    >
                      {response?.metricValues &&
                      response.metricValues?.length > 0
                        ? `Last check-in on ${DateTime.fromISO(
                            response.metricValues[
                              response.metricValues?.length - 1
                            ].recordedDate || ""
                          ).toLocaleString(DateTime.DATE_FULL)}.`
                        : "No check-in recorded."}
                    </Typography>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      padding: 20,
                    }}
                  >
                    <ToggleButtonGroup
                      size="small"
                      value={selectedGranularity}
                      exclusive
                      onChange={(_event, value) => {
                        onChangeGranularity(value);
                      }}
                      aria-label="text alignment"
                    >
                      <ToggleButton value="1m">1m</ToggleButton>
                      <ToggleButton value="3m">3m</ToggleButton>
                      <ToggleButton value="6m">6m</ToggleButton>
                      <ToggleButton value="1y">1y</ToggleButton>
                      <ToggleButton value="all">all</ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                  <Box style={{ height: 300 }}>
                    <MetricValuesChart data={graphData} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <Typography>Data not found</Typography>
        )}
      </Box>
    </>
  );
};

export default MetricPreview;
