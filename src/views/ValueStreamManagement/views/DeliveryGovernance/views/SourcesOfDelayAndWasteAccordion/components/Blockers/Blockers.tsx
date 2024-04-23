import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import TrafficLights, { LightTypes } from "views/ValueStreamManagement/components/TrafficLights";
import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import { getTrafficLightColorByPattern } from "views/ValueStreamManagement/components/TrafficLights/getTrafficLightColorByPattern";
import { BlockersWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/sourceOfDelay";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import {
  BlockersTabComponents,
  BlockersTabComponentsWithoutReason,
  BlockersTabs,
  BlockersTabsWithoutReason,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";

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
    marginBottom: 34,
  },
}));

type KPIProps = {
  staleWork?: number;
};

const KPIView = ({ staleWork = 0 }: KPIProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.kpiContainer}>
      <Typography className={classes.kpiValue}>
        {staleWork ? staleWork : 0}
      </Typography>
    </Box>
  );
};

type Props = {
  isLoading: boolean;
  data?: BlockersWidgetData;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  customProps?: any;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const Blockers = ({
  data,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const styles = useStyles();

  if (!isWidgetPreview) {
    const activeLight = getTrafficLightColorByPattern(data?.pattern);
    const tabComponents: React.ReactNode[] = customProps.data
      ? BlockersTabComponents
      : BlockersTabComponentsWithoutReason;
    const tabViewTitles = customProps.data
      ? BlockersTabs
      : BlockersTabsWithoutReason;

    return (
      <IndicatorCard
        title="Impediments"
        trafficLight={activeLight}
        isEmpty={!isLoading && (isEmpty || data === undefined)}
        widgetInfo={!isLoading ? widgetInfo : []}
        isVisible={true}
        tabComponents={tabComponents}
        tabViewTitles={tabViewTitles}
        customProps={customProps}
        isLoading={isLoading}
        isDashboardEdit={isDashboardEdit}
      >
        {isLoading && !data?.count ? (
          <Box mt={2}>
            <DefaultSkeleton />
          </Box>
        ) : null}
        {!isLoading ? (
          <Box className={styles.contentContainer}>
            <Typography className={styles.subtitle}>
              Currently there are
            </Typography>
            <TrafficLights activeLight={activeLight} />
            <KPIView staleWork={data?.count} />
            <Box display="flex" alignSelf="left" flexDirection="column">
              <Typography className={styles.footer}>
                flow items blocked
              </Typography>
            </Box>
          </Box>
        ) : null}
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Impediments" hideWidgetInfo>
        <Box className={styles.contentContainer} width={220}>
          <Typography className={styles.subtitle}>
            Currently there are
          </Typography>
          <TrafficLights activeLight={LightTypes.GREEN} />
          <KPIView staleWork={0} />
          <Box display="flex" alignSelf="left" flexDirection="column">
            <Typography className={styles.footer}>
              flow items blocked
            </Typography>
          </Box>
        </Box>
      </IndicatorCard>
    );
  }
};
