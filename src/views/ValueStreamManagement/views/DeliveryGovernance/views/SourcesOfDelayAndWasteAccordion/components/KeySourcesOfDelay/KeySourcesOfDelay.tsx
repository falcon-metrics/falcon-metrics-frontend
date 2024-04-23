import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import _ from "lodash";
import { daysToIntervalString } from "utils/daysToIntervalString";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { KeySourcesOfDelayWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";

const useStyles = makeStyles(() => ({
  title: {
    marginTop: 14,
    fontSize: 12,
    fontFamily: "Open Sans",
    color: "#32383E",
    fontWeight: "bold",
  },
  predicabilityValue: {
    fontSize: 14,
    fontFamily: "Open Sans",
    color: "#32383E",
    textAlign: "center",
    padding: "11px 8px",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    borderBottom: "1px solid #E7E7E7",
    padding: "0 4px 0 4px",
  },
  predicabilityValueContainer: {
    width: "100%",
    display: "flex",
    marginTop: 6,
  },
  firstColumn: {
    width: "502px !important",
  },
  leftColumn: {
    width: 402,
    display: "flex",
    justifyContent: "flex-start",
  },
  rightColumn: {
    width: 120,
  },
}));

type Props = {
  isLoading: boolean;
  data?: KeySourcesOfDelayWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const KeySourcesOfDelay = ({
  isLoading,
  data,
  widgetInfo,
  isEmpty,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const classes = useStyles();
  // Sort by average of days and then by percentage
  // Select the top 3
  const steps = _.chain(data?.keySourcesOfDelayData ?? [])
    .sortBy(["averageOfDays", "percentage"])
    .reverse()
    .slice(0, 3)
    .value();

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Top Wait Steps"
        isWideCard={true}
        isEmpty={!isLoading && (isEmpty || data === undefined)}
        widgetInfo={!isLoading ? widgetInfo : []}
        isDashboardEdit={isDashboardEdit}
      >
        <Box pl={2} pr={2} height={200} width={"100%"}>
          <Box className={classes.titleContainer}>
            <Typography
              className={`${classes.title} ${classes.leftColumn} ${classes.firstColumn}`}
            >
              Stage
            </Typography>
            <Typography className={`${classes.title} ${classes.rightColumn}`}>
              Avg Days
            </Typography>
            <Typography
              className={`${classes.title} ${classes.rightColumn}`}
              style={{ marginLeft: 10 }}
            >
              Percentage
            </Typography>
          </Box>
          {!isLoading
            ? steps.map((keySourceItem, key) => {
                return (
                  <Box
                    className={classes.predicabilityValueContainer}
                    key={key}
                  >
                    <Typography
                      className={`${classes.predicabilityValue} ${classes.leftColumn}`}
                    >
                      {keySourceItem?.state}
                    </Typography>
                    <Typography
                      className={`${classes.predicabilityValue} ${classes.rightColumn}`}
                    >
                      {keySourceItem &&
                      typeof keySourceItem.averageOfDays === "number"
                        ? daysToIntervalString(keySourceItem.averageOfDays)
                        : ""}
                    </Typography>
                    <Typography
                      className={`${classes.predicabilityValue} ${classes.rightColumn}`}
                    >
                      {keySourceItem?.percentage
                        ? `${(keySourceItem?.percentage || 0).toFixed(0)}%`
                        : "-"}
                    </Typography>
                  </Box>
                );
              })
            : null}
          {isLoading && !data?.keySourcesOfDelayData ? (
            <Box>
              <Box className={classes.predicabilityValueContainer}>
                <Typography
                  className={`${classes.predicabilityValue} ${classes.leftColumn}`}
                >
                  <Skeleton width={69} height={10} variant="text" />
                </Typography>
                <Typography
                  className={`${classes.predicabilityValue} ${classes.rightColumn}`}
                >
                  <Skeleton
                    width={30}
                    height={10}
                    style={{ marginLeft: 20 }}
                    variant="text"
                  />
                </Typography>
                <Typography
                  className={`${classes.predicabilityValue} ${classes.rightColumn}`}
                >
                  <Skeleton
                    width={30}
                    height={10}
                    style={{ marginLeft: 20 }}
                    variant="text"
                  />
                </Typography>
              </Box>
              <Box className={classes.predicabilityValueContainer}>
                <Typography
                  className={`${classes.predicabilityValue} ${classes.leftColumn}`}
                >
                  <Skeleton width={105} height={10} variant="text" />
                </Typography>
                <Typography
                  className={`${classes.predicabilityValue} ${classes.rightColumn}`}
                >
                  <Skeleton
                    width={30}
                    height={10}
                    style={{ marginLeft: 20 }}
                    variant="text"
                  />
                </Typography>
                <Typography
                  className={`${classes.predicabilityValue} ${classes.rightColumn}`}
                >
                  <Skeleton
                    width={30}
                    height={10}
                    style={{ marginLeft: 20 }}
                    variant="text"
                  />
                </Typography>
              </Box>
              <Box className={classes.predicabilityValueContainer}>
                <Typography
                  className={`${classes.predicabilityValue} ${classes.leftColumn}`}
                >
                  <Skeleton width={132} height={10} variant="text" />
                </Typography>
                <Typography
                  className={`${classes.predicabilityValue} ${classes.rightColumn}`}
                >
                  <Skeleton
                    width={30}
                    height={10}
                    style={{ marginLeft: 20 }}
                    variant="text"
                  />
                </Typography>
                <Typography
                  className={`${classes.predicabilityValue} ${classes.rightColumn}`}
                >
                  <Skeleton
                    width={30}
                    height={10}
                    style={{ marginLeft: 20 }}
                    variant="text"
                  />
                </Typography>
              </Box>
            </Box>
          ) : null}
        </Box>
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Top Wait Steps" hideWidgetInfo isWideCard={true}>
        <Box pl={2} pr={2} height={200} width={540}>
          <Box className={classes.titleContainer}>
            <Typography
              className={`${classes.title} ${classes.leftColumn} ${classes.firstColumn}`}
            >
              Stage
            </Typography>
            <Typography className={`${classes.title} ${classes.rightColumn}`}>
              Avg Days
            </Typography>
            <Typography
              className={`${classes.title} ${classes.rightColumn}`}
              style={{ marginLeft: 10 }}
            >
              Percentage
            </Typography>
          </Box>

          <Box className={classes.predicabilityValueContainer}>
            <Typography
              className={`${classes.predicabilityValue} ${classes.leftColumn}`}
            >
              Waiting
            </Typography>
            <Typography
              className={`${classes.predicabilityValue} ${classes.rightColumn}`}
            >
              2
            </Typography>
            <Typography
              className={`${classes.predicabilityValue} ${classes.rightColumn}`}
            >
              90%
            </Typography>
          </Box>
        </Box>
      </IndicatorCard>
    );
  }
};
