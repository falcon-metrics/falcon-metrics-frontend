import { makeStyles } from "@material-ui/styles";
// import InsertChartOutlinedRoundedIcon from '@material-ui/icons/InsertChartOutlinedRounded';
import BaseModal from "components/UI/BaseModal/BaseModal2";
import Box from '@material-ui/core/Box';
import { ChartBar } from '../ChartBar/ChartBar';
import { styled } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  // icon wrapper
  sm: {
    right: 10,
    display: 'flex',
    position: 'absolute',
    bottom: 10,
  },
  chartIcon: {
    color: '#555D62',
    cursor: 'pointer',
    transition: 'transform 300ms',
    
    "&:hover" : {
      color: '#0077C8',
      transform: 'translateY(-5px)'
    }
  },
  closeIcon: {
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 300ms',
    fontSize: '18px',

    "&:hover" : {
      transform: 'translateY(-3px)'
    }
  },
  modalTitle: {
    display: 'flex',
    position: 'absolute',
    fontFamily: "Open Sans",
    fontSize: '20px',
    textAlign: 'left',
    fontWeight: 400,
    paddingTop: 15,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  modalBody: {
    paddingTop: 50,
    padding: 10,
    width: "100%"
  },
  metricName: {
    fontFamily: 'Open Sans',
    color: 'rgba(0, 0, 0, 0.87)',
    marginTop: 10,
  },
  description: {
    marginTop: 22,
  },
  wrapperModal: {
    padding: '10px 0',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  chartBarsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 30,
    height: 250
  },
  chartContainer: {
    height: 180,
    width: 120,
    fontFamily: 'Open Sans',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  chartBarLegend: {
    fontFamily: 'Open Sans',
    color: '#84858c',
  },
  customModalTitle: {
    marginTop: 20,
  }
}));

type Props = { 
  onClick: (row: any) => void;
  isOpenIndustryModal: boolean;
}

type ChartBarProps = {
  boxValue: string;
  legend: string;
  target: [number];
  benchmarking: [number];
};

const ChartBars = ({ legend, boxValue, benchmarking, target }: ChartBarProps) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.chartContainer}
      style={{
        width: 190,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ChartBar
        firstSerieData={benchmarking}
        boxValue={boxValue}
        firsSerieName="Bottom"
        firstSerieColor="#7fe4df"
        secondSerieData={target}
        secondSerieName="Quarter"
        secondSerieColor="#66c4eb"
        currentDataAggregation="weeks"
      />
      <span className={classes.chartBarLegend}>{legend}</span>
    </Box>
  );
};

export const Text = styled(Box)({
  fontSize: 16,
  fontFamily: 'Open Sans',
});

export const ContentInfo = styled(Box)({
  fontSize: 16,
  fontFamily: 'Open Sans',
});

const IndustryAnalysisModal = ({
  onClick,
  isOpenIndustryModal
} : Props) => {
  const classes = useStyles();

  const Title = (
    <Box className={classes.customModalTitle}>
      <Text>Industry Analysis for <b>Customer Journey Value Stream</b></Text>
      <ContentInfo
        className={classes.metricName}
      >
        Metric: Fitnes Level
      </ContentInfo>
    </Box>
  );

  return (
    <Box className={classes.sm}>
      <BaseModal
        maxWidth="sm"
        open={isOpenIndustryModal}
        setOpen={onClick}
        title={Title}
      >
        <Box className={classes.wrapperModal}>
          <ContentInfo className={classes.description}>
            Reading: 61% (32 %tile, ahead of 68% of the industry)
          </ContentInfo>
          <ContentInfo>
            Industry Benchmarking: 78%
          </ContentInfo>
          <Box className={classes.chartBarsWrapper}>
            <ChartBars legend="Bottom quarter" boxValue="30%" benchmarking={[2]} target={[25]} />
            <ChartBars legend="Middle quarters" boxValue="50%" benchmarking={[11]} target={[25]} />
            <ChartBars legend="Middle quarters" boxValue="90%" benchmarking={[30]} target={[25]} />
            <ChartBars legend="Top quarter" boxValue="16%" benchmarking={[57]} target={[25]} />
          </Box>

        </Box>
      </BaseModal>   
      {/* <InsertChartOutlinedRoundedIcon 
        className={classes.chartIcon} 
      /> */}
    </Box>
  );
}

export default IndustryAnalysisModal;
