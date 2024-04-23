import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControlLabel,
  FormHelperText,
  Grid,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import BaseModal from "components/UI/BaseModal";
import { WidgetGroupKeys, widgetItems } from "./WidgetMetadata";
import { useStyles } from "./styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

type Props = {
  open: any;
  handleClose: any;
  handleSave: any;
  selectedWidget: any;
  setSelectedWidget: any;
  savedDashboardData: any;
};

const AddWidgetsModal = ({
  open,
  handleClose,
  handleSave,
  selectedWidget,
  setSelectedWidget,
  savedDashboardData,
}: Props) => {
  const classes = useStyles();

  const handleAdd = () => {
    handleSave();
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  useEffect(() => {
    if (savedDashboardData) {
      const dashboardLayout = savedDashboardData.dashboardLayout.layout;
      const widgetIds = dashboardLayout?.map((item) => item.i);
      setSelectedWidget(widgetIds);
    }
  }, [savedDashboardData]);

  const handleCheckboxChange = (widget: string) => {
    if (selectedWidget.includes(widget)) {
      setSelectedWidget(selectedWidget.filter((item) => item !== widget));
    } else {
      setSelectedWidget([...selectedWidget, widget]);
    }
  };

  const [selectedListItem, setSelectedListItem] = useState(
    WidgetGroupKeys.FITNESS_CRITERIA
  );

  const widgetGroups = widgetItems.reduce((acc, item) => {
    acc[item.id] = item.widgets;
    return acc;
  }, {});

  const handleSelectAll = () => {
    const allWidgets = widgetGroups[selectedListItem]?.map(
      (widget) => widget.id
    );

    setSelectedWidget((prevSelectedWidgets) => {
      if (allWidgets) {
        const areAllWidgetsSelected = widgetGroups[
          selectedListItem
        ]?.every((widget) => prevSelectedWidgets.includes(widget.id));

        // If all widgets are already selected, unselect all; otherwise, select all
        return areAllWidgetsSelected
          ? prevSelectedWidgets.filter((widget) => !allWidgets.includes(widget))
          : [...prevSelectedWidgets, ...allWidgets];
      } else {
        return prevSelectedWidgets;
      }
    });
  };

  return (
    <BaseModal
      open={open}
      setOpen={handleClose}
      maxWidth={"xl"}
      customStyle={{ minHeight: 650 }}
      title="Add Widget"
    >
      <DialogContent>
        <Grid container>
          <Grid item xs={3} className={classes.sidePanel}>
            <List component="nav" aria-label="side panel">
              {widgetItems.map((item) => (
                <ListItem
                  key={item.id}
                  className={classes.listItem}
                  onClick={() => setSelectedListItem(item.id)}
                  style={{
                    backgroundColor:
                      selectedListItem === item.id ? "#E6F2FA" : "#FCFCFC",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                >
                  <Typography
                    className={classes.listItemText}
                    style={{
                      fontWeight: selectedListItem === item.id ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </Typography>
                  {selectedListItem === item.id && (
                    <ChevronRightIcon fontSize="small" />
                  )}
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={9} className={classes.contentPanel}>
            <Box display="flex" justifyContent="flex-end">
              {widgetGroups[selectedListItem].length > 1 && (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={
                        widgetGroups[selectedListItem]?.every((widget) =>
                          selectedWidget.includes(widget.id)
                        ) || false
                      }
                      onChange={handleSelectAll}
                    />
                  }
                  label={`${
                    widgetGroups[selectedListItem]?.every((widget) =>
                      selectedWidget.includes(widget.id)
                    )
                      ? "Unselect"
                      : "Select"
                  } all`}
                />
              )}
            </Box>

            <div className={classes.previewPanel}>
              {widgetItems
                .find((item) => item.id === selectedListItem)
                ?.widgets.map((widget) => (
                  <Box
                    key={widget.id}
                    className={classes.previewCard}
                    onClick={() => handleCheckboxChange(widget.id)}
                    style={{
                      cursor: "pointer",
                      position: "relative",
                      display:
                        selectedListItem === WidgetGroupKeys.WORK_OVERVIEW
                          ? ""
                          : "flex",
                      paddingRight:
                        selectedListItem === WidgetGroupKeys.WORK_OVERVIEW
                          ? 8
                          : 0,
                    }}
                  >
                    <Checkbox
                      color="primary"
                      className={classes.radio}
                      checked={selectedWidget.includes(widget.id)}
                      onChange={() => handleCheckboxChange(widget.id)}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        margin: 0,
                        padding: 0,
                      }}
                    />
                    <Box paddingLeft={5}>{widget.preview}</Box>
                  </Box>
                ))}
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <FormHelperText className={classes.selected}>
          {selectedWidget.length}{" "}
          {selectedWidget.length > 1 ? "widgets" : "widget"} selected
        </FormHelperText>
        <Box>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          &nbsp;
          <Button onClick={handleAdd} color="primary" variant="contained">
            Save
          </Button>
        </Box>
      </DialogActions>
    </BaseModal>
  );
};

export default AddWidgetsModal;
