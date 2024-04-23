import { Tabs, Tab, withStyles, Theme, createStyles } from '@material-ui/core';
type Props = {
  tabTitles: string[];
  selectedTab: number;
  setSelectedTab: any;
};
export const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    marginLeft: 20
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

const TabSelector = ({ tabTitles, selectedTab, setSelectedTab }: Props) => {

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <AntTabs value={selectedTab} onChange={handleTabChange}>
      {tabTitles.map((tab, i) => {
        return <AntTab key={i} label={tab} />;
      })}
    </AntTabs>
  );
};

export default TabSelector;
