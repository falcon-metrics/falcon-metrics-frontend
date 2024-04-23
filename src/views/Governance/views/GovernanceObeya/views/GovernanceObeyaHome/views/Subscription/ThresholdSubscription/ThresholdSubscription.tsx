import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  MenuItem,
  Select,
  Slide,
  Typography,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import Skeleton from "@material-ui/lab/Skeleton";
import React, { Fragment, useEffect } from "react";
import { memo } from "react";
import { useThresholdSubscription } from "views/Governance/views/GovernanceObeya/hooks/useThresholdSubscription";
import { PredictiveAnalysisResponse } from "../../PredictiveAnalysis/types";
import {
  ThresholdDirection,
  ThresholdNotificationSubscription,
  ThresholdNotificationSubscriptionRequest,
  ThresholdUnit,
} from "../types";

import { formatDate } from "utils/dateTime";

interface Props {
  obeyaRoomId: string;
  analysisData: PredictiveAnalysisResponse;
}
const useStyles = makeStyles(() => ({
  subscriptionContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    fontSize: 12,
  },
  selectBox: {
    marginLeft: "0.5em",
    marginRight: "0.5em",
    fontSize: 12,
  },
  menuItem: {
    fontSize: 12,
    fontFamily: "Open Sans",
  },
}));

export const ThresholdSubscription = memo(
  ({ obeyaRoomId, analysisData }: Props) => {
    const classes = useStyles();
    /////////////states
    const [checked, setChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [dialogMessage, setDialogMessage] = React.useState(
      "Unsubscribe from the notification"
    );
    const [dialogConfirmAction, setDialogConfirmAction] = React.useState(
      () => () => {
        console.log("place holder");
      }
    );
    // const [dialogMessage, setDialogMessage] = React.useState(originalMessage);
    const defaultSubscription: ThresholdNotificationSubscriptionRequest = {
      threshold: 7,
      thresholdUnit: ThresholdUnit.Day,
      thresholdDirection: ThresholdDirection.Up,
      obeyaRoomId,
      targetDate: analysisData.deliveryDateAnalysis["85Percentile"],
    };
    const [subscriptionData, setSubscriptionData] = React.useState<
      | ThresholdNotificationSubscriptionRequest
      | ThresholdNotificationSubscription
    >(defaultSubscription);
    const [targetDate, setTargetDate] = React.useState(
      analysisData.deliveryDateAnalysis["85Percentile"]
    );
    const {
      postAndMutate,
      getSubscription,
      inactivateSubscription,
    } = useThresholdSubscription();
    /////state behaviour handlers

    const handleSubmit = async (
      postData:
        | ThresholdNotificationSubscriptionRequest
        | ThresholdNotificationSubscription
    ) => {
      closeAlert();
      setIsSubmitting(true);
      await postAndMutate(postData);
      setIsSubmitting(false);
    };
    const handleInactivate = async () => {
      closeAlert();
      setIsSubmitting(true);
      await inactivateSubscription(
        subscriptionData as ThresholdNotificationSubscription
      );
      setTargetDate(analysisData.deliveryDateAnalysis["85Percentile"]);
      setIsSubmitting(false);
      setChecked(false);
    };
    const openDialog = () => {
      setDialogOpen(true);
    };
    const handleChecked = async () => {
      const postData = { ...subscriptionData, targetDate };
      setDialogConfirmAction(() => async () => {
        await handleSubmit(postData);
        setChecked(true);
      });
      setDialogMessage("Subscribe to notification");
      openDialog();
    };
    const handleUncheck = async () => {
      setDialogConfirmAction(() => handleInactivate);
      setDialogMessage("Unsubscribe from the notification");
      openDialog();
    };

    const handleUpdateChecked = async (
      postData:
        | ThresholdNotificationSubscriptionRequest
        | ThresholdNotificationSubscription
    ) => {
      setDialogConfirmAction(() => async () => {
        await handleSubmit(postData);
        closeAlert();
      });
      setDialogMessage("Update notification threshold");
      openDialog();
    };
    const handleCheckChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (event.target.checked) {
        await handleChecked();
      } else if (!event.target.checked) {
        await handleUncheck();
      }
    };
    const handleDataChange = async (
      event: React.ChangeEvent<{ value: unknown }>,
      field: keyof ThresholdNotificationSubscriptionRequest
    ) => {
      const newValue = event.target.value as any;
      const newData = {};
      newData[field] = newValue;
      const newSubscriptionData = {
        ...subscriptionData,
        ...newData,
      };
      ///Set state may be async,
      //so we store new data somewhere else first for the post request
      setSubscriptionData((prevState) => {
        return {
          ...prevState,
          ...newSubscriptionData,
        };
      });
      if (checked) {
        await handleUpdateChecked(newSubscriptionData);
      }
    };
    const closeAlert = () => {
      setDialogOpen(false);
    };
    /////////////effects on mount
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        const subscriptionResponse = (await getSubscription(
          obeyaRoomId
        )) as ThresholdNotificationSubscription[];
        setLoading(false);
        const data = subscriptionResponse[0];
        if (data) {
          setChecked(true);
          setSubscriptionData(data);
          if (data.targetDate) setTargetDate(data.targetDate);
        }
      };
      fetchData();
    }, [obeyaRoomId]);

    useEffect(() => {
      if (!targetDate)
        setTargetDate(analysisData.deliveryDateAnalysis["85Percentile"]);
    }, [analysisData]);

    const formatDateString = (dateString: string) => {
      return formatDate(dateString);
    };

    const thresholdValues = [...Array(30)].map((x, i) => (
      <MenuItem
        className={classes.menuItem}
        value={i}
        key={`threshold-value-${i}`}
      >
        {i}
      </MenuItem>
    ));
    return (
      <Box className={classes.subscriptionContainer}>
        {loading && <Skeleton width={"100%"} height={"4em"} />}
        {!loading && (
          <Fragment>
            <Dialog
              open={dialogOpen}
              onClose={closeAlert}
              TransitionComponent={Transition}
              keepMounted
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {dialogMessage}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={closeAlert} color="primary">
                  Cancel
                </Button>
                <Button onClick={dialogConfirmAction} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <Box height={"4em"}>
              {!formatDateString(targetDate).includes("Invalid") && (
                <Box component={"span"}>
                  {isSubmitting ? (
                    <CircularProgress color="primary" size={20} />
                  ) : (
                    <Checkbox
                      checked={checked}
                      onChange={handleCheckChange}
                      color="primary"
                      inputProps={{ "aria-label": "checkbox" }}
                    />
                  )}
                  Notify me should the forecast of
                  <Typography
                    color="primary"
                    style={{ fontSize: 12 }}
                    display="inline"
                  >
                    {" "}
                    {formatDateString(targetDate)}
                  </Typography>{" "}
                  become
                  <Select
                    labelId="demo-simple-select-label"
                    id="subscription-direction-select"
                    value={subscriptionData.thresholdDirection}
                    onChange={(e) => handleDataChange(e, "thresholdDirection")}
                    className={classes.selectBox}
                  >
                    <MenuItem
                      className={classes.menuItem}
                      value={ThresholdDirection.Up}
                    >
                      Earlier than
                    </MenuItem>
                    <MenuItem
                      className={classes.menuItem}
                      value={ThresholdDirection.Down}
                    >
                      Later than
                    </MenuItem>
                    <MenuItem
                      className={classes.menuItem}
                      value={ThresholdDirection.Both}
                    >
                      Earlier/Later than
                    </MenuItem>
                  </Select>
                  <Select
                    labelId="demo-simple-select-label"
                    id="subscription-threshold-select"
                    value={subscriptionData.threshold}
                    onChange={(e) => handleDataChange(e, "threshold")}
                    className={classes.selectBox}
                  >
                    {thresholdValues}
                  </Select>
                  <Select
                    labelId="demo-simple-select-label"
                    id="subscription-unit-select"
                    value={subscriptionData.thresholdUnit}
                    onChange={(e) => handleDataChange(e, "thresholdUnit")}
                    className={classes.selectBox}
                  >
                    <MenuItem
                      className={classes.menuItem}
                      value={ThresholdUnit.Day}
                    >
                      Day(s)
                    </MenuItem>
                    <MenuItem
                      className={classes.menuItem}
                      value={ThresholdUnit.Week}
                    >
                      Week(s)
                    </MenuItem>
                    <MenuItem
                      className={classes.menuItem}
                      value={ThresholdUnit.Month}
                    >
                      Month(s)
                    </MenuItem>
                  </Select>
                </Box>
              )}
            </Box>
          </Fragment>
        )}
      </Box>
    );
  }
);
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
