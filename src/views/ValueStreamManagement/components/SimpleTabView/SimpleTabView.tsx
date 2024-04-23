import React from 'react';

import Box from '@material-ui/core/Box';
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const useTabPanelStyles = makeStyles(() => ({
  root: {
    padding: 0,
  },
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  const classes = useTabPanelStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
      className={classes.root}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

export const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

export const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: 'Open Sans, sans-serif',
      '&:hover': {
        color: '#40a9ff',
        opacity: 1,
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#40a9ff',
      },
    },
    selected: {},
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);


interface StyledTabProps {
  label: string;
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    '& .MuiTabs-flexContainer .MuiButtonBase-root': {
      marginRight: 0,
    }
  },
}));

type SimpleTabViewProps = {
  defaultActiveTab?: number;
  tabTitles: string[];
  tabContents: (JSX.Element | null)[];
};

export const SimpleTabView = ({
  defaultActiveTab = 0,
  tabTitles,
  tabContents,
}: SimpleTabViewProps) => {
  const classes = useStyles();
  const [activeTab, setValue] = React.useState(defaultActiveTab);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (tabTitles.length !== tabContents.length) {
    return <div>The number of tab titles does not match the tab content length on SimpleTabView</div>;
  }

  return (
    <div className={classes.root}>
      <AntTabs value={activeTab} onChange={handleChange}>
        {tabTitles.map((title: string, key: number) => <AntTab key={key} label={title} />)}
      </AntTabs>
      {tabContents.map(
        (component, index: number) => <TabPanel value={activeTab} key={index} index={index}>{component}</TabPanel>)
      }
    </div>
  );
}
