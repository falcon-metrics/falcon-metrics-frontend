import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { SummaryPeriods } from 'components/PeriodSelectorProvider/PeriodSelectorProvider';
import './PeriodSelector.styles.css';
import useStyles from './PeriodSelector.styles';

interface Props {
  selectedPeriod: SummaryPeriods;
  setSelectedPeriod: (selectedKey: SummaryPeriods) => void;
  containerStyles?: string;
  wrapperStyles?: string;
}

const PeriodSelector = ({
  selectedPeriod,
  setSelectedPeriod,
  containerStyles,
  wrapperStyles,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={`view-by-container ${containerStyles}`}>
      <Paper className={`${classes.root} ${wrapperStyles}`} elevation={0}>
        <Tabs
          value={selectedPeriod}
          onChange={(_e, value) => setSelectedPeriod(value)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab selected label="Completed Work" value={SummaryPeriods.PAST} />
          <Tab label="Work In Progress" value={SummaryPeriods.PRESENT} />
          <Tab label="Upcoming Work" value={SummaryPeriods.FUTURE} />
        </Tabs>
      </Paper>
    </div>
  );
};

export default PeriodSelector;
