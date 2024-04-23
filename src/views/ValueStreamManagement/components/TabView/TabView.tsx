import React, { useMemo } from "react";

import Box from "@material-ui/core/Box";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

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
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

export const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: "Open Sans, sans-serif",
      "&:hover": {
        color: "#40a9ff",
        opacity: 1,
      },
      "&$selected": {
        color: "#1890ff",
        fontWeight: theme.typography.fontWeightMedium,
      },
      "&:focus": {
        color: "#40a9ff",
      },
    },
    selected: {},
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
  label: string;
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    "& .MuiTabs-flexContainer .MuiButtonBase-root": {
      marginRight: 0,
    },
  },
}));

export const TabView = ({
  tabTitles,
  tabContents,
  customProps,
  watchActiveTab,
  defaultActiveTab = 0,
  getData,
  customStyles,
}: {
  tabTitles: string[];
  tabContents: React.ReactNode[];
  customProps: any;
  watchActiveTab?: (active: number) => void;
  defaultActiveTab?: number;
  getData?: (data: any, activeTab: number) => any;
  customStyles?: any;
}) => {
  const classes = useStyles();
  const [activeTab, setValue] = React.useState(defaultActiveTab);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    watchActiveTab?.(newValue);
  };

  const currentData = useMemo(() => {
    if (getData) {
      return getData(customProps?.data, activeTab);
    } else if (customProps && customProps.data) {
      return customProps.data;
    } else {
      return null;
    }
  }, [getData, customProps ? customProps.data : null, activeTab]);

  return (
    <div className={classes.root}>
      <AntTabs
        value={activeTab}
        onChange={handleChange}
        style={customStyles || {}}
      >
        {tabTitles.map((title: string, key: number) => (
          <AntTab key={key} label={title} />
        ))}
      </AntTabs>
      {tabContents.map((component, index: number) => {
        const Component: any = component;
        return (
          <TabPanel value={activeTab} key={index} index={index}>
            <Component {...customProps} data={currentData} />
          </TabPanel>
        );
      })}
    </div>
  );
};
