/* eslint-disable @typescript-eslint/no-unused-vars */
/* This component is licensed. For licensing information, visit bryntum/gantt-react.
  * import { StateProvider } from "@bryntum/gantt";
  * import { BryntumToolbar } from "@bryntum/gantt-react";
*/

import { Box } from "@material-ui/core";
import useAuthentication from "hooks/useAuthentication";
import { useEffect, useState } from "react";
import useFilterPanelContext from "views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext";

interface Props {
  source: "portfolio" | "obeya";
  ganttRef: any;
  view: string;
  hideViewBy: boolean;
  setViewSelection: (value: string) => void;
}

const RoadmapToolbar = ({ ganttRef, hideViewBy, source }: Props) => {
  const { isAdminOrPowerUser } = useAuthentication();
  
  const {
    otherApiQueryParameters: { contextId },
  } = useFilterPanelContext();

  const [filterKey, setFilterKey] = useState("");

  const [paramValue, setParamValue] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const param = params.get("roomId");

    // If the parameter value is undefined, set a default value
    setParamValue(param || "");
  }, []);

  useEffect(() => {
    if (source === "portfolio") {
      if (contextId) setFilterKey(contextId);
    } else {
      if (paramValue) setFilterKey(paramValue);
      else setFilterKey("");
    }
  }, [source, contextId, paramValue]);

  const onToggleFeatures = (feature) => {
    const gantt = ganttRef.current?.instance;

    if (gantt) {
      // console.log(gantt.features);
      // console.log(gantt);
      if (feature === "subGrid") {
        // If the "subGrid" feature is toggled, hide/show the schedule grid panel type "normal"
        gantt.subGrids["normal"].collapsed = !gantt.subGrids["normal"]
          .collapsed;
      } else if (feature === "projectLine") {
        gantt.features["projectLine"].disabled =
          gantt.features["projectLine"].enabled;
      } else {
        gantt.features[feature].disabled = !gantt.features[feature].disabled;
      }
    }
  };

  const onFilterChange = (value) => {
    const gantt = ganttRef.current?.instance;
    console.log(filterKey);
    if (gantt && filterKey) {
      if (value === "") {
        gantt.taskStore.clearFilters();
      } else {
        value = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        gantt.taskStore.filter({
          filters: (task) =>
            task.name && task.name.match(new RegExp(value, "i")),
          replace: true,
        });
      }

      // StateProvider.setup("local");
      // StateProvider.instance.setValue(`filter-${filterKey}-${source}`, value);
    }
  };

  const onSetBaseline = (index) => {
    const gantt = ganttRef.current?.instance;

    if (gantt) {
      gantt.taskStore.setBaseline(index);
    }
  };

  // const onExportPDF = () => {
  //   const gantt = ganttRef.current?.instance;

  //   if (gantt) {
  //     gantt.features.pdfExport.showExportDialog();
  // console.log(gantt.features.pdfExport)

  // Simple export
  // gantt.features.pdfExport
  //   .export({
  //     // Required, set list of column ids to export
  //     columns: gantt.columns.map((c) => c.id),
  //   })
  //   .then((result) => {
  //     // Response instance and response content in JSON
  //     const { response, responseJSON } = result;
  //   });
  //   }
  // };

  return (
    <Box sx={{ marginTop: 10 }}>
      {/* <BryntumToolbar
        items={[
          {
            type: "buttonGroup",
            items: [
              {
                ref: "expandAllButton",
                icon: "b-fa b-fa-angle-double-down",
                tooltip: "Expand all",
                width: 40,
                height: 40,
                onAction: () => {
                  const gantt = ganttRef.current?.instance;
                  if (gantt) {
                    gantt.expandAll();
                  }
                },
              },
              {
                ref: "collapseAllButton",
                icon: "b-fa b-fa-angle-double-up",
                tooltip: "Collapse all",
                width: 40,
                height: 40,
                onAction: () => {
                  const gantt = ganttRef.current?.instance;
                  if (gantt) {
                    gantt.collapseAll();
                  }
                },
              },
            ],
          },
          {
            type: "buttonGroup",
            items: [
              {
                ref: "zoomInButton",
                icon: "b-fa b-fa-search-plus",
                tooltip: "Zoom in",
                width: 40,
                height: 40,
                onAction: () => {
                  const gantt = ganttRef.current?.instance;
                  if (gantt) {
                    gantt.zoomIn();
                  }
                },
              },
              {
                ref: "zoomOutButton",
                icon: "b-fa b-fa-search-minus",
                tooltip: "Zoom out",
                width: 40,
                height: 40,
                onAction: () => {
                  const gantt = ganttRef.current?.instance;
                  if (gantt) {
                    gantt.zoomOut();
                  }
                },
              },
              {
                ref: "zoomToFitButton",
                icon: "b-fa b-fa-compress-arrows-alt",
                tooltip: "Zoom to fit",
                width: 40,
                height: 40,
                onAction: () => {
                  const gantt = ganttRef.current?.instance;
                  if (gantt) {
                    gantt.zoomToFit();
                  }
                },
              },
              {
                ref: "previousButton",
                icon: "b-fa b-fa-angle-left",
                tooltip: "Previous time span",
                width: 40,
                height: 40,
                onAction: () => {
                  const gantt = ganttRef.current?.instance;
                  if (gantt) {
                    gantt.shiftPrevious();
                  }
                },
              },
              {
                ref: "nextButton",
                icon: "b-fa b-fa-angle-right",
                tooltip: "Next time span",
                width: 40,
                height: 40,
                onAction: () => {
                  const gantt = ganttRef.current?.instance;
                  if (gantt) {
                    gantt.shiftNext();
                  }
                },
              },
            ],
          },
          {
            type: "button",
            ref: "featuresButton",
            icon: "b-fa b-fa-tasks",
            text: "Features",
            tooltip: "Toggle features",
            height: 40,
            menu: [
              {
                text: "Draw dependencies",
                ref: "dependencies",
                checked: true,
                onToggle: () => {
                  onToggleFeatures("dependencies");
                },
              },
              {
                text: "Project lines",
                ref: "projectLines",
                hidden: hideViewBy,
                checked: true,
                onToggle: () => {
                  onToggleFeatures("projectLines");
                },
              },
              // {
              //   text: "Highlight non-working time",
              //   ref: "nonWorkingTime",
              //   checked: true,
              //   onToggle: () => {
              //     onToggleFeatures("nonWorkingTime");
              //   },
              // },
              // {
              //   text: "Initiative labels",
              //   ref: "labels",
              //   checked: true,
              //   onToggle: () => {
              //     onToggleFeatures("labels");
              //   },
              // },
              {
                text: "Show critical paths",
                ref: "criticalPaths",
                checked: false,
                onToggle: () => {
                  onToggleFeatures("criticalPaths");
                },
              },
              {
                text: "Show progress line",
                ref: "progressLine",
                hidden: hideViewBy,
                checked: false,
                onToggle: () => {
                  onToggleFeatures("progressLine");
                },
              },
              // {
              //   text: "Show time ranges",
              //   ref: "timeRanges",
              //   checked: true,
              //   onToggle: () => {
              //     onToggleFeatures("timeRanges");
              //   },
              // },
              {
                text: "Hide schedule",
                cls: "b-separator",
                checked: false,
                ref: "subGrid",
                onToggle: () => {
                  onToggleFeatures("subGrid");
                },
              },
            ],
          },
          {
            type: "button",
            text: "Baselines",
            icon: "b-fa b-fa-bars",
            iconAlign: "start",
            height: 40,
            menu: [
              {
                text: "Set baseline 1",
                disabled: !isAdminOrPowerUser,
                onItem: () => {
                  onSetBaseline(1);
                },
              },
              {
                text: "Set baseline 2",
                disabled: !isAdminOrPowerUser,
                onItem: () => {
                  onSetBaseline(2);
                },
              },
              {
                text: "Set baseline 3",
                disabled: !isAdminOrPowerUser,
                onItem: () => {
                  onSetBaseline(3);
                },
              },
              {
                text: "Show baselines",
                checked: true,
                cls: "b-separator",
                ref: "baselines",
                onToggle: () => {
                  onToggleFeatures("baselines");
                },
              },
            ],
          },
          {
            type: "textfield",
            ref: "filterByName",
            clearable: true,
            width: 300,
            style: "margin-top: 0",
            label: "Find initiatives",
            placeholder: "Find initiatives",
            keyStrokeChangeDelay: 100,
            triggers: {
              filter: {
                align: "end",
                cls: "b-fa b-fa-filter",
              },
            },
            onChange: ({ value }) => onFilterChange(value),
            value: StateProvider.instance.getValue(
              `filter-${filterKey}-${source}`
            )
              ? StateProvider.instance
                  .getValue(`filter-${filterKey}-${source}`)
                  .toString()
              : "",
          },
          // {
          //   type: "button",
          //   ref: "exportButton",
          //   icon: "b-fa-file-export",
          //   text: "Export to PDF",
          //   onAction: () => {
          //     onExportPDF();
          //   },
          // },
        ]}
      /> */}
    </Box>
  );
};

export default RoadmapToolbar;
