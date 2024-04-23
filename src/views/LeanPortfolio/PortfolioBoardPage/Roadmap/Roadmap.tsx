/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useRef, useState } from "react";

// This component is licensed. For licensing information, visit bryntum/gantt-react.
// import { BryntumGantt } from "@bryntum/gantt-react";
// import { ProjectModel } from "@bryntum/gantt";

import { Box } from "@material-ui/core";

import { useSnackbar } from "notistack";
import RoadmapToolbar from "./components/RoadmapToolbar/RoadmapToolbar";
import { ganttConfig, portfolioRoadmapColumns } from "./config/ganttConfig";
import { ResetButton, SaveButton } from "./styles";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import { usePortfolioBoardPageContext } from "../../contexts/PortfolioBoardPageContext";
import { useInitiatives } from "../../hooks/useInitiatives";
import useAuthentication from "hooks/useAuthentication";

const Roadmap = () => {
  const {
    showChildren,
    obeyaRoomData,
    contextId,
    childContexts,
    selectedContexts,
  } = usePortfolioBoardPageContext();

  // const ganttRef = useRef<BryntumGantt>(null);
  const ganttRef = useRef<any>(null);
  const isSubmittingRef = useRef(false);
  const [saving, setIsSaving] = useState(false);
  const [updatedData, setUpdatedData] = useState<any>([]);

  const { updateRoadmap } = useInitiatives();
  const { enqueueSnackbar } = useSnackbar();
  const { isAdminOrPowerUser } = useAuthentication();

  const obeyaRooms = useMemo(() => {
    const filteredRooms = Object.values(obeyaRoomData).filter((room: any) => {
      if (selectedContexts.length === 0) {
        return !room.isArchived;
      }
      const [level1, level2, level3] = selectedContexts;
      if (level1 === "" && level2 === "" && level3 === "") {
        return showChildren ? true : room.contextId === contextId;
      } else if (level1 && !level2 && !level3) {
        return (
          room.contextId === level1 ||
          (showChildren && childContexts.includes(room.contextId))
        );
      } else if (level1 && level2 && !level3) {
        return (
          room.contextId === level2 ||
          (showChildren && childContexts.includes(room.contextId))
        );
      } else if (level1 && level2 && level3) {
        return room.contextId === level3;
      }
      return false;
    });

    return filteredRooms.filter((room: any) => !room.isArchived);
  }, [obeyaRoomData, selectedContexts, showChildren]);

  const mappedObeya = obeyaRooms.map((obj: any) => {
    return {
      id: obj.roomId,
      name: obj.roomName,
      percentDone: 0,
      startDate: obj.beginDate,
      endDate: obj.endDate,
      baselines: obj.baselines,
      dependencies: obj.dependencies,
      expanded: false,
      manuallyScheduled: true,
      children: [],
    };
  });

  const onSubmit = async () => {
    if (isSubmittingRef.current) return;

    const updatedTask: any = ganttRef.current?.instance.taskStore.getRange();
    if (!updatedTask) return;

    setIsSaving(true);
    isSubmittingRef.current = true;

    const updatedData = updatedTask.map(
      ({ id, startDate, endDate, baselines, dependencies }) => ({
        roomId: id,
        beginDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        baselines,
        dependencies,
      })
    );

    try {
      setUpdatedData(updatedTask);

      await updateRoadmap(updatedData).then(() => {
        enqueueSnackbar(`Initiative has been updated.`, {
          variant: "success",
          persist: false,
        });
      });

      isSubmittingRef.current = false;
      setIsSaving(false);
    } catch (e) {
      console.log("error", e);
      isSubmittingRef.current = false;
      setUpdatedData([]);
    }
  };

  const extractDependencies = (tasks) => {
    const dependencies: any = [];

    tasks.forEach((task) => {
      if (task.dependencies && task.dependencies.length > 0) {
        task.dependencies.forEach((dependency) => {
          dependencies.push({
            fromEvent: dependency.fromEvent,
            toEvent: dependency.toEvent,
            type: dependency.type,
          });
        });
      }

      if (task.children && task.children.length > 0) {
        const childDependencies = extractDependencies(task.children);
        dependencies.push(...childDependencies);
      }
    });

    return dependencies;
  };

  const onResetRoadmap = () => {
    setUpdatedData(mappedObeya);
  };

  const dependencies = extractDependencies(mappedObeya);

  // const project = new ProjectModel({
  //   taskStore: {
  //     data: updatedData.length > 0 ? updatedData : mappedObeya,
  //   },
  //   dependencyStore: {
  //     data: dependencies,
  //   },
  // });
  const project: any = ({
    taskStore: {
      data: updatedData.length > 0 ? updatedData : mappedObeya,
    },
    dependencyStore: {
      data: dependencies,
    },
  });

  const config = useMemo(() => {
    return {
      ...ganttConfig,
      readOnly: !isAdminOrPowerUser,
      project,
    };
  }, [project]);

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <DashboardCard title="" size={ChartSizes.full} fullScreen={true}>
        <Box display="flex" justifyContent="space-between">
          <RoadmapToolbar
            source="portfolio"
            hideViewBy={true}
            ganttRef={ganttRef}
            setViewSelection={() => console.log()}
            view={""}
          />
          {isAdminOrPowerUser && (
            <Box>
              <SaveButton
                variant="contained"
                onClick={onSubmit}
                disabled={saving}
                startIcon={
                  saving && (
                    <Spinner
                      isVisible={saving}
                      style={{ marginLeft: 30, marginBottom: 2 }}
                    />
                  )
                }
              >
                Save Changes
              </SaveButton>
              &nbsp;
              <ResetButton variant="contained" onClick={() => onResetRoadmap()}>
                Reset
              </ResetButton>
            </Box>
          )}
        </Box>
        {/* <BryntumGantt
          {...config}
          columns={portfolioRoadmapColumns}
          ref={ganttRef}
          viewPreset="year"
          projectLinesFeature={false}
          progressLineFeature={false}
        /> */}
      </DashboardCard>
    </Box>
  );
};

export default Roadmap;
