import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import { getTrafficLightColorByPattern } from "views/ValueStreamManagement/components/TrafficLights/getTrafficLightColorByPattern";
import { FlowDebtWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 200,
    display: "flex",
    fontFamily: "Open Sans",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  kpiContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: 100,
  },
  kpiValue: {
    fontSize: 54,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: "#32383E",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    fontFamily: "Open Sans",
    fontWeight: "normal",
    color: "#32383E",
  },
  footer: {
    fontSize: 12,
    fontFamily: "Open Sans",
    fontWeight: "normal",
    color: "#32383E",
    display: "flex",
    alignSelf: "left",
  },
}));

type KPIProps = {
  flowDebt?: number;
};

const KPIView = ({ flowDebt = 0 }: KPIProps) => {
  const classes = useStyles();
  return (
    <Box display="flex">
      <Box className={classes.kpiContainer}>
        <Typography className={classes.kpiValue}>
          {flowDebt ? `${flowDebt.toFixed(1)}x` : "0x"}
        </Typography>
      </Box>
    </Box>
  );
};

type Props = {
  isLoading: boolean;
  data?: FlowDebtWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const FlowDebt = ({
  isLoading,
  data,
  widgetInfo,
  isEmpty,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const styles = useStyles();
  const activeLight = getTrafficLightColorByPattern(data?.pattern);

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Productivity Debt"
        trafficLight={activeLight}
        isEmpty={!isLoading && (isEmpty || data === undefined)}
        widgetInfo={!isLoading ? widgetInfo : []}
        isDashboardEdit={isDashboardEdit}
      >
        {isLoading && !data?.value ? (
          <Box mt={2}>
            <DefaultSkeleton />
          </Box>
        ) : null}
        {!isLoading ? (
          <Box className={styles.contentContainer}>
            <Typography className={styles.subtitle}>
              Process is currently operating
              <br />
              at a degraded state of
            </Typography>
            <KPIView flowDebt={data?.value} />
            <Box display="flex" alignSelf="left" flexDirection="column">
              <Typography className={styles.footer}>
                <b>Lead Time (85th %ile):</b> &nbsp;{" "}
                {data?.leadtimePercentile85th || 0}&nbsp; days
              </Typography>
              <Typography className={styles.footer}>
                <b>WIP Age (85th %ile) :</b> &nbsp;{" "}
                <span style={{ marginLeft: 12 }}>
                  {data?.wipAgePercentile85th || 0}&nbsp; days
                </span>
              </Typography>
            </Box>
          </Box>
        ) : null}
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Productivity Debt" hideWidgetInfo>
        <Box className={styles.contentContainer} width={220}>
          <Typography className={styles.subtitle}>
            Process is currently operating
            <br />
            at a degraded state of
          </Typography>
          <KPIView flowDebt={1} />
          <Box display="flex" alignSelf="left" flexDirection="column">
            <Typography className={styles.footer}>
              <b>Lead Time (85th %ile):</b> &nbsp; {0}&nbsp; days
            </Typography>
            <Typography className={styles.footer}>
              <b>WIP Age (85th %ile) :</b> &nbsp;{" "}
              <span style={{ marginLeft: 12 }}>{0}&nbsp; days</span>
            </Typography>
          </Box>
        </Box>
      </IndicatorCard>
    );
  }
};
