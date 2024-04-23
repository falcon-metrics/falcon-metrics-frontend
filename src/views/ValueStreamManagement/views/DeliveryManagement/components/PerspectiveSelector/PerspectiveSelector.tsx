import { Paper, Tab, Tabs, Divider, Box} from '@material-ui/core';
import './PerspectiveSelector.styles.css';
import useStyles from './PerspectiveSelector.styles';

interface Props {
  selectedPerspective: string;
  setSelectedPerspective: (selectedKey: string) => void;
}

const PerspectiveSelector = ({
  selectedPerspective,
  setSelectedPerspective,
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={`view-by-container`}>
      <Box className={classes.tabGroup}>
        <Paper className={`${classes.root}`} elevation={0}>
          <Tabs
            value={selectedPerspective}
            onChange={(_e, value) => setSelectedPerspective(value)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab selected label="Smart Board" value={'board'} />
          </Tabs>
        </Paper>
      </Box>
      <Divider orientation="vertical"/>
      <Paper className={`${classes.root}`} elevation={0}>
        <Tabs
          value={selectedPerspective}
          onChange={(_e, value) => setSelectedPerspective(value)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab selected label="Completed Work" value={'past'} />
          <Tab label="Work In Progress" value={'present'} />
          <Tab label="Upcoming Work" value={'future'} />
        </Tabs>
      </Paper>
    </Box>
  );
};

export default PerspectiveSelector;
