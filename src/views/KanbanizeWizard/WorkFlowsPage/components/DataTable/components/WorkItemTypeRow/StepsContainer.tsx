import { useRef } from "react";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { useWizardContext } from "views/SetupWizard/contexts/useWizardContext";
import {
  TransformedDatabaseWorkItemType,
  TransformedDatabaseWorkItemTypeStep,
  RawDiscontinuedSteps,
} from "views/SetupWizard/views/WorkItemTypes/interfaces/interfaces";
import { getReorderedSteps } from "views/SetupWizard/views/WorkItemTypes/utils/utils";

import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

import StepRow from "./components/StepRow";
import StepsHeader from "./components/StepsHeader/StepsHeader";
import { getUniqueStepIdentifier } from "./components/StepRow/utils/getUniqueStepIdentifier";
import { useSnackbar } from "notistack";

type Props = {
  onChange: (steps: TransformedDatabaseWorkItemTypeStep[]) => void;
  steps: TransformedDatabaseWorkItemTypeStep[];
  copiedWorkflowSteps?: TransformedDatabaseWorkItemTypeStep[];
  isChangeFontColor: boolean;
  workItemType: TransformedDatabaseWorkItemType;
  initDiscontinuedSteps: RawDiscontinuedSteps[];
  setInitDiscontinuedSteps: (steps: RawDiscontinuedSteps[]) => void;
};

export function StepsContainer({
  steps,
  onChange,
  copiedWorkflowSteps,
  isChangeFontColor,
  workItemType,
  initDiscontinuedSteps,
  // setInitDiscontinuedSteps,
}: Props) {
  const { isSubmitting } = useWizardContext();
  const droppableIdRef = useRef(uuid());
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Change background color of step row
   */
  function getFontColor(step: any, copiedWorkflowSteps: any, target: any) {
    if (isChangeFontColor) {
      const results = copiedWorkflowSteps?.filter(function (o1) {
        return target?.some(function (o2) {
          return o1.id === o2.id && o1.name === o2.name;
        });
      });

      if (
        results.some((item) => item.id === step.id && item.name === step.name)
      )
        return "#43a047";
    }

    return "#000";
  }

  const handleOnDragEnd = (result: DropResult) => {
    const {
      source: { index: sourceIndex },
      destination: { index: destinationIndex } = {},
    } = result;

    if (destinationIndex === undefined || destinationIndex === sourceIndex) {
      return;
    }

    const _arrivalPointIndex = steps.findIndex(
      (item) => item.compositeId === workItemType.arrivalId
    );
    const _commitmentPointIndex = steps.findIndex(
      (item) => item.compositeId === workItemType.commitmentId
    );
    const _departurePointIndex = steps.findIndex(
      (item) => item.compositeId === workItemType.departureId
    );

    if (
      _arrivalPointIndex === sourceIndex ||
      _commitmentPointIndex === sourceIndex ||
      _departurePointIndex === sourceIndex
    ) {
      enqueueSnackbar("Cannot move a key workflow event.", {
        variant: "error",
      });
      return;
    }

    const reorderedSteps = getReorderedSteps(
      steps,
      sourceIndex,
      destinationIndex
    );

    onChange(reorderedSteps);
  };

  function getBackgroundColorEvents(
    index: number,
    step: TransformedDatabaseWorkItemTypeStep
  ) {
    const _arrivalPointIndex = steps.findIndex(
      (item) => item.compositeId === workItemType.arrivalId
    );
    const _commitmentPointIndex = steps.findIndex(
      (item) => item.compositeId === workItemType.commitmentId
    );
    const _departurePointIndex = steps.findIndex(
      (item) => item.compositeId === workItemType.departureId
    );

    let color;
    color =
      index < _arrivalPointIndex
        ? "#DFE0E1"
        : (_arrivalPointIndex > -1 &&
            index >= _arrivalPointIndex &&
            index < _commitmentPointIndex) ||
          index === _arrivalPointIndex
        ? "#C5C8C9"
        : (_commitmentPointIndex > -1 &&
            index >= _commitmentPointIndex &&
            index < _departurePointIndex) ||
          index === _commitmentPointIndex
        ? "#D5E8F4"
        : _departurePointIndex > -1 && index >= _departurePointIndex
        ? "#D8F6F5"
        : "#F2F2F2";

    if (
      initDiscontinuedSteps.find((item) =>
        item.steps.find(
          (i) => i.compositeId === step.compositeId && i.order === null
        )
      )
    ) {
      const matchingItem = initDiscontinuedSteps.find((item) =>
        item.steps.find(
          (s) =>
            s.initOrder === index ||
            s.initOrder ===
              steps.findIndex(
                (item) => item.compositeId === step.compositeId
              ) ||
            s.compositeId === step.compositeId
        )
      );

      if (matchingItem) {
        const discontinuedStep = matchingItem.steps.find(
          (s) => s.initOrder === index || s.compositeId === step.compositeId
        );

        if (
          discontinuedStep &&
          discontinuedStep.initOrder === index &&
          discontinuedStep.compositeId === step.compositeId
        ) {
          color = "#FCF4F4";
        }
      }
    }

    return color;
  }

  return (
    <Grid item xs={12}>
      <TableRow>
        <h3 style={{ paddingLeft: 16, width: 300 }}>Order Workflow Steps</h3>
        <p
          style={{
            paddingLeft: 16,
            marginBottom: "5px",
            color: "#888",
          }}
        >
          Re-arrange the order of the steps below to represent the correct
          workflow.
        </p>
      </TableRow>
      <Table
        size="small"
        aria-label="steps"
        style={{ pointerEvents: isSubmitting ? "none" : undefined }}
      >
        <StepsHeader />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId={droppableIdRef.current}>
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {steps?.map((step, index) => (
                  <StepRow
                    key={getUniqueStepIdentifier(step)}
                    step={step}
                    index={index}
                    onChange={(value) => {
                      const updatedSteps = [...steps];
                      updatedSteps.splice(index, 1, value);
                      onChange(updatedSteps);
                    }}
                    colorBackground={getBackgroundColorEvents(index, step)}
                    isChangeFontColor={isChangeFontColor}
                    fontColor={getFontColor(step, steps, copiedWorkflowSteps)}
                  />
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </Table>
    </Grid>
  );
}
