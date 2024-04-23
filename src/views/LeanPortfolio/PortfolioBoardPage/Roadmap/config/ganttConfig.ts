/* This component is licensed. For licensing information, visit bryntum/gantt-react.
  * import { BryntumGanttProps } from "@bryntum/gantt-react";
*/

export const portfolioRoadmapColumns = [
  { type: "name", field: "name", width: 400, resizable: true },
  // {
  //   field: "column",
  //   text: "Stage",
  //   resizable: true,
  //   hidden: true,
  // },
  // {
  //   field: "context",
  //   text: "Boards & Aggregations",
  //   resizable: true,
  //   hidden: true,
  // },
  {
    type: "startdate",
    field: "startDate",
    text: "Start Date",
    format: "DD MMM YYYY",
  },
  {
    type: "enddate",
    field: "endDate",
    text: "End Date",
    format: "DD MMM YYYY",
  },
];

export const obeyaRoadmapColumns = [
  { type: "name", field: "name", width: 400, resizable: true },
  {
    type: "startdate",
    field: "startDate",
    text: "Start Date",
    format: "DD MMM YYYY",
  },
  {
    type: "enddate",
    field: "endDate",
    text: "End Date",
    format: "DD MMM YYYY",
  },
  {
    field: "assignedTo",
    text: "Assignee",
  },
  {
    field: "flomatikaWorkItemTypeLevel",
    text: "Flow Item Level",
  },
  {
    field: "workItemType",
    text: "Flow Item Type",
  },
  {
    field: "contextName",
    text: "Boards and Aggregations",
  },
];

const ganttConfig: any = {
  barMargin: 10,
  height: 570,
  filterFeature: true,
  excelExporterFeature: true,
  minZoomLevel: 4,
  maxZoomLevel: 10,
  // pdfExportFeature: {
  //   exportServer: "http://localhost:4000/prod/roadmap/export",
  //   translateURLsToAbsolute: "http://localhost:4000/prod/roadmap/resources",
  //   keepPathName: false,
  // },
  cellEditFeature: false,
  taskCopyPasteFeature: false,
  taskNonWorkingTimeFeature: false,
  rowReorderFeature: false,
  enableDeleteKey: false,
  eventSegmentsFeature: false,
  baselinesFeature: true,
  dependenciesFeature: true,
  dependencyEditFeature: true,
  subGridConfigs: {
    locked: {
      width: 600,
    },
  },
  timeRangesFeature: {
    showCurrentTimeLine: {
      name: "Today",
    },
  },
  displayDateFormat: "DD MMM YYYY",
  labelsFeature: {
    labelLayoutMode: "measure",
  },
  features: {
    labels: true,
    dependencies: true,
    dependencyEdit: {
      editorConfig: {
        bbar: {
          items: {
            // Hiding save button
            saveButton: false,
            deleteButton: false,
          }
        }
      }
    },
    baselines: {
      disabled: true,
    },
    // labels: {
    //   disabled: false,
    // },
    progressLine: {
      statusDate: new Date(),
      disabled: true,
      drawLineOnlyWhenStatusDateVisible: true,
    },
    taskMenu: {
      items: {
        add: false,
        indent: false,
        outdent: false,
        deleteTask: false,
        copyTask: false,
        linkTasks: false,
        unlinkTasks: false,
        convertToMilestone: false,
      },
    },
    taskEdit: {
      editorConfig: {
        bbar: {
          items: {
            deleteButton: false,
          },
        },
      },
      items: {
        generalTab: {
          items: {
            effort: {
              label: " ",
              type: "label",
            },
            name: {
              readOnly: true,
            },
          },
        },
        predecessorsTab: false,
        successorsTab: false,
        resourcesTab: false,
        advancedTab: {
          items: {
            calendarField: false,
            schedulingModeField: false,
            manuallyScheduledField: false,
            effortDrivenField: false,
            divider: false,
            rollupField: false,
            inactiveField: false,
            ignoreResourceCalendarField: false,
          },
        },
      },
    },
  },
};

export { ganttConfig };
