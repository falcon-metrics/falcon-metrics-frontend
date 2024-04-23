/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useRef, useState } from "react";

/* This component is licensed. For licensing information, visit bryntum/gantt-react.
  * import { BryntumGantt } from "@bryntum/gantt-react";
  * import { LocaleManager } from "@bryntum/gantt";
*/

import { Box, Typography } from "@material-ui/core";
import ViewSelector from "./components/ViewSelector";

import { useSnackbar } from "notistack";
import { useInitiatives } from "views/LeanPortfolio/hooks/useInitiatives";

import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import "./styles.css";
import Legends from "./components/Legends";
import DashboardCard from "components/Charts/components/DashboardCard/DashboardCard";
import { ChartSizes } from "components/Charts/components/DashboardCard/interfaces/ChartSizes";
import { createGanttConfig } from "./utils/createGanttConfig";
import SkeletonLoader from "views/LeanPortfolio/PortfolioBoardPage/Roadmap/components/SkeletonLoader";
import { SaveButton } from "views/LeanPortfolio/PortfolioBoardPage/Roadmap/styles";
import RoadmapToolbar from "views/LeanPortfolio/PortfolioBoardPage/Roadmap/components/RoadmapToolbar";
import { obeyaRoadmapColumns } from "views/LeanPortfolio/PortfolioBoardPage/Roadmap/config/ganttConfig";
import useAuthentication from "hooks/useAuthentication";

interface Props {
  obeyaRoomId?: string;
  obeyaObjectives: any;
  roadmapResult: any;
  initiativeStart: string | undefined;
  initiativeEnd: string | undefined;
}

const Roadmap = ({
  obeyaObjectives,
  roadmapResult,
  initiativeStart,
  initiativeEnd,
}: Props) => {
  // const ganttRef = useRef<BryntumGantt>(null);
  const ganttRef = useRef<any>(null);

  const [viewSelection, setViewSelection] = useState("Work breakdown");

  //  eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { isAdminOrPowerUser } = useAuthentication();

  const { updateObeyaRoadmap } = useInitiatives();
  const { enqueueSnackbar } = useSnackbar();

  const locale = {
    ProjectLines: {
      "Project Start": "Initiative start",
      "Project End": "Initiative end",
    },
  };

  // LocaleManager.applyLocale("En", locale);

  useEffect(() => {
    if (viewSelection === "" || !viewSelection)
      setViewSelection("Work breakdown");
  }, [viewSelection]);

  useEffect(() => {
    // Attach event listeners to the existing Gantt chart instance
    // This is to prevent edit of startDate when the dates are calculated
    const ganttInstance = ganttRef.current?.instance;
    if (ganttInstance) {
      ganttInstance.addListener("beforeTaskEdit", (event) => {
        const { taskRecord } = event;

        if (taskRecord.isCalculatedDate) {
          return false;
        }
      });

      ganttInstance.addListener("beforeTaskDrag", (event) => {
        const { taskRecord } = event;

        if (taskRecord.isCalculatedDate) {
          return false;
        }
      });

      // This will change the eventColor when end date is dragged/updated
      // Disabling for now because the eventColor reverts when switching between views
      // Figure that one first, then enable this again

      // ganttInstance.addListener('taskResizeEnd', (event) => {
      //   const { taskRecord } = event;

      //   taskRecord.eventColor = 'orange';
      //   if (taskRecord.isCalculatedDate) {
      //     return false;
      //   }
      // });
    }

    // Detach event listeners to ensure that no event listeners are still active when component unmounts or re-renders
    return () => {
      const ganttInstance = ganttRef.current?.instance;
      if (ganttInstance) {
        ganttInstance.removeAllListeners();
      }
    };
  }, [ganttRef]);

  const onSubmit = async () => {
    if (ganttRef.current?.instance) {
      setIsSaving(true);

      // Get updated tasks
      const updatedTasks = ganttRef.current?.instance.taskStore.changes;
      const payload = updatedTasks?.modified.map((item: any) => ({
        workItemId: item.id,
        beginDate: new Date(item.startDate).toISOString(),
        endDate: new Date(item.endDate).toISOString(),
        baselines: item.baselines,
        parentId: item.parentId,
        dependencies: item.dependencies,
        eventColor: item.eventColor, /// won't get stored
      }));

      try {
        await updateObeyaRoadmap(payload).then(() => {
          enqueueSnackbar(`Flow item has been updated.`, {
            variant: "success",
            persist: false,
          });
        });
      } catch (e) {
        console.log("error", e);
      } finally {
        setIsSaving(false);
        // Update the eventColor property in the task store
        // updatedTasks?.modified.forEach((item: any) => {
        //   const taskRecord: any = ganttRef.current?.instance.taskStore.getById(item.id);
        //   if (taskRecord) {
        //     taskRecord.eventColor = item.eventColor; // Update the eventColor in the task record
        //   }
        // });
      }
    }
  };

  const config = createGanttConfig(
    roadmapResult.roadmap,
    obeyaObjectives,
    initiativeStart,
    initiativeEnd,
    viewSelection,
    ganttRef.current?.instance.taskStore,
    isAdminOrPowerUser
  );

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      {/* <DashboardCard
        title={""}
        size={ChartSizes.mediumLarge}
        fullScreen={true}
        useModalOpenProps={true}
      >
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex">
                <ViewSelector
                  viewSelection={viewSelection}
                  setViewSelection={setViewSelection}
                />
                <RoadmapToolbar
                  source="obeya"
                  hideViewBy={false}
                  ganttRef={ganttRef}
                  setViewSelection={setViewSelection}
                  view={viewSelection ?? "Work breakdown"}
                />
              </Box>
              {isAdminOrPowerUser && (
                <SaveButton
                  variant="contained"
                  onClick={onSubmit}
                  startIcon={
                    isSaving && (
                      <Spinner
                        isVisible={isSaving}
                        style={{ marginLeft: 20, marginBottom: 2 }}
                      />
                    )
                  }
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </SaveButton>
              )}
            </Box>
            <BryntumGantt
              {...config}
              columns={obeyaRoadmapColumns}
              ref={ganttRef}
              zoomLevel={3}
              width={1700}
              height={480}
            />

            <Legends />
          </div>
        )}
      </DashboardCard> */}

      <Box display="flex" width="100%" padding={16} justifyContent={"center"}>
        <Typography
          style={{
            fontFamily: "Open Sans",
            fontSize: 18,
            color: "#8B9091",
            textAlign: "center",
          }}
        >
          This widget uses a licensed component. For more details, visit <br />
          <a href="https://bryntum.com/products/react-gantt-chart/">
            https://bryntum.com/products/react-gantt-chart/
          </a>
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(Roadmap);
