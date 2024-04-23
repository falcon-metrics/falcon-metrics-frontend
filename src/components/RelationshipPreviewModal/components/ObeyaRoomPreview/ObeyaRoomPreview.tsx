import { Box, Divider, Grid, Typography } from "@material-ui/core";
import { PreviewComponentProps } from "components/RelationshipPreviewModal/RelationshipPreviewModal";
import fetch from "../../../../core/api/fetch";
import useSWR from "swr";
import { sortByString } from "utils/string";
import {
  ObeyaResponse,
  ObeyaDummyContext,
} from "views/Governance/views/GovernanceObeya/hooks/useObeya";
import {
  OKRKeyResult,
  OKRObjective,
  ratingConfig,
} from "views/Governance/views/GovernanceObeya/utils";
import {
  Assumptions,
  SettingsData,
} from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/PredictiveAnalysis/types";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@material-ui/lab";
import {
  Title,
  DividerLine,
} from "../../../../views/NorthStar/views/components/StrategicDriverDetail/components/StrategyTitle/StrategyTitle";
import { CircularProgress } from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Highlights/CircularProgress";
import {
  RatingSeries,
  defaultRatingSeriesValues,
  getRatingSeriesAndKeyResultsCount,
} from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Highlights";
import _ from "lodash";
import { HighlightsProgressCard } from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Highlights/HighlightsProgressCard";
import { OptionsTypes } from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Dependencies/components/GroupedOptions/GroupedOptions";
import Burndown from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Burndown";
import isEmptyBurndownChart from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/Burndown/utils/isEmptyBurndownChart";
import ZeroState from "components/ZeroState";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
// import { useHistory } from "react-router-dom";
import { useInitiatives } from "views/LeanPortfolio/hooks/useInitiatives";
import { formatDate } from "utils/dateTime";
import { getTimezone } from "utils/utils";

const fetchObeya = (url: string) => {
  return fetch.get(`${url}`).then((result) => result.data || undefined);
};
const getKeyResultSeries = (keyResults: OKRKeyResult[]) => {
  return keyResults.reduce(
    (
      acc: { ratingSeries: RatingSeries; keyResultsCount: number; },
      okr: OKRKeyResult
    ) => {
      const { ratingId } = okr;
      if (ratingId && !acc.ratingSeries?.[ratingId]?.values?.length) {
        acc.ratingSeries[ratingId].values = [1];
      } else if (ratingId && acc.ratingSeries?.[ratingId]?.values?.length) {
        acc.ratingSeries[ratingId].values = [
          acc.ratingSeries[ratingId].values[0] + 1,
        ];
      } else if (
        ratingId &&
        acc.ratingSeries?.[ratingId]?.values.length === 0
      ) {
        acc.ratingSeries[ratingId].values = [0];
      }
      acc.keyResultsCount = acc?.keyResultsCount + 1;
      return acc;
    },
    {
      ratingSeries: {
        "1": {
          ...ratingConfig["1"],
          backgroundColor: ratingConfig["1"].color,
          values: [0],
        },
        "2": {
          values: [0],
          ...ratingConfig["2"],
          backgroundColor: ratingConfig["2"].color,
        },
        "3": {
          values: [0],
          ...ratingConfig["3"],
          backgroundColor: ratingConfig["3"].color,
        },
        "4": {
          values: [0],
          ...ratingConfig["4"],
          backgroundColor: ratingConfig["4"].color,
        },
      },
      keyResultsCount: 0,
    }
  );
};
const ObeyaRoomPreview = (props: PreviewComponentProps) => {
  const { data: response, isValidating } = useSWR(
    `/obeya?obeyaRoomId=${props.entityId}&timezone=${getTimezone()
    }`,
    fetchObeya,
    { revalidateOnFocus: false }
  );
  // const history = useHistory();
  const { obeyaRoomData } = useInitiatives();
  const [obeyaData, setObeyaData] = useState<ObeyaResponse>();

  useEffect(() => {
    if (response) {
      const data: ObeyaResponse = {
        objectives: [],
        highlights: [],
        individualContributors: [],
        progressBoards: [],
        scopeBoards: [],
        roadmapResult: {
          roadmap: []
        },
        dependencies: [],
        risks: [],
        predictiveAnalysis: {
          deliveryDateAnalysis: {
            "50Percentile": "",
            "85Percentile": "",
            "98Percentile": "",
            desiredDeliveryDate: "",
            desiredDeliveryDateConfidenceLevelPercentage: 0,
            histogramData: [],
          },
          throughputAnalysis: {
            "50Percentile": 0,
            "85Percentile": 0,
            "98Percentile": 0,
            obeyaRemainingItem: 0,
            obeyaRemainingItemConfidenceLevelPercentage: 0,
            histogramData: [],
          },
          simulationSummary: {
            adjustedRemainingWork: 0,
            averageWeeklyDeliveryRate: 0,
            originalRemainingWorkItemsByLevel: {
              portfolio: 0,
              team: 0,
              individualContributor: 0,
            },
            adjustedRemainingWorkItemsByLevel: {
              portfolio: 0,
              team: 0,
              individualContributor: 0,
            },
            deliveryRateByContext: {},
            simulationCount: 0,
          },
          simulationAdditionalInfo: {
            dateRangeValue: "",
            duration: 0,
            dataSetSize: "",
            throughputDays: 0,
          },
          assumptions: {
            teamPerformance: "",
            workItemLevel: "",
            workExpansion: "",
            fullFocus: "",
            precision: "",
          } as Assumptions,
        },
        forecastingSettings: {
          contextCapacity: [],
          teamPerformancePercentage: 100,
          forecastPortfolio: false,
          forecastTeam: false,
          forecastIndividualContributor: false,
          predictiveAnalysisPrecision: "day",
        } as SettingsData,
        burnData: {
          burndown: {
            dates: [],
            remainingWork: [],
            dailyTargets: [],
          },
          burnup: {
            dates: [],
            accomplishedWork: [],
            dailyTargets: [],
            scope: [],
          },
        },
        flowMetrics: {
          contexts: [] as ObeyaDummyContext[],
          syncChanges: "",
          lowerBoundaryDate: "",
          upperBoundaryDate: "",
        },
        focus: [],
        obeyaRoom: {
          path: '',
          displayName: '',
          roomId: '',
          roomName: ''
        }
      };
      if (
        typeof response.objectives === "object" &&
        response.objectives.error
      ) {
        const error: { error: true; message: string; obeyaRoomId?: string; } =
          response.objectives;
        console.error(
          `Server failed to retrieve objective list for obeya room of id '${error.obeyaRoomId}'': ${error.message}`
        );
        data.objectives = [];
      } else if (response && response.OKRs) {
        // get data from /obeya/objectives resource
        data.objectives = sortByString(response.OKRs || [], "createdAt");
      } else {
        data.objectives = sortByString(response.objectives || [], "createdAt");
      }

      // Sort each key result inside each objective
      data.objectives.forEach(
        (objective: OKRObjective) =>
        (objective.keyResults = sortByString(
          objective.keyResults ?? [],
          "createdAt"
        ))
      );

      data.highlights = response.highlights;
      data.individualContributors = response.individualContributors;
      data.progressBoards = response.progressBoards;
      data.scopeBoards = response.scopeBoards;
      data.roadmapResult = response.roadmapResult;
      data.dependencies = response.dependencies;
      data.risks = response.risks;
      data.burnData = response.burnData;
      data.predictiveAnalysis = response.predictiveAnalysis;
      data.forecastingSettings = response.forecastingSettings;
      data.flowMetrics = response.flowMetrics;
      setObeyaData(data);
    }
  }, [response]);

  let keyResults: OKRKeyResult[] = [];
  if (obeyaData) {
    keyResults = _.flatten(obeyaData.objectives.map((x) => x.keyResults || []));
  }
  const krRatingSeries = getKeyResultSeries(keyResults);
  const ratingSeries = getRatingSeriesAndKeyResultsCount(obeyaData?.objectives);

  const activeRoom = useMemo(() => {
    let roomId = props.entityId || (obeyaRoomData && obeyaRoomData[0]?.roomId);

    let activeRoom = obeyaRoomData?.find(
      (obeyaRoom) => obeyaRoom.roomId === roomId || obeyaRoom.path === roomId
    );

    if (!activeRoom && obeyaRoomData && obeyaRoomData.length) {
      activeRoom = obeyaRoomData[0];

      if (roomId !== activeRoom.roomId) {
        roomId = activeRoom.roomId;
      }
    }

    return activeRoom;
  }, [props.entityId, obeyaRoomData]);

  const { completed, inProgress, proposed } = useMemo(() => {
    if (obeyaData) {
      return obeyaData?.highlights.reduce(
        (acc, item) => {
          acc.completed = acc.completed + item.completed;
          acc.inProgress = acc.inProgress + item.inProgress;
          acc.proposed = acc.proposed + item.proposed;
          return acc;
        },
        { completed: 0, inProgress: 0, proposed: 0 }
      );
    }
    return { completed: 0, inProgress: 0, proposed: 0 };
  }, [obeyaData]);

  let riskExposureDays, riskExposureAmount;
  if (obeyaData) {
    riskExposureDays = obeyaData.risks.reduce(
      (acc, risk) => acc + parseInt(risk.riskExposureDays.toString()),
      0
    );
    riskExposureAmount = obeyaData.risks.reduce(
      (acc, risk) => acc + parseInt(risk.riskExposureAmount.toString()),
      0
    );
  }

  const navigateToPage = () => {
    // history.push(`/vmo/initiative?roomId=${props.entityId}`);

    // Use window.open to open the page in a new tab
    const newTab = window.open("", "_blank");

    // Check if the newTab object is defined
    if (newTab) {
      newTab.location.href = `/vmo/initiative?roomId=${props.entityId}`;
    } else {
      console.log("Pop-up blocked. Please allow pop-ups for this site.");
    }
  };

  return (
    <>
      <Box style={{ cursor: "pointer", display: "flex", alignContent: "center" }} onClick={navigateToPage}>
        Go to page
        <OpenInNewIcon />
      </Box>
      <Box style={{ paddingTop: 20 }}>
        {isValidating ? (
          <Skeleton height={400} variant="rect" />
        ) : obeyaData ? (
          <>
            <Title>{props.entityName}</Title>
            <DividerLine style={{ marginBottom: 20 }} />
            <Box
              style={{
                backgroundColor: "#FEFEFE",
                padding: 30,
                borderRadius: 16,
              }}
            >
              <Box style={{ display: "flex" }}>
                <Grid
                  item
                  xs={6}
                  style={{
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "space-between",
                    border: "1px solid #F0F0F0",
                  }}
                >
                  <CircularProgress
                    series={
                      ratingSeries
                        ? Object.values(ratingSeries.ratingSeries)
                        : defaultRatingSeriesValues
                    }
                    countItems={Number(obeyaData?.objectives.length)}
                  >
                    <></>
                  </CircularProgress>
                  <Divider orientation="vertical" />
                  <CircularProgress
                    series={
                      krRatingSeries
                        ? Object.values(krRatingSeries.ratingSeries)
                        : defaultRatingSeriesValues
                    }
                    countItems={Number(krRatingSeries.keyResultsCount)}
                    label="Key Result"
                  >
                    <></>
                  </CircularProgress>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    overflow: "hidden",
                    border: "1px solid #F0F0F0",
                    marginLeft: 20,
                    padding: 16,
                  }}
                >
                  {activeRoom && (
                    <HighlightsProgressCard
                      progressValues={{ completed, inProgress, proposed }}
                      completedCount={completed}
                      remainingCount={proposed}
                      activeRoom={activeRoom}
                    />
                  )}
                </Grid>
              </Box>
              <Box style={{ display: "flex", marginTop: 20 }}>
                <Grid
                  item
                  xs={3}
                  style={{
                    overflow: "hidden",
                    border: "1px solid #F0F0F0",
                    padding: 16,
                  }}
                >
                  <Typography
                    style={{
                      color: "#2B353B",
                      fontSize: 14,
                      fontWeight: 400,
                      marginBottom: 10,
                    }}
                  >
                    Scope
                  </Typography>
                  <Typography
                    style={{ color: "#2B353B", fontSize: 14, fontWeight: 600 }}
                  >
                    Total items {completed + inProgress + proposed}{" "}
                  </Typography>
                  <Divider style={{ margin: 5 }} />
                  <Typography
                    style={{
                      color: "#2B353B",
                      fontSize: 12,
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Not started {proposed}
                  </Typography>
                  <Typography
                    style={{
                      color: "#2B353B",
                      fontSize: 12,
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    In progress {inProgress}
                  </Typography>
                  <Typography
                    style={{
                      color: "#2B353B",
                      fontSize: 12,
                      fontWeight: 400,
                      lineHeight: "24px",
                    }}
                  >
                    Completed {completed}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    overflow: "hidden",
                    border: "1px solid #F0F0F0",
                    marginLeft: 20,
                    padding: 16,
                  }}
                >
                  <Typography
                    style={{
                      color: "#2B353B",
                      fontSize: 14,
                      fontWeight: 400,
                      marginBottom: 10,
                    }}
                  >
                    Predictive Analysis
                  </Typography>
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      style={{
                        color: "#2B353B",
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Desired Delivery Date
                    </Typography>
                    <Typography
                      style={{
                        color: "#2B353B",
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      {obeyaData &&
                        obeyaData.predictiveAnalysis &&
                        obeyaData.predictiveAnalysis.deliveryDateAnalysis &&
                        obeyaData.predictiveAnalysis.deliveryDateAnalysis
                          .desiredDeliveryDate &&
                        formatDate(
                          obeyaData.predictiveAnalysis.deliveryDateAnalysis
                            .desiredDeliveryDate
                        )}
                    </Typography>
                  </Box>
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      style={{
                        color: "#2B353B",
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Confidence Level
                    </Typography>
                    <Typography
                      style={{
                        color: "#2B353B",
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      {
                        obeyaData.predictiveAnalysis.deliveryDateAnalysis
                          .desiredDeliveryDateConfidenceLevelPercentage
                      }
                    </Typography>
                  </Box>
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      style={{
                        color: "#2B353B",
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Estimated Delivery Date
                    </Typography>
                    <Typography
                      style={{
                        color: "#2B353B",
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      {obeyaData &&
                        obeyaData.predictiveAnalysis &&
                        obeyaData.predictiveAnalysis.deliveryDateAnalysis &&
                        obeyaData.predictiveAnalysis.deliveryDateAnalysis[
                        "85Percentile"
                        ] &&
                        formatDate(
                          obeyaData.predictiveAnalysis.deliveryDateAnalysis[
                          "85Percentile"
                          ]
                        )}
                    </Typography>
                  </Box>
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      style={{
                        color: "#2B353B",
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      Confidence Level
                    </Typography>
                    <Typography
                      style={{
                        color: "#2B353B",
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                    >
                      85%
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    overflow: "hidden",
                    border: "1px solid #F0F0F0",
                    padding: 16,
                    marginLeft: 20,
                  }}
                >
                  <Typography
                    style={{
                      color: "#2B353B",
                      fontSize: 14,
                      fontWeight: 400,
                      marginBottom: 10,
                    }}
                  >
                    Risk
                  </Typography>
                  <Typography
                    style={{ color: "#2B353B", fontSize: 14, fontWeight: 600 }}
                  >
                    {obeyaData.risks.length + obeyaData.risks.length > 1
                      ? "Risks"
                      : "Risk"}
                  </Typography>
                  <Divider style={{ margin: 5 }} />
                  {obeyaData.risks && (
                    <>
                      <Typography
                        style={{
                          color: "#2B353B",
                          fontSize: 12,
                          fontWeight: 600,
                          lineHeight: "24px",
                        }}
                      >
                        Risk exposure
                      </Typography>
                      <Typography
                        style={{
                          color: "#2B353B",
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        {riskExposureDays.toString()}{" "}
                        {riskExposureDays > 1 ? " days" : " day"}
                      </Typography>
                      <Typography
                        style={{
                          color: "#2B353B",
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        {"$" + riskExposureAmount}
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid
                  item
                  xs={3}
                  style={{
                    overflow: "hidden",
                    border: "1px solid #F0F0F0",
                    marginLeft: 20,
                    padding: 16,
                  }}
                >
                  <Typography
                    style={{
                      color: "#2B353B",
                      fontSize: 14,
                      fontWeight: 400,
                      marginBottom: 10,
                    }}
                  >
                    Dependency
                  </Typography>
                  <Typography
                    style={{ color: "#2B353B", fontSize: 14, fontWeight: 600 }}
                  >
                    {obeyaData.dependencies.length +
                      obeyaData.dependencies.length >
                      1
                      ? "Dependencies"
                      : "Dependency"}
                  </Typography>
                  <Divider style={{ margin: 5 }} />
                  {obeyaData.dependencies && (
                    <>
                      <Typography
                        style={{
                          color: "#2B353B",
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        High -{" "}
                        {
                          obeyaData.dependencies.filter(
                            (x) => x.severity === OptionsTypes.HIGH
                          ).length
                        }
                      </Typography>
                      <Typography
                        style={{
                          color: "#2B353B",
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Medium -{" "}
                        {
                          obeyaData.dependencies.filter(
                            (x) => x.severity === OptionsTypes.MEDIUM
                          ).length
                        }
                      </Typography>
                      <Typography
                        style={{
                          color: "#2B353B",
                          fontSize: 12,
                          fontWeight: 400,
                          lineHeight: "24px",
                        }}
                      >
                        Low -{" "}
                        {
                          obeyaData.dependencies.filter(
                            (x) => x.severity === OptionsTypes.LOW
                          ).length
                        }
                      </Typography>
                    </>
                  )}
                </Grid>
              </Box>
              <Box style={{ display: "flex", marginTop: 20 }}>
                <Grid
                  item
                  xs={12}
                  style={{
                    overflow: "hidden",
                    border: "1px solid #F0F0F0",
                    padding: 16,
                  }}
                >
                  <Typography
                    style={{
                      color: "#2B353B",
                      fontSize: 14,
                      fontWeight: 400,
                      marginBottom: 10,
                    }}
                  >
                    Burndown
                  </Typography>
                  {/* The function is named wrong */}
                  {!isEmptyBurndownChart(obeyaData.burnData.burndown) ? (
                    <ZeroState
                      message="No data available for the selected criteria"
                      minHeight={300}
                    />
                  ) : (
                    <Burndown
                      data={obeyaData.burnData.burndown || []}
                      loading={isValidating}
                      activeFilters={false}
                      customLabelX="Date"
                      customLabelY="Work Items Count"
                    />
                  )}
                </Grid>
              </Box>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default ObeyaRoomPreview;
