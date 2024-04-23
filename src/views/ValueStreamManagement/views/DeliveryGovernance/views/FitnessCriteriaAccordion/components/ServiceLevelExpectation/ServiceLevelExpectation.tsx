import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  FitnessLevelTabComponents,
  FitnessCriteriaTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";
import { LightTypes } from "views/ValueStreamManagement/components/TrafficLights";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { ServiceLevelExpectationCriterion } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 200,
    fontFamily: "Open Sans",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  description: {
    color: "#32383E",
    fontSize: 12,
    fontFamily: "Open Sans",
    minHeight: 36,
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
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  kpiValuePercent: {
    fontSize: 54,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: "#32383E",
  },
  kpiValueGrade: {
    fontSize: 12,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: "#32383E",
    marginLeft: 10,
    marginBottom: 15,
  },
  footer: {
    color: "#32383E",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Open Sans",
  },
}));

type KPIProps = {
  targetMet?: number;
  isLoading: boolean;
  grade: string;
};

const KPIView = ({ targetMet, isLoading, grade }: KPIProps) => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <Box className={classes.contentContainer}>
        {isLoading ? (
          <Box display="flex" justifyContent="center" flexDirection="column">
            <Skeleton
              width={60}
              height={30}
              style={{ marginLeft: 90, marginTop: 40 }}
              variant="text"
            />
            <br />
            <Skeleton
              width={168}
              height={14}
              style={{ marginLeft: 30, marginTop: 0 }}
              variant="text"
            />
            <Skeleton
              width={120}
              height={14}
              style={{ marginLeft: 30 }}
              variant="text"
            />
          </Box>
        ) : (
          <Box className={classes.kpiContainer}>
            <Typography className={classes.description}></Typography>
            <Typography className={classes.kpiValue}>
              <Typography className={classes.kpiValuePercent}>
                {!(targetMet === null || targetMet === undefined)
                  ? `${targetMet}%`
                  : "-"}
              </Typography>
              <Typography className={classes.kpiValueGrade}>
                {grade ? "GRADE " + grade : ""}
              </Typography>
            </Typography>
            <Typography className={classes.footer}>
              of the time this process is meeting its service level
              expectations.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const getTrafficLight = (targetMet: number): LightTypes => {
  let activeLightColor = LightTypes.GRAY;

  if (targetMet >= 85) {
    activeLightColor = LightTypes.GREEN;
  }
  if (targetMet <= 84 && targetMet >= 71) {
    activeLightColor = LightTypes.YELLOW;
  }
  if (targetMet <= 70) {
    activeLightColor = LightTypes.RED;
  }

  return activeLightColor;
};

type Props = {
  isLoading: boolean;
  sle?: ServiceLevelExpectationCriterion;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  customProps?: any;
  onClick?: (boolean) => void;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const ServiceLevelExpectation = ({
  sle,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  onClick,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const activeLight = getTrafficLight(sle?.serviceLevelExpectation || 0);
  const tabComponents: React.ReactNode[] = FitnessLevelTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Lead Time Target Met"
        isEmpty={!isLoading && (isEmpty || sle === undefined)}
        isLoading={isLoading}
        customProps={customProps}
        tabViewTitles={FitnessCriteriaTabs}
        tabComponents={tabComponents}
        trafficLight={activeLight}
        widgetInfo={!isLoading ? widgetInfo : []}
        onClick={onClick}
        isVisible={true}
        isIndustryStandardVisible={true}
        industryStandardContent={sle?.industryStandardMessage}
        isDashboardEdit={isDashboardEdit}
      >
        <KPIView
          isLoading={isLoading}
          targetMet={sle?.serviceLevelExpectation || 0}
          grade={
            sle && typeof sle.grade === "string" && sle.grade.length
              ? sle.grade
              : ""
          }
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Lead Time Target Met" hideWidgetInfo>
        <Box width={220}>
          <KPIView isLoading={isLoading} targetMet={100} grade={"A +"} />
        </Box>
      </IndicatorCard>
    );
  }
};
