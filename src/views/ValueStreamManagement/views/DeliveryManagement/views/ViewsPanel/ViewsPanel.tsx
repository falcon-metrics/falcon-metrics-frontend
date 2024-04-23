
import { Box, Divider, Tab, Tabs, } from '@material-ui/core';
import useFilterPanelContext from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import { useStyles } from './ViewsPanel.styles';
import './ViewsPanel.styles.css';

export interface ViewsPanelProps {
  switchView: (period: string) => void;
}

const ViewsPanel = ({
  switchView,
}: ViewsPanelProps ) => {
  const classes = useStyles();
  const { selectedFilters } = useFilterPanelContext();

  const tabsValue = selectedFilters['perspective'] ?? 'board';

  return (
    <>
      <Box className={classes.perspectiveLabel}>
        Perspectives
      </Box>
      <Box className={classes.selectionTabs}>
        <Box className={`delivery-management-view-selector`}>
          <Tabs
            value={tabsValue === 'board' ? false : tabsValue}
            onChange={(_e, value) => switchView(value)}
            indicatorColor="primary"
            textColor="primary"
            className={classes.root}
            centered
          >
            <Tab selected label="Completed Work" value={'past'} />
            <Tab label="Work In Progress" value={'present'} />
            <Tab label="Upcoming Work" value={'future'} />
          </Tabs>
        </Box>
        <Divider orientation="vertical" flexItem/>
        <Box className={`delivery-management-view-selector`}>
          <Tabs
            value={tabsValue === 'board' ? tabsValue : false}
            onChange={(_e, value) => switchView(value)}
            indicatorColor="primary"
            textColor="primary"
            className={classes.root}
            centered
          >
            <Tab selected label="Smart Board" value={'board'} />
          </Tabs>
        </Box>
      </Box>
      
      <Divider className={classes.divider} />
    </>
  );
}

export default ViewsPanel;
