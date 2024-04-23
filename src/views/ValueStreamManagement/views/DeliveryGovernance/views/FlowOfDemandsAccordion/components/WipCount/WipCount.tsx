import { Box, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  WipTabComponents,
  WipTabs,
} from "views/ValueStreamManagement/components/DrillDown/TabSettings";

import DefaultSkeleton from "views/ValueStreamManagement/views/DeliveryGovernance/components/DefaultSkeleton";
import IndicatorCard from "views/ValueStreamManagement/views/DeliveryGovernance/components/IndicatorCard/IndicatorCard";
import { WidgetInformation } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/common";
import { WipCountWidgetData } from "views/ValueStreamManagement/views/DeliveryGovernance/interfaces/flowOfDemands";
import { isWipCountEmpty } from "views/ValueStreamManagement/views/DeliveryGovernance/utils/validation/isFlowOfDemandsDataEmpty";

import { skeletonProps } from "../../utils";

const useStyles = makeStyles(() => ({
  mainContainer: {
    height: 175,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
  contentContainer: {
    width: "100%",
    fontFamily: "Open Sans",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  kpiContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 250,

    "&:hover": {
      backgroundColor: "#f4f4f4",
      width: "auto",
      padding: "0 10px",
    },
  },
  kpiValue: {
    fontSize: 54,
    fontFamily: "Open Sans",
    fontWeight: "bold",
    color: "#32383E",
    textAlign: "center",
    textDecoration: "underline dashed #d0d0d0 1px",
    textUnderlineOffset: "10px",
  },
  description: {
    fontSize: 16,
    fontFamily: "Open Sans",
    fontWeight: "normal",
    color: "#32383E",
    alignSelf: "flex-end",
    marginBottom: 14,
    marginLeft: 12,
  },
  footer: {
    color: "rgba(50, 56, 62, 1)",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Open Sans",
    fontWeight: 400,
    lineHeight: "20px",
    letterSpacing: "0em",
  },
  tooltip: {
    backgroundColor: "#fff",
    border: "1px solid #E6E8ED",
    color: "rgba(50, 56, 62, 1)",
    margin: "-10px 0",
  },
  arrow: {
    "&:before": {
      border: "1px solid #E6E8ED",
    },
    color: "#fff",
  },
}));

type KPIProps = {
  wipCount: number;
  isLoading?: boolean;
  assigneesCount: number;
  unassignedItems: number;
  avgWipCount: number;
};

const KPIView = ({
  wipCount,
  isLoading,
  assigneesCount,
  unassignedItems,
  avgWipCount,
}: KPIProps) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box display="flex">
        <Box className={classes.contentContainer}>
          <DefaultSkeleton {...skeletonProps} />
        </Box>
      </Box>
    );
  }

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.contentContainer}>
        <Box className={classes.kpiContainer}>
          <Typography className={classes.kpiValue}>
            <Tooltip
              title={
                <span>
                  {" "}
                  Unique assignees: <b>{assigneesCount.toFixed(0)}</b>
                  {unassignedItems ? (
                    <>
                      <br />
                      Unassigned items: <b>{unassignedItems.toFixed(0)}</b>
                    </>
                  ) : null}
                </span>
              }
              placement="top-start"
              arrow
              classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
            >
              <span>{wipCount ? wipCount.toFixed(0) : null}</span>
            </Tooltip>
          </Typography>
          {wipCount ? (
            <Typography className={classes.description}>flow items</Typography>
          ) : null}
        </Box>
      </Box>
      {avgWipCount ? (
        <>
          <Typography className={classes.footer}>
            ( Avg. of {avgWipCount.toFixed(0)} flow items per person )
          </Typography>
        </>
      ) : null}
    </Box>
  );
};

type Props = {
  data?: WipCountWidgetData;
  widgetInfo?: WidgetInformation[];
  isLoading: boolean;
  isEmpty?: boolean;
  customProps?: any;
  isDashboardEdit?: boolean;
  isWidgetPreview?: boolean;
};

export const WipCount = ({
  data,
  widgetInfo,
  isLoading,
  isEmpty,
  customProps,
  isDashboardEdit,
  isWidgetPreview,
}: Props) => {
  const tabComponents: React.ReactNode[] = WipTabComponents;

  if (!isWidgetPreview) {
    return (
      <IndicatorCard
        title="Work in Progress Count"
        isEmpty={!isLoading && (isEmpty || isWipCountEmpty(data))}
        widgetInfo={!isLoading ? widgetInfo : []}
        isVisible={true}
        tabComponents={tabComponents}
        tabViewTitles={WipTabs}
        customProps={customProps}
        isLoading={isLoading}
        isDashboardEdit={isDashboardEdit}
      >
        <KPIView
          wipCount={data?.count || 0}
          isLoading={isLoading}
          assigneesCount={data?.assigneesCount || 0}
          unassignedItems={data?.unassignedItems || 0}
          avgWipCount={data?.avgWipCount || 0}
        />
      </IndicatorCard>
    );
  } else {
    return (
      <IndicatorCard title="Work in Progress Count" hideWidgetInfo>
        <Box width={220}>
          <KPIView
            wipCount={10}
            isLoading={isLoading}
            assigneesCount={5}
            unassignedItems={0}
            avgWipCount={2}
          />
        </Box>
      </IndicatorCard>
    );
  }
};
