/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { AppBar, Box, Divider, Drawer } from '@material-ui/core';
import { ChevronLeftRounded } from "@material-ui/icons";
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import { MockContextId } from 'core/api/ApiClient/MockData/MockData';
import memo from 'utils/typescript/memo';
import IconButton from '@material-ui/core/IconButton';
import useFilterPanelContext
  from '../Platform/views/FilterPanel/contexts/FilterPanelContext';
import FilterPanel from '../Platform/views/FilterPanel/FilterPanel';
import Footer from '../Platform/views/Footer';
import ContextNavigationWithData
  from '../Platform/views/Header/views/ContextNavigation/ContextNavigation.data';
import DateRange from '../Platform/views/Header/views/DateRange';
import FilterButton from '../Platform/views/Header/views/FilterButton';
import NavigationBar from '../Platform/views/Header/views/NavigationBar';
import DashboardLink from '../Platform/views/Header/views/DashboardLink';
import AnalyticsDashboardRouter from './components/AnalyticsDashboardRouter';
import CollapseDrawer from 'views/ValueStreamManagement/components/Events/components/CollapaseDrawer';
import { useGetTotalFilterCount } from './utils/getTotalFilterCount';
import useAuthentication from 'hooks/useAuthentication';
import { useStyles } from './AnalyticsDashboard.styles';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#0077C8',
    color: '#fff',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  }
}))(Tooltip);

export interface Props {
  sampleDataOptionIsVisible: boolean;
  hasDatasource: boolean;
}

const AnalyticsDashboard = ({
  hasDatasource,
  sampleDataOptionIsVisible,
}: Props) => {
  const classes = useStyles();
  const [filterPanelIsOpen, setFilterPanelIsOpen] = useState(false);
  const {
    otherApiQueryParameters: { contextId },
    appliedFilters,
    defaultRollingWindowDates: rollingWindowDates,
  } = useFilterPanelContext();

  const { isAlphaUser } = useAuthentication();

  const [isShown, setIsShown] = useState<boolean>(false);

  const selectedContextId =
    !hasDatasource && sampleDataOptionIsVisible ? MockContextId[0] : contextId;
  const demoDataIsSelected = MockContextId.includes(selectedContextId ?? '');

  const filterCount = useGetTotalFilterCount(appliedFilters, rollingWindowDates);

  const toggleDrawer = () => {
    setIsShown((openDrawer) => !openDrawer);
  };

  return (
    <Box style={{ position: 'relative' }}>
      <AppBar
        position="sticky"
        classes={{
          root: classes.navigationSection,
          colorPrimary: classes.navigationSectionColor,
        }}
      >
        {/* Temporar hide events and comments feature */}
        {/* {isAlphaUser ? (
          <Box>
            <LightTooltip title="Events & Comments" placement="right-start">
              <Box className={classes.iconExpand} onClick={toggleDrawer}>
                <ChevronLeftRounded className={classes.iconChevronLef} />
              </Box>
            </LightTooltip>
            <Box className={classes.wrapperHoverDrawer}>
            </Box>
            <Drawer
              anchor="right"
              open={isShown}
              onClose={toggleDrawer}
              transitionDuration={250}
              classes={{ paper: classes.paperDrawer }}
              BackdropProps={{ invisible: true }}
            >
              <Box className={classes.wrapperCloseDrawer}>
                <IconButton aria-label="Add Event" size="small" className={classes.buttonClose}>
                  <CloseIcon onClick={toggleDrawer} />
                </IconButton>
              </Box>
              
              <Box className={classes.wrapperCollapaseDrawer}>
                <CollapseDrawer />
              </Box>
            </Drawer>
          </Box>
        ) : null} */}
        <Box className='navigation-link-container'>
          <Box className="dashboard-link">
            <DashboardLink />
          </Box>
          <Box className="content-navigation">
            <NavigationBar />
          </Box>
        </Box>
        <Box className="context-navigation-filter" data-tour="context-navigation">
          <ContextNavigationWithData />
          <Box className="wrapper-filter">
            <DateRange />
            <FilterButton
              onClick={() => setFilterPanelIsOpen(true)}
              isActive={!demoDataIsSelected}
              filterCount={filterCount}
            />
          </Box>
        </Box>
        {/* <Box className="content-filters">
          <FilterPanel
            isOpen={filterPanelIsOpen}
            onClose={() => setFilterPanelIsOpen(false)}
          />
        </Box> */}
        <Box>
          <FilterPanel 
            isOpen={filterPanelIsOpen}
            onClose={() => setFilterPanelIsOpen(false)} />
        </Box>
        <Divider className={classes.navigationDivider} />
      </AppBar>
      <Box
        className="content-main-container"
        data-tour="content-main-container"
      >
        <br />
        <AnalyticsDashboardRouter demoDataIsSelected={demoDataIsSelected} />
      </Box>
      <Footer />
    </Box>
  );
};

export default memo(AnalyticsDashboard);
