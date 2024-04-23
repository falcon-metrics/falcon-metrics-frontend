import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import { AggregationKey, getAggregationQueryParam } from 'views/ValueStreamManagement/views/DeliveryManagement/utils/aggregation';
import { Tooltip } from '@material-ui/core';
import { getProductivityColor, getProductivityTooltipByAggregation } from 'views/ValueStreamManagement/components/SkeletonHeatMap/customizations';
import { ProductivityMaxHistoricalView } from './HistoricalViewMaximized';

interface PageProps {
  data?: Array<Array<any>>;
}

const useStyles = makeStyles(() => ({
  contentContainer: {
    height: 90,
    width: 240,
    overflowY: 'auto',
    marginTop: 40,
    bottom: 0,
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
  heatMapWrapper: {
    display: "flex", 
    flexDirection: "row", 
    flexFlow: "wrap", 
    userSelect: "none",
    justifyContent: "center",
    alignItems: "center",
  },
  heatMapItems: {
    flex: "1 20px",
    borderRadius: "3px", 
    height: "15px", 
    margin: "2px"
  },
  filler: {
    flex: "1 20px",
    borderRadius: "3px", 
    height: "15px", 
    margin: "2px",
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
  
  // get max count of itemslength per row
  const filler = (data?.length || 0) > 9 ? 
    ((data?.length || 0) % 9 !== 0 ? (9 - ((data?.length || 0) % 9)) : data?.length || 0) : 0;
  
  const arr = filler > 0 ? new Array(filler).fill("&nbsp;") : [];

  const { selectedFilters } = useFilterPanelContext();
  const aggregation = selectedFilters['currentDataAggregation'];
  const aggregationQueryParam: AggregationKey = getAggregationQueryParam(
    aggregation
  );

  const tooltipLabel: string = getProductivityTooltipByAggregation(
    aggregationQueryParam,
  );

  return (
    <Box className={classes.heatMapWrapper}>
         {data?.map((item : any, index) => {
          let tooltip: string = tooltipLabel.replace('%t', item[2]).replace('%kt', item[0]);
          const color: string = getProductivityColor(item[2]);
          
          if (item[2] === "No work completed")
            tooltip = tooltip.replace("Productivity was ", "");

          return (
            <Tooltip 
              title={tooltip}
              key={index}
              placement="bottom-end" 
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
  productivityHistoricalChart?: [string, number, string][];
};

export const HistoricalView = ({ productivityHistoricalChart }: HistoricalViewProps) => {
  const classes = useStyles();
  
  return (
    <div className={classes.modalBody}>
      <ProductivityMaxHistoricalView
        productivityHistoricalChart={productivityHistoricalChart}
      />
    </div>
  );
};
