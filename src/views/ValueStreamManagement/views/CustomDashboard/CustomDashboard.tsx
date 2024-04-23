/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import WidgetsOutlinedIcon from "@material-ui/icons/WidgetsOutlined";
import WrapTextIcon from "@material-ui/icons/WrapText";
import { useFitnessCriteria } from "../DeliveryGovernance/hooks/useFitnessCriteria";
import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";

import { useCustomDashboardData } from "./useCustomDashboardData";
import useAuthentication from "hooks/useAuthentication";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import { v4 as uuidV4 } from "uuid";
import AddWidgetsModal from "./components/AddWidgetsModal";
import {
  WidgetGroupKeys,
  fitnessCriteriaQueryMapping,
  flowOfDemandsQueryMapping,
  renderWidgetComponent,
  sourcesOfDelayQueryMapping,
  widgetDimensions,
  widgetItems,
  workOverviewQueryMapping,
} from "./components/AddWidgetsModal/WidgetMetadata";
import { useSourceOfDelayAndWaste } from "../DeliveryGovernance/hooks/useSourceOfDelay";
import useNormalizationColors from "hooks/fetch/useNormalizationColors";
import { useNormalisationCharts } from "../DeliveryGovernance/hooks/useNormalisationCharts";
import { useNormalisationChartsOptions } from "../DeliveryGovernance/hooks/useNormalisationChartsOptions";
import {
  useGroups,
  useUnassignedGroups,
} from "views/Settings/components/UserManagement/GroupManagement";
import { useFlowOfDemandsDeliveryGovernance } from "../DeliveryGovernance/hooks/useFlowOfDemands";
import { useFlowOfDemandsContinuousImprovements } from "../ContinuousImprovements/hooks/useFlowOfDemandData";

const ResponsiveGridLayout = WidthProvider(Responsive);

const CustomDashboard = () => {
  const { isAdmin } = useAuthentication();
  const [fitnessCriteriaQuery, setFitnessCriteriaQuery] = useState<string>("");
  const [sourcesOfDelayQuery, setSourcesOfDelayQuery] = useState<string>("");
  const [workOverviewQuery, setWorkOverviewQuery] = useState<string>("");
  const [flowOfDemandsQuery, setFlowOfDemandsQuery] = useState<string>("");

  const [layout, setLayout] = useState<GridLayout.Layout[]>([]);
  // const [groups, setGroups] = useState<GridLayout.Layout[]>([]);
  const [dashboardTitle, setDashboardTitle] = useState("My Dashboard");
  const [userGroup, setUserGroup] = useState<any>("");

  const [open, setOpen] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string[]>([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [temporaryTitle, setTemporaryTitle] = useState("");

  const { apiQueryParameters, appliedFilters } = useFilterPanelContext();
  const { user } = useAuthentication();
  const {
    data: fitnessCriteriaData,
    isLoading: isLoadingFitnessCriteria,
  } = useFitnessCriteria(
    apiQueryParameters,
    fitnessCriteriaQuery === "",
    fitnessCriteriaQuery
  );

  const {
    data: sourcesOfDelayData,
    isLoading: isLoadingSourcesData,
  } = useSourceOfDelayAndWaste(sourcesOfDelayQuery === "", sourcesOfDelayQuery);

  const {
    data: flowOfDemandsData,
    isLoading: isFlowOfDemandsLoading,
    isEmptyData: isEmpty,
  } = useFlowOfDemandsDeliveryGovernance(
    flowOfDemandsQuery === "",
    flowOfDemandsQuery
  );
  const {
    data: flowOfDemandsHistoricalData,
    isLoading: flowOfDemandsHistoricalLoading,
  } = useFlowOfDemandsContinuousImprovements(
    flowOfDemandsQuery === "",
    flowOfDemandsQuery
  );
  const { safeAggregation: currentDataAggregation } = useFilterPanelContext();
  const isLoadingFlowOfDemands =
    isFlowOfDemandsLoading || flowOfDemandsHistoricalLoading;
  const isEmptyData = !isLoadingFlowOfDemands && isEmpty;

  const [normalisationChartTag, setNormalisationChartTag] = useState("demand");

  const {
    data: normalisationChartsData,
    isLoading: isLoadingNormalisationCharts,
    error: normalisationChartsError,
    isEmptyData: normalisationChartsEmpty,
  } = useNormalisationCharts(
    apiQueryParameters,
    normalisationChartTag,
    workOverviewQuery === "",
    workOverviewQuery
  );

  const {
    data: normalisationChartsOptions,
    isLoading: isLoadingNormalisationChartsOptions,
    error: normalisationChartsOptionsError,
  } = useNormalisationChartsOptions(
    apiQueryParameters,
    workOverviewQuery === ""
  );

  const {
    data: dashboardData,
    isLoading,
    mutate,
    addDashboardData,
    updateDashboardData,
  } = useCustomDashboardData(
    user?.sub ?? "",
    apiQueryParameters.dashboardId ?? ""
  );

  const { data: groups } = useGroups();
  const { data: unassignedGroups } = useUnassignedGroups();

  useEffect(() => {
    setupData();
  }, [isLoading]);

  useEffect(() => {
    if (dashboardData && groups?.data?.groups) {
      const selectedGroup = groups.data.groups.find(
        (group) => group.id === dashboardData.userGroupId
      );
      setUserGroup(selectedGroup ?? "");
    }
  }, [dashboardData, groups]);

  const setupData = (updatedData?: any) => {
    const data = updatedData || dashboardData;
    const fitnessCriteriaQuerySet = new Set();
    const sourcesOfDelayQuerySet = new Set();
    const workOverviewQuerySet = new Set();
    const flowOfDemandsQuerySet = new Set();

    if (data && data.dashboardLayout) {
      setLayout(data.dashboardLayout.layout);
      setDashboardTitle(data.dashboardTitle);

      data.dashboardLayout.layout.forEach((item) => {
        const widgetId = item.i;

        if (fitnessCriteriaQueryMapping[widgetId]) {
          const widgetQueries = fitnessCriteriaQueryMapping[widgetId];
          widgetQueries.forEach((query) => {
            fitnessCriteriaQuerySet.add(query);
          });
        }

        if (sourcesOfDelayQueryMapping[widgetId]) {
          const sourceOfDelayQueries = sourcesOfDelayQueryMapping[widgetId];
          sourceOfDelayQueries.forEach((query) => {
            sourcesOfDelayQuerySet.add(query);
          });
        }

        if (workOverviewQueryMapping[widgetId]) {
          const workOverviewQueries = workOverviewQueryMapping[widgetId];
          workOverviewQueries.forEach((query) => {
            workOverviewQuerySet.add(query);
          });
        }

        if (flowOfDemandsQueryMapping[widgetId]) {
          const flowOfDemandsQueries = flowOfDemandsQueryMapping[widgetId];
          flowOfDemandsQueries.forEach((query) => {
            flowOfDemandsQuerySet.add(query);
          });
        }
      });

      const fitnessCriteriaQueries = Array.from(fitnessCriteriaQuerySet).join(
        ","
      );
      const sourcesOfDelayQueries = Array.from(sourcesOfDelayQuerySet).join(
        ","
      );
      const workOverviewQueries = Array.from(workOverviewQuerySet).join(",");
      const flowOfDemandQueries = Array.from(flowOfDemandsQuerySet).join(",");

      setFitnessCriteriaQuery(fitnessCriteriaQueries);
      setSourcesOfDelayQuery(sourcesOfDelayQueries);
      setWorkOverviewQuery(workOverviewQueries);
      setFlowOfDemandsQuery(flowOfDemandQueries);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const newWidgets = selectedWidget
      .filter((widget) => !layout.some((item) => item.i === widget))
      .map((widget, index) => {
        let dims: any = widgetDimensions.find((x) => x.id === widget);
        dims = dims ? dims.dimensions : { w: 3, minW: 3, h: 2, minH: 2 };
        return {
          i: widget,
          x: index * 3,
          y: 0,
          ...dims,
        };
      });

    const updatedLayout = layout.filter((item) =>
      selectedWidget.includes(item.i)
    );

    setLayout([...updatedLayout, ...newWidgets]);
    saveOrUpdateDashboardData(
      [...updatedLayout, ...newWidgets],
      dashboardTitle
    );
  };

  const hasWidgets = layout.length > 0;

  const handleEditClick = () => {
    setIsEditTitle(true);
  };

  const handleSaveTitle = () => {
    setIsEditTitle(false);
    setTemporaryTitle(dashboardTitle);
    saveOrUpdateDashboardData(layout, dashboardTitle);
  };

  const handleCloseEdit = () => {
    setDashboardTitle(temporaryTitle);
    setIsEditTitle(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDashboardTitle(e.target.value);
  };

  const handleEditModeToggle = () => {
    if (isEditMode) {
      handleCloseEdit();
    } else {
      setTemporaryTitle(dashboardTitle);
    }
    setIsEditMode((prevEditMode) => !prevEditMode);
  };

  const saveOrUpdateDashboardData = (
    layout: any,
    title: string,
    userGroupId?: string
  ) => {
    const data = {
      dashboardId:
        dashboardData && dashboardData.dashboardId
          ? dashboardData.dashboardId
          : uuidV4(),
      dashboardLayout: { layout },
      // dashboardGroups: JSON.parse(groupDataJson),
      dashboardTitle: title,
      userId: user?.sub,
      userGroupId,
    };
    mutate({ data }, false);
    setupData(data);
    if (dashboardData && dashboardData.dashboardId) {
      updateDashboardData(data);
    } else {
      addDashboardData(data);
    }
  };

  const widgetGroupDataMapping = {
    [WidgetGroupKeys.FITNESS_CRITERIA]: {
      data: fitnessCriteriaData,
      isLoading: isLoadingFitnessCriteria,
    },
    [WidgetGroupKeys.SOURCE_OF_DELAY]: {
      data: sourcesOfDelayData,
      isLoading: isLoadingSourcesData,
    },
    [WidgetGroupKeys.FLOW_ITEMS]: {
      data: [],
      isLoading: false,
    },
    [WidgetGroupKeys.RUN_CHART]: {
      data: [],
      isLoading: false,
    },
    [WidgetGroupKeys.WORK_OVERVIEW]: {
      data: {
        normalisationChartsData: normalisationChartsData,
        normalisationChartsError: normalisationChartsError,
        normalisationChartsEmpty: normalisationChartsEmpty,
        normalisationChartsOptions: normalisationChartsOptions,
        normalisationChartsOptionsError: normalisationChartsOptionsError,
        normalisationChartTag,
        setNormalisationChartTag,
      },
      isLoading:
        isLoadingNormalisationCharts || isLoadingNormalisationChartsOptions,
    },
    [WidgetGroupKeys.PERFORMANCE_COMPARISON_TIME]: {
      data: [],
      isLoading: false,
      apiQueryParameters,
      additionalProps: {
        errorMessages: [],
        seriesOrder: [],
      },
    },
    [WidgetGroupKeys.PERFORMANCE_COMPARISON_BOARDS]: {
      data: [],
      isLoading: false,
      apiQueryParameters,
      additionalProps: {
        errorMessages: [],
        seriesOrder: [],
      },
    },
    [WidgetGroupKeys.FLOW_OF_DEMANDS]: {
      data: flowOfDemandsData,
      isLoading: isLoadingFlowOfDemands,
    },
    [WidgetGroupKeys.SMART_BOARD]: {
      data: [],
      isLoading: false,
      appliedFilters,
      apiQueryParameters,
    },
  };

  const additionalProps = {
    [WidgetGroupKeys.FLOW_OF_DEMANDS]: {
      historicalData: flowOfDemandsHistoricalData,
      isEmptyData,
      currentDataAggregation,
      widgetInformation: flowOfDemandsData?.widgetInformation,
    },
    [WidgetGroupKeys.SMART_BOARD]: {
      disableExpand: true,
    },
  };
  const handleAutoPosition = () => {
    autoPositionWidgets();
  };

  const autoPositionWidgets = () => {
    const maxWidthPerRow = 12;
    let currentX = 0;
    let currentY = 0;
    let totalWidthInRow = 0;

    const newLayout = layout.map((item, index) => {
      const newItem = { ...item };

      // Check if adding the current widget would exceed the maximum width per row
      if (totalWidthInRow + newItem.w > maxWidthPerRow) {
        // Move to the next row
        currentX = 0;
        currentY += 1;
        totalWidthInRow = 0; // Reset total width for the new row
      }

      // Calculate the new x and y coordinates
      newItem.x = currentX;
      newItem.y = currentY;

      // Update the total width in the row
      totalWidthInRow += newItem.w;

      // Update currentX for the next widget
      currentX += newItem.w;

      return newItem;
    });

    setLayout(newLayout);
  };

  return (
    <Grid container>
      {isLoading ? (
        <Box display="flex" alignContent={"center"} width={"100%"}>
          <Skeleton variant="rect" height={400} width={400} />
          <Skeleton variant="rect" height={400} width={400} />
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          width={"100%"}
          height={"100%"}
        >
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="row" alignItems="center">
              {isEditTitle ? (
                <TextField
                  style={{
                    width: 380,
                    marginRight: 10,
                    fontFamily: "Open Sans",
                    color: "#323130",
                  }}
                  placeholder="My Dashboard"
                  variant="outlined"
                  size="small"
                  value={dashboardTitle}
                  onChange={handleTitleChange}
                />
              ) : (
                <Typography
                  variant="h6"
                  style={{
                    color: "#323130",
                    marginRight: 5,
                    fontFamily: "Open Sans",
                  }}
                >
                  {dashboardTitle}
                </Typography>
              )}

              {isEditTitle ? (
                <Box display="flex" flexDirection="row">
                  <IconButton
                    color="primary"
                    size="small"
                    aria-label="close"
                    onClick={handleCloseEdit}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    color="primary"
                    size="small"
                    aria-label="save"
                    onClick={handleSaveTitle}
                  >
                    <CheckIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                isEditMode && (
                  <IconButton
                    color="primary"
                    size="small"
                    aria-label="edit"
                    onClick={handleEditClick}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                )
              )}

              {isAdmin && unassignedGroups && isEditMode ? (
                <>
                  <Typography
                    variant="h6"
                    style={{
                      color: "#323130",
                      fontFamily: "Open Sans",
                      margin: "0px 20px 0px 10px",
                      fontWeight: "bold",
                    }}
                  >
                    for
                  </Typography>
                  <Autocomplete
                    options={unassignedGroups ?? []}
                    getOptionLabel={(option: any) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select a group"
                        variant="outlined"
                      />
                    )}
                    size="small"
                    onChange={(_, value) => {
                      setUserGroup(value);
                      saveOrUpdateDashboardData(
                        layout,
                        dashboardTitle,
                        value?.id ?? ""
                      );
                    }}
                    value={userGroup}
                  />
                </>
              ) : (
                <Typography
                  variant="h6"
                  style={{
                    color: "#323130",
                    fontFamily: "Open Sans",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {userGroup?.name && (
                    <>
                      <Typography
                        variant="h6"
                        style={{
                          color: "#323130",
                          fontFamily: "Open Sans",
                          margin: "0px 20px 0px 10px",
                          fontWeight: "bold",
                        }}
                      >
                        for
                      </Typography>
                      {userGroup?.name}
                    </>
                  )}
                </Typography>
              )}
            </Box>

            <Box>
              <Tooltip title="Add a widget">
                <IconButton
                  color="primary"
                  size="small"
                  aria-label="add-widget"
                  onClick={handleOpen}
                >
                  <WidgetsOutlinedIcon />
                </IconButton>
              </Tooltip>
              &nbsp;
              <Tooltip title="Arrange widgets automatically">
                <IconButton
                  color="primary"
                  size="small"
                  aria-label="auto-position-widgets"
                  onClick={handleAutoPosition}
                >
                  <WrapTextIcon />
                </IconButton>
              </Tooltip>
              &nbsp;&nbsp;
              <FormControlLabel
                control={
                  <Switch
                    checked={isEditMode}
                    onChange={handleEditModeToggle}
                    name="editModeToggle"
                    color="primary"
                    size="small"
                  />
                }
                label="Edit Mode"
                style={{ marginLeft: 1 }}
              />
            </Box>
          </Box>

          {!hasWidgets && (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "50vh",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  color: "#B0B0B0",
                  fontFamily: "Open Sans",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Click &nbsp;{" "}
                <WidgetsOutlinedIcon style={{ marginBottom: -3 }} />
                &nbsp; to start customizing your dashboard
              </Typography>
            </div>
          )}

          <AddWidgetsModal
            handleSave={handleSave}
            open={open}
            handleClose={handleClose}
            selectedWidget={selectedWidget}
            setSelectedWidget={setSelectedWidget}
            savedDashboardData={dashboardData}
          />

          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            // preventCollision
            margin={20}
            isResizable={isEditMode}
            draggableCancel=".disable-drag"
            onDragStop={(layout, oldItem, newItem) => {
              const updatedLayout = layout.map((item) => {
                if (item.i === newItem.i) {
                  return { ...item, x: newItem.x, y: newItem.y };
                }
                return item;
              });
              setLayout(updatedLayout);
              saveOrUpdateDashboardData(updatedLayout, dashboardTitle);
            }}
            onResize={(layout, oldItem, newItem) => {
              const updatedLayout = layout.map((item) => {
                if (item.i === newItem.i) {
                  return { ...item, w: newItem.w, h: newItem.h };
                }
                return item;
              });

              setLayout(updatedLayout);
              saveOrUpdateDashboardData(updatedLayout, dashboardTitle);
            }}
          >
            {layout.map((item) => (
              <div
                key={item.i}
                className={isEditMode ? "widget-handle" : "disable-drag"}
              >
                {widgetItems.map((widgetGroup) =>
                  widgetGroup.widgets.map((widget) => {
                    const widgetGroupData =
                      widgetGroupDataMapping[widgetGroup.id];

                    return widgetGroupData && item.i === widget.id ? (
                      <div key={item.i}>
                        {renderWidgetComponent(widget, {
                          isDashboardEdit: isEditMode,
                          data: widgetGroupData.data,
                          isLoading: widgetGroupData.isLoading,
                          apiQueryParameters,
                          ...additionalProps[widgetGroup.id],
                        })}
                      </div>
                    ) : null;
                  })
                )}
              </div>
            ))}
          </ResponsiveGridLayout>
        </Box>
      )}
    </Grid>
  );
};

export default CustomDashboard;
