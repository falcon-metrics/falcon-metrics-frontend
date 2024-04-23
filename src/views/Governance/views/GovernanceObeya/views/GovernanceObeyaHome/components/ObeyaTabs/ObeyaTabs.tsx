import './style.css';

import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: 0,
      background: '#fff',
      height: 32,
      borderRadius: 20,
    },
    defaultContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 32,
      marginBottom: 12,
      fontSize: 14,
      fontSeight: 600,
      color: 'rgb(50, 49, 48)',
      background: '#fff',
      borderRadius: 16,
      fontFamily: 'Open Sans',
    },
    left: {
      justifyContent: 'flex-start',
    },
    center: {
      justifyContent: 'center',
    },
    end: {
      justifyContent: 'flex-end',
    },
    tab: {
      '& > span': {
        fontFamily: 'Open Sans',
        paddingLeft: 15,
        paddingRight: 15,
      },
    },
  }),
);

type TabItem = {
  value: string;
  label: string;
  selected: boolean;
};

type Props = {
  activeTab: string;
  onChangeTab: (selectedKey) => void;
  containerStyles?: string;
  wrapperStyles?: string;
  tabs: TabItem[];
  align?: 'left' | 'center' | 'end';
};

const ObeyaTabs = ({
  activeTab,
  onChangeTab,
  containerStyles,
  wrapperStyles,
  tabs = [],
  align = 'left',
}: Props) => {
  const classes = useStyles();

  return (
    <div
      className={`obeya-tab-container ${classes.defaultContainer} ${classes[align]} ${containerStyles}`}
    >
      <Paper className={`${classes.root} ${wrapperStyles}`} elevation={0}>
        <Tabs
          value={activeTab}
          onChange={(_e, value) => onChangeTab(value)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          {tabs.map((config: TabItem, index) => (
            <Tab
              key={index}
              selected={config.selected}
              label={config.label}
              value={config.value}
              className={classes.tab}
            />
          ))}
        </Tabs>
      </Paper>
    </div>
  );
};

export default ObeyaTabs;
