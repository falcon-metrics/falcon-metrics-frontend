import {
  lazy,
  useState,
} from 'react';
import { AppBar, Divider, Box } from '@material-ui/core';

import memo from 'utils/typescript/memo';
import {
  useGetTotalFilterCount,
} from 'views/Dashboard/views/AnalyticsDashboard/utils/getTotalFilterCount';
import useFilterPanelContext
  from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import FilterPanel
  from 'views/Dashboard/views/Platform/views/FilterPanel/FilterPanel';
import Footer from 'views/Dashboard/views/Platform/views/Footer';
import ContextNavigationWithData
  from 'views/Dashboard/views/Platform/views/Header/views/ContextNavigation/ContextNavigation.data';
import DateRange
  from 'views/Dashboard/views/Platform/views/Header/views/DateRange';
import FilterButton
  from 'views/Dashboard/views/Platform/views/Header/views/FilterButton';
import NavigationBar
  from 'views/ValueStreamManagement/components/NavigationBar';

import { useValueStreamManagementStyles } from './ValueStreamManagement.styles';

const ValueStreamManagementRoute = lazy(
  () => import('./ValueStreamManagementRoute'),
);

const ValueStreamManagement = () => {
  const classes = useValueStreamManagementStyles();
  const [filterPanelIsOpen, setFilterPanelIsOpen] = useState(false);
  const {
    appliedFilters,
    defaultRollingWindowDates: rollingWindowDates,
  } = useFilterPanelContext();

  const filterCount = useGetTotalFilterCount(appliedFilters, rollingWindowDates);

  return (
    <Box>
      <AppBar
        position="sticky"
        classes={{
          root: classes.navigationSection,
          colorPrimary: classes.navigationSectionColor,
        }}
      >
        <Box className="content-navigation">
          <NavigationBar />
        </Box>
        <Box className="context-navigation-filter" data-tour="context-navigation">
          <ContextNavigationWithData />
          <Box className="wrapper-filter">
            <DateRange />
            <FilterButton
              onClick={() => setFilterPanelIsOpen(true)}
              isActive={true}
              filterCount={filterCount}
            />
          </Box>
        </Box>
        <Box className="content-filters">
          <FilterPanel
            isOpen={filterPanelIsOpen}
            onClose={() => setFilterPanelIsOpen(false)}
          />
        </Box>
        <Divider className={classes.navigationDivider} />
      </AppBar>
      <Box
        className="content-main-container"
        data-tour="content-main-container"
      >
        <ValueStreamManagementRoute />
      </Box>
      <Footer />
    </Box>
  );
};

export default memo(ValueStreamManagement);
