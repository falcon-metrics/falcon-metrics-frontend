
/* This component is licensed. For licensing information, visit bryntum/gantt-react.
  * import { ProjectModel } from "@bryntum/gantt";
*/

import { createTreeNode } from "./createTreeNode";
import { extractDependencies } from "./extractDependencies";
import { ganttConfig } from "views/LeanPortfolio/PortfolioBoardPage/Roadmap/config/ganttConfig";

export const createGanttConfig = (
  roadmapResult,
  obeyaObjectives,
  initiativeStart,
  initiativeEnd,
  viewSelection,
  updatedResult,
  isAdminOrPowerUser
) => {
  const updatedDataMap = updatedResult ? updatedResult.reduce((acc, entry) => {
    acc[entry.id] = entry;
    return acc;
  }, {}) : {};

  // Map through the original roadmapResult and update the fields based on updatedDataMap
  const result = roadmapResult.map(task => {
    if (updatedDataMap[task.workItemId]) {
      const updatedTask = updatedDataMap[task.workItemId];
      task.baselines = updatedTask.baselines;
      task.dependencies = updatedTask.dependencies;
      task.targetStart = updatedTask.startDate;
      task.targetEnd = updatedTask.endDate;
      task.eventColor = updatedTask.eventColor;
    }
    return task;
  });

  const flowItems =
    viewSelection !== "Goals"
      ? createTreeNode(result ?? roadmapResult, viewSelection)
      : createTreeNode(obeyaObjectives, viewSelection);

  const dependencies = extractDependencies(flowItems);
  
  // const project = new ProjectModel({
  //   eventStore: {
  //     data: flowItems,
  //   },
  //   dependencyStore: {
  //     data: dependencies,
  //   },
  //   startDate: initiativeStart,
  //   endDate: initiativeEnd,
  // });

  const project: any = ({
    eventStore: {
      data: flowItems,
    },
    dependencyStore: {
      data: dependencies,
    },
    startDate: initiativeStart,
    endDate: initiativeEnd,
  });

  const config = {
    ...ganttConfig,
    readOnly: !isAdminOrPowerUser,
    project,
  };

  return config;
};

