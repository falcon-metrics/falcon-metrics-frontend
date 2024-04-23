import { Box, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import {
  SpeedCriterion,
  SpeedValues,
} from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/fitnessCriteria";
import {
  LeadTimeTabComponents,
  LeadTimeTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 200,
    width: "100%",
    fontFamily: "Open Sans",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    width: "100%",
    textAlign: "left",
    marginTop: 15,
    marginBottom: 6,
    color: "#32383E",
    fontSize: 12,
    fontFamily: "Open Sans",
  },
  kpiContainer: {
    padding: 10,

    "&:hover": {
      backgroundColor: "#f4f4f4",
      width: "auto",
    },
  },
  kpiValue: {
    fontSize: 20,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: "#32383E",
    textAlign: "left",
    textDecoration: "underline dashed #d0d0d0 1px",
    textUnderlineOffset: "10px",
  },
  footer: {
    color: "#32383E",
    fontSize: 12,
    textAlign: "right",
    marginRight: 30,
    fontFamily: "Open Sans",
  },
  tooltip: {
    backgroundColor: "#fff",
    border: "1px solid #E6E8ED",
    color: "rgba(50, 56, 62, 1)",
    margin: "-50px 0",
    width: 130,
    padding: 5,
    fontSize: 14,
    textAlign: "center",
  },
  arrow: {
    "&:before": {
      border: "1px solid #E6E8ED",
    },
    color: "#fff",
  },
}));

type KPIProps = {
  portfolioSpeed?: SpeedValues;
  teamSpeed?: SpeedValues;
  icSpeed?: SpeedValues;
  isLoading: boolean;
};

const LevelDetails = (props: {
  level: 'Portfolio' | 'Team' | 'IC';
  percentile85th: number;
  average: number;
  tail: number;
  median: number;
}) => {
  const classes = useStyles();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        className={classes.kpiContainer}
      >
        <Box
          style={{
            color: "rgba(50, 56, 62, 0.4)",
            fontSize: 12,
            fontFamily: "Open Sans",
            marginTop: 5,
          }}
        >
          {props.level}
        </Box>
        <Typography className={classes.kpiValue}>
          <Tooltip
            title={
              <span>
                Median:{" "}
                <b>
                  {props?.median
                    ? props?.median + ` days`
                    : "-"}
                </b>{" "}
                <br />
                Average:{" "}
                <b>
                  {props?.average
                    ? props?.average + ` days`
                    : "-"}
                </b>{" "}
                <br />
                98th %ile:{" "}
                <b>
                  {props?.tail ? props?.tail + ` days` : "-"}
                </b>
              </span>
            }
            placement="top-start"
            arrow
            classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
          >
            <span>
              {props?.percentile85th
                ? `${props.percentile85th}`
                : "-"}
              <span style={{ fontSize: 14, fontFamily: "Open Sans" }}>
                {" "}
                {props?.percentile85th ? `days` : ``}
              </span>
            </span>
          </Tooltip>
        </Typography>
      </Box>
    </>
  );
};

const KPIView = ({ portfolioSpeed, teamSpeed, icSpeed, isLoading }: KPIProps) => {
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
          <>
            <Typography className={classes.description}>
              This process delivers items in up to
            </Typography>
            <Box
              display="flex"
              style={{ justifyContent: "left", alignItems: "left" }}
            >
              {
                portfolioSpeed
                  ? <LevelDetails level={"Portfolio"} {...portfolioSpeed} />
                  : <></>
              }
              {
                teamSpeed
                  ? <LevelDetails level={"Team"} {...teamSpeed} />
                  : <></>
              }
              {
                icSpeed
                  ? <LevelDetails level={"IC"} {...icSpeed} />
                  : <></>
              }
            </Box>
            <Typography className={classes.footer}>85% of the time</Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

type Props = {
  isLoading: boolean;
  speed?: SpeedCriterion;
  widgetInfo?: WidgetInformation[];
  isEmpty?: boolean;
  customProps?: any;
  onClick?: (boolean) => void;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const Speed = ({
  speed,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  onClick,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const portfolioSpeed = speed?.portfolio;
  const teamSpeed = speed?.team;
  const icSpeed = speed?.ic;

  const tabComponents: React.ReactNode[] = LeadTimeTabComponents;
  
  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Lead Time"
        isEmpty={!isLoading && (isEmpty || speed === undefined)}
        isLoading={isLoading}
        customProps={customProps}
        tabViewTitles={LeadTimeTabs}
        tabComponents={tabComponents}
        widgetInfo={!isLoading ? widgetInfo : []}
        onClick={onClick}
        isVisible={true}
        isIndustryStandardVisible={true}
        industryStandardContent={speed?.industryStandardMessage}
        isDashboardEdit={isDashboardEdit}
      >
        <KPIView
          isLoading={isLoading}
          portfolioSpeed={portfolioSpeed}
          teamSpeed={teamSpeed}
          icSpeed={icSpeed}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Lead Time" hideWidgetInfo>
        <Box width={220}>
          <KPIView
            isLoading={isLoading}
            portfolioSpeed={{
              percentile85th: 14,
              median: 0,
              average: 0,
              tail: 0,
            }}
            teamSpeed={{ percentile85th: 7, median: 0, average: 0, tail: 0 }}
            icSpeed={{ percentile85th: 3, median: 0, average: 0, tail: 0 }}
          />
        </Box>
      </IndicatorCard>
    );
  }
};
