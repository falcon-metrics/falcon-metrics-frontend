import { ChangeEvent } from "react";

import { TransformedDatabaseWorkItemType } from "views/SetupWizard/views/WorkItemTypes/interfaces/interfaces";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { StepOption } from "./";
import { ListItemText } from "@material-ui/core";
import { useStyles } from "./EventPointSelector.styles";

type Props = {
  point: {
    key: string;
    presentationName: string;
    color: string;
  };
  isInvalid: boolean;
  workItemType: TransformedDatabaseWorkItemType;
  handleChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
  stepOptions: StepOption[];
};

function EventPointSelector({
  point,
  isInvalid,
  workItemType,
  handleChange,
  stepOptions,
}: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Grid item xs={4}>
      <Box className={classes.label}>
        <Box
          style={{
            backgroundColor: point.color,
            width: "15px",
            height: "15px",
            border: "1px solid #C4C4C4",
            borderRadius: 5,
            marginRight: 5,
          }}
        />
        {point.presentationName} Point *
      </Box>
      <Select
        className={classes.select}
        fullWidth
        displayEmpty
        name={point.key}
        error={isInvalid}
        margin="dense"
        value={workItemType[point.key]}
        onChange={handleChange}
        renderValue={(selectedValue) => {
          const selectedItem = stepOptions.find(
            (option) => option.compositeId === selectedValue
          );
          return selectedItem ? selectedItem.name : "";
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              overflowY: "auto",
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {stepOptions?.map(({ name, isUnmapped, compositeId }) => (
          <MenuItem
            key={compositeId}
            dense
            value={compositeId}
            disabled={
              isUnmapped ||
              workItemType.arrivalId === compositeId ||
              workItemType.commitmentId === compositeId ||
              workItemType.departureId === compositeId
            }
          >
            <ListItemText primary={name} />
            <span style={{ fontSize: 10, fontStyle: "italic" }}>
              {workItemType.arrivalId === compositeId
                ? "Assigned as Arrival Point"
                : workItemType.commitmentId === compositeId
                ? "Assigned as Commitment Point"
                : workItemType.departureId === compositeId
                ? "Assigned as Departure Point"
                : ""}
            </span>
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
}

export default EventPointSelector;
