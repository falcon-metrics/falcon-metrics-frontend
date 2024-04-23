import { Box, Paper, Typography } from '@material-ui/core';

import TrafficLights, {
  LightTypes,
} from 'views/ValueStreamManagement/components/TrafficLights';
import IndicatorNoDataPanel from './components/IndicatorNoDataPanel/IndicatorNoDataPanel';

import { useStyles } from './IndicatorCard.styles';
import ExtendedTooltip from 'views/ValueStreamManagement/components/ExtendedTooltip';
import { WidgetInformation } from '../../interfaces/common';
import DrillDown from 'views/ValueStreamManagement/components/DrillDown';
import { IndustryStandard } from 'views/ValueStreamManagement/components/IndustryStandard/IndustryStandard';

type IndicatorCardProps = {
  title: string;
  children: React.ReactNode;
  trafficLight?: LightTypes;
  isEmpty?: boolean;
  isWideCard?: boolean;
  widgetInfo?: WidgetInformation[];
  hideWidgetInfo?: boolean;
  isLoading?: boolean;
  isVisible?: boolean;
  tabViewTitles?: string[];
  tabComponents?: React.ReactNode[];
  customProps?: any;
  onClick?: (boolean) => void;
  isIndustryStandardVisible?: boolean;
  industryStandardContent?: string;
  isDashboardEdit?: boolean;
};

const IndicatorCard = ({
  title,
  trafficLight,
  isEmpty,
  children,
  isWideCard,
  widgetInfo,
  hideWidgetInfo,
  tabComponents,
  isLoading,
  isVisible = false,
  tabViewTitles = [],
  customProps,
  onClick,
  isIndustryStandardVisible = false,
  industryStandardContent = '',
  isDashboardEdit = false
}: IndicatorCardProps) => {
  const classes = useStyles();

  const cardSizeClass = isWideCard
    ? 'fixed-2-chart-widget'
    : 'fixed-1-chart-widget';

  const activeTrafficLight: LightTypes | undefined = trafficLight && isEmpty
    ? LightTypes.GRAY
    : trafficLight;

  return (
    <Paper className={`${classes.root} ${cardSizeClass}`}>
      <Typography className={classes.cardTitle}>
        {title}
      </Typography>
      {activeTrafficLight && <TrafficLights activeLight={activeTrafficLight} />}
      <Box>
        {isEmpty
          ? <IndicatorNoDataPanel />
          : <>{children}</>
        }
        {!isDashboardEdit && isVisible ?
          <div>
            {!isDashboardEdit && widgetInfo?.length !== 0 ? <ExtendedTooltip maxWidth="sm" content={widgetInfo} orientation="left" /> : <></>}
            {!isLoading ?
              isIndustryStandardVisible ?
                <div>
                  <DrillDown
                    tabViewTitles={tabViewTitles}
                    tabComponents={tabComponents || []}
                    customProps={customProps}
                    widgetName={title || ""}
                    onClick={onClick}
                  /> <IndustryStandard content={industryStandardContent}></IndustryStandard>
                </div> :
                <DrillDown
                  tabViewTitles={tabViewTitles}
                  tabComponents={tabComponents || []}
                  customProps={customProps}
                  widgetName={title || ""}
                  onClick={onClick}
                /> : <></>
            }
          </div> :
          <div>
            {!isDashboardEdit && !hideWidgetInfo && widgetInfo?.length !== 0 ? <ExtendedTooltip maxWidth="sm" content={widgetInfo} orientation="right" /> : <></>}
          </div>
        }
      </Box>
    </Paper>
  );
};

export default IndicatorCard;
