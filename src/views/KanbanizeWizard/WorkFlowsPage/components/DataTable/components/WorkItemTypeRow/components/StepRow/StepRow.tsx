import { Draggable } from "react-beautiful-dnd";
import { TransformedDatabaseWorkItemTypeStep } from "views/SetupWizard/views/WorkItemTypes/interfaces/interfaces";

import Switch from "@material-ui/core/Switch";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ReorderIcon from "@material-ui/icons/Reorder";

import { getChecked, getType } from "./utils/getType";
import { getUniqueStepIdentifier } from "./utils/getUniqueStepIdentifier";
import { createStyles, makeStyles } from "@material-ui/core";

type Props = {
  step: TransformedDatabaseWorkItemTypeStep;
  index: number;
  onChange: (step: TransformedDatabaseWorkItemTypeStep) => void;
  colorBackground?: string;
  isChangeFontColor: boolean;
  fontColor?: string;
};

interface styleProps {
  color: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundColor: (props: styleProps) => props.color,
      "& > *": {
        borderBottom: "unset",
      },
    },
  })
);

function StepRow({
  step,
  index,
  onChange,
  colorBackground,
  fontColor
}: Props) {
  const classes = useStyles({ color: colorBackground || "#F2F2F2" });

  return (
    <Draggable
      draggableId={getUniqueStepIdentifier(step)}
      index={index}
    >
      {(provided) => (
        <TableRow
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.root}
        >
          <TableCell padding="checkbox">
            <ReorderIcon color="disabled" />
          </TableCell>
          <TableCell component="th" scope="row" style={{ fontWeight: fontColor === "#000" ? 'normal' : 'bolder', color: fontColor }}>
            {step.id}
          </TableCell>
          <TableCell>{step.name}</TableCell>
          <TableCell>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span>
                Queue{" "}
                <Switch
                  value={step.type}
                  onChange={(e) =>
                    onChange({ ...step, type: getType(e.target.checked) })
                  }
                  name="type"
                  size="small"
                  color="primary"
                  checked={getChecked(step.type)}
                />{" "}
                Active
              </span>
            </div>
          </TableCell>
          <TableCell>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span>{step.isUnmapped ? "Discontinued" : "Current"}</span>
            </div>
          </TableCell>
        </TableRow>
      )}
    </Draggable>
  );
}

export default StepRow;
