import { useState, memo, useRef } from "react";
import {
  UpdateItem,
  UpdatesAggregatedByTime,
} from "../../hooks/useUpdates";
import { DateTime, Interval } from "luxon";
import { Box, Typography } from "@material-ui/core";
import InitiativeIcon from "views/LeanPortfolio/LinkMap/Icons/Initiative";
import ObjectiveIcon from "views/LeanPortfolio/LinkMap/Icons/Objective";
import KeyResultIcon from "views/LeanPortfolio/LinkMap/Icons/KeyResult";
import Risk from "views/LeanPortfolio/LinkMap/Icons/Risk";
import DependencyIcon from "views/LeanPortfolio/LinkMap/Icons/Dependency";
import { Skeleton } from "@material-ui/lab";
import { UpdatesTooltip } from "./components/UpdatesTooltip/UpdatesTooltip";
import { styled } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { scrollbarStyle } from "../../Updates.styles";
import { formatDate } from "utils/dateTime";

type UpdateGroup = {
  type: string;
  count: number;
  updates: UpdateItem[];
};

type UpdateWeek = {
  startDate: DateTime;
  endDate: DateTime;
  groupedUpdates: UpdateGroup[];
};

type Props = {
  data: UpdatesAggregatedByTime | undefined;
  startDate?: DateTime;
  endDate?: DateTime;
  isLoadingUpdates?: boolean;
};

const ratingBackgroundColors = {
  "1": "#1E7D58",
  "2": "#D4A813",
  "3": "#BE3324",
  "4": "#bdbdbd",
};
const DateLabel = styled(Typography)({
  fontSize: 12,
  color: "#808689",
});

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    overflowX: "auto",
    justifyContent: "flex-start",
    paddingBottom: theme.spacing(2),
    ...scrollbarStyle,
  },
  dateLabels: {
    display: "flex",
    marginTop: 18,
    fontSize: 10,
  },
  updateDues: {
    display: "flex",
    justifyContent: "flex-end",
    color: "#808689",
    fontSize: 12,
    fontFamily: "Open Sans",
    position: "relative",
  },
  groupUpdatesContainer: {
    position: "relative",
    paddingTop: 20,
  },
  groupUpdates: {
    height: 6,
    margin: 3,
    borderRadius: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 600,
    color: "#2B353B",
    fontFamily: "Open Sans",
    marginTop: 10,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const UpdateTimeLine = memo(({ data, isLoadingUpdates, ...props }: Props) => {
  const classes = useStyles();
  const currentWeekRef = useRef<null | HTMLDivElement>(null);
  const lastWeekRef = useRef<null | HTMLDivElement>(null);
  const [alreadyScrolled, setAlreadyScrolled] = useState<boolean>(false);
  let sortedUpdates: UpdateItem[] = [],
    updatesByWeek: UpdateWeek[] = [];

  const isLoading = isLoadingUpdates || !data || !props.startDate || !props.endDate;

  if (data && props.startDate && props.endDate) {
    const allUpdates = [
      ...(data.lastWeek || []),
      ...(data.previous || []),
      ...(data.thisWeek || []),
    ].sort((a, b) => {
      return (
        DateTime.fromISO(a.updatedAt).toMillis() -
        DateTime.fromISO(b.updatedAt).toMillis()
      );
    });
    sortedUpdates = allUpdates;
    let currentDate = props.startDate;
    const array: UpdateWeek[] = [];
    let firstWeekWithUpdateFound = false;
    while (currentDate < props.endDate) {
      const endDate =
        currentDate.plus({ days: 7 }).toMillis() > props.endDate.toMillis()
          ? props.endDate
          : currentDate.plus({ days: 7 });
      const item: UpdateWeek = {
        startDate: currentDate,
        endDate,
        groupedUpdates: [],
      };
      const interval = Interval.fromDateTimes(currentDate, endDate);
      allUpdates
        .filter((update) =>
          interval.contains(DateTime.fromISO(update.updatedAt))
        )
        .forEach((update) => {
          const idx = item.groupedUpdates.findIndex(
            (x) => x.type === update.updateType
          );
          if (idx > -1) {
            item.groupedUpdates[idx].count = item.groupedUpdates[idx].count + 1;
            item.groupedUpdates[idx].updates.push(update);
          } else {
            item.groupedUpdates.push({
              type: update.updateType,
              count: 1,
              updates: [update],
            });
          }
        });
      if (item.groupedUpdates.length > 0 && !firstWeekWithUpdateFound)
        firstWeekWithUpdateFound = true;
      if (firstWeekWithUpdateFound) {
        array.push(item);
      }
      currentDate = currentDate.plus({ days: 7 });
      if (currentDate.toMillis() > DateTime.now().toMillis()) break;
    }
    updatesByWeek = array;
    if (!alreadyScrolled) {
      setAlreadyScrolled(true);
      setTimeout(() => {
        if (currentWeekRef.current) {
          currentWeekRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        } else {
          lastWeekRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }, 3000);
    }
  }

  const initiativeUpdates = sortedUpdates.filter(
    (x) => x.updateType === "initiative"
  );
  const lastUpdate = initiativeUpdates?.length
    ? initiativeUpdates?.[initiativeUpdates?.length - 1]
    : undefined;

  const currentWeekGroupIdx = updatesByWeek?.findIndex((x) =>
    Interval.fromDateTimes(x?.startDate, x?.endDate).contains(DateTime.now())
  );
  let updateDue;
  if (currentWeekGroupIdx > -1 && props?.endDate) {
    updateDue = formatDate(updatesByWeek?.[currentWeekGroupIdx]?.endDate);
    const currentWeekInitiativeUpdates = updatesByWeek?.[
      currentWeekGroupIdx
    ]?.groupedUpdates.find((x) => x.type === "initiative");
    if (currentWeekInitiativeUpdates) {
      updateDue = undefined;
      const dueDate = updatesByWeek?.[currentWeekGroupIdx]?.endDate.plus({
        days: 7,
      });
      updateDue =
        dueDate?.toMillis() > props?.endDate?.toMillis() ? undefined : dueDate;
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "98%" }}>
      <Box className={classes.header}>
        Timeline
        {isLoading ? (
          <Skeleton variant="rect" width={"20%"} style={{ borderRadius: 6 }} />
        ) : lastUpdate ? (
          <Typography className={classes.updateDues}>
            Last update on{" "}
            {formatDate(lastUpdate.updatedAt)}
          </Typography>
        ) : (
          <Typography className={classes.updateDues}>No updates yet</Typography>
        )}
      </Box>

      {isLoading ? (
        <Skeleton
          variant="rect"
          style={{ height: 80, marginTop: 20, borderRadius: 6 }}
        />
      ) : (
        <Box
          className={classes.wrapper}
          style={{
            justifyContent: updatesByWeek.length <= 6 ? "center" : "flex-start",
          }}
        >
          {updatesByWeek.map((updatesItem, index) => {
            let color = "#bdbdbd";
            const initiativeGroup = updatesItem.groupedUpdates.find(
              (x) => x.type === "initiative"
            );
            if (initiativeGroup) {
              let lastIntitativeUpdateStatus = '';
              initiativeGroup.updates.reverse().find(x => {
                const lastStatus = x.updateMetadata.fields && x.updateMetadata.fields.find(x => x.name === 'ratingId');
                if (lastStatus) {
                  lastIntitativeUpdateStatus = lastStatus.value;
                  return true;
                }
              });
              if (lastIntitativeUpdateStatus) {
                color = ratingBackgroundColors[lastIntitativeUpdateStatus.toString()];
              }
            }
            return (
              <Box
                key={updatesItem.startDate.toISO()}
                style={{ display: "flex" }}
              >
                <div
                  ref={
                    Interval.fromDateTimes(
                      updatesItem.startDate,
                      updatesItem.endDate
                    ).contains(DateTime.now())
                      ? currentWeekRef
                      : undefined
                  }
                ></div>
                <div
                  ref={
                    index === updatesByWeek.length - 1 ? lastWeekRef : undefined
                  }
                ></div>
                <Box className={classes.groupUpdatesContainer}>
                  <Box
                    className={classes.groupUpdates}
                    style={{
                      backgroundColor: color,
                      minWidth:
                        updatesItem.groupedUpdates.length > 0 ? 250 : 100,
                      maxWidth: 250,
                      flex: 1,
                      // width: updatesItem.groupedUpdates.length > 0 ? 250 : 100,
                    }}
                  />
                  <Box style={{ position: "absolute", top: 12, width: "100%" }}>
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                      {updatesItem.groupedUpdates.map((group, index) => {
                        if (group.type !== "general") {
                          let componentToRender = (
                            <InitiativeIcon color="white" />
                          );
                          switch (group.type) {
                            case "objective":
                              componentToRender = (
                                <ObjectiveIcon color="white" fontSize={16} />
                              );
                              break;
                            case "key result":
                              componentToRender = (
                                <KeyResultIcon color="white" fontSize={16} />
                              );
                              break;
                            case "risk":
                              componentToRender = (
                                <Risk color="white" fontSize={16} />
                              );
                              break;
                            case "dependency":
                              componentToRender = (
                                <DependencyIcon color="white" fontSize={16} />
                              );
                              break;
                            default:
                              componentToRender = (
                                <InitiativeIcon color="white" fontSize={16} />
                              );
                          }
                          return (
                            <UpdatesTooltip
                              content={group.updates}
                              maxWidth="sm"
                              orientation="left"
                              key={group.type}
                              type={group.type}
                            >
                              <Box
                                style={{ marginLeft: index > 0 ? "1px" : 0 }}
                              >
                                <Box
                                  style={{
                                    height: 28,
                                    width: 28,
                                    borderRadius: 30,
                                    backgroundColor: color,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {componentToRender}
                                </Box>
                              </Box>
                            </UpdatesTooltip>
                          );
                        }
                        return <div key={group.type}></div>;
                      })}
                    </Box>
                  </Box>
                  <Box
                    className={classes.dateLabels}
                    style={{
                      justifyContent:
                        index === 0 && index + 1 !== updatesByWeek.length
                          ? "flex-start"
                          : "space-between",
                      marginLeft: index > 0 ? "-40px" : 0,
                    }} //: index === updatesByWeek.length - 1 ? 'flex-end' : 'space-between',
                  // && index !== updatesByWeek.length - 1
                  >
                    <DateLabel>
                      {formatDate(updatesItem.startDate)}
                    </DateLabel>
                    <span
                      style={{ justifyContent: "flex-end", marginRight: "-5%" }}
                    >
                      {index === updatesByWeek.length - 1 && (
                        <DateLabel>
                          {formatDate(updatesItem.endDate)}
                        </DateLabel>
                      )}
                    </span>
                  </Box>
                </Box>
                <FiberManualRecordIcon
                  style={{ color, fontSize: 18, marginTop: 17 }}
                />
              </Box>
            );
          })}
        </Box>
      )}

      <Box className={classes.updateDues} style={{ paddingTop: 20 }}>
        {updateDue && (
          <Typography
            style={{
              color: "#808689",
              fontSize: 12,
              fontFamily: "Open Sans",
            }}
          >
            Next update due on{" "}
            {typeof updateDue === "string"
              ? updateDue
              : formatDate(updateDue)}
          </Typography>
        )}
      </Box>
    </div>
  );
});

export default UpdateTimeLine;
