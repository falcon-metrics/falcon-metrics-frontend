import { useMemo } from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import { AggregationKey, getAggregationQueryParam } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';
import { Tooltip } from '@material-ui/core';
import { getPredictabilityColor, getPredictabilityTooltipByAggregation } from 'views/ValueStreamManagement/components/SkeletonHeatMap/customizations';
import { LeadTimeMaxHistoricalView } from './LeadTimeMaxHistoricalView';

interface PageProps {
  data?: Array<Array<any>>;
}

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 50,
    width: 240,
    overflowY: 'auto',
    padding: "5px",
    
    '&::-webkit-scrollbar': {
      width: '0.7em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#d1d2d3',
      borderRadius: '10px',
    }
  },
  tooltip: {
    fontFamily: 'Open Sans',
    backgroundColor: '#fff',
    border: '1px solid #e3e3e3',
    color: 'rgba(50, 56, 62, 1)',
    margin: '10px 0',
    fontColor: '#707070',
    fontSize: '12px',
    padding: '8px',
    shadow: false,
    borderColor: '#e3e3e3',
    borderRadius: 0
  },
  arrow: {
    "&:before": {
      border: "1px solid #E6E8ED"
    },
    color: '#fff'
  },
  heatMapItems: {
    flex: "1 14px",
    borderRadius: "3px", 
    height: "10px", 
    margin: "1px"
  },
  filler: {
    flex: "1 14px",
    borderRadius: "3px", 
    height: "10px", 
    margin: "1px",
    color: "#fff"
  },
  relativeContainer: {
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    top: 5,
    zIndex: 1,
  },
  modalBody: {
    padding: 10,
    width: "99%"
  }
}));

export const HistoricalChart = ({ data }: PageProps) => {
  const classes = useStyles();
  
  const filler = (data?.length || 0) > 14 ? 
    ((data?.length || 0) % 14 !== 0 ? (14 - ((data?.length || 0) % 14)) : data?.length || 0) : 0;
  
  const arr = filler > 0 ? new Array(filler).fill("&nbsp;") : [];

  const { selectedFilters } = useFilterPanelContext();
  const aggregation = selectedFilters['currentDataAggregation'];
  const aggregationQueryParam: AggregationKey = getAggregationQueryParam(
    aggregation
  );

  const tooltipLabel: string = getPredictabilityTooltipByAggregation(
    aggregationQueryParam,
  );

  return (
    <Box
      style={{ display: "flex", flexDirection: "row", flexFlow: "wrap", userSelect: "none"}}>
        {data?.map((item : any, index) => {
          let tooltip: string = tooltipLabel.replace('%t', item[1]).replace('%kt', item[0]);
          const color: string = getPredictabilityColor(item[1]);

          if (item[1] === "-" || item[1] === "")
            tooltip = "";

          return (
            <Tooltip 
              title={tooltip}
              key={index}
              placement="top-end" 
              classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
              arrow>
              <div style={{ backgroundColor: color }} className={classes.heatMapItems}>
                &nbsp;
              </div>
            </Tooltip>
          )
        })}
        
        {/* this will occupy the empty spaces if there is a row with less than 10 items */}
        {arr && arr?.map((index) => (
          <div className={classes.filler} key={index}>&nbsp;</div>
        ))}
    </Box>
 );
}

type HistoricalViewProps = {
  leadTimeHistoricalChart?: [string, string][];
  isVisible?: boolean;
};

export const HistoricalView = (props: HistoricalViewProps) => {
  const classes = useStyles();

  const leadTimeChartFormatted = useMemo(() => 
    (props.leadTimeHistoricalChart || []).map(item => ([
      item[0],
      item?.[1] ? item?.[1] : ''
    ])), 
    [props.leadTimeHistoricalChart]
  );

  return (
    <div className={classes.modalBody}>
      <LeadTimeMaxHistoricalView
        leadTimeHistoricalChart={leadTimeChartFormatted}
        customConfig={{
          maximizeView: true
        }}
      />
    </div>
  );
};

