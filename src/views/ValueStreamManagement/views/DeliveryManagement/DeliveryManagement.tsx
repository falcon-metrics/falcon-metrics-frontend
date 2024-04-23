import { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';

import useSharedState from 'hooks/useSharedState';
import useFilterPanelContext
  from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';

import {
  useValueStreamManagementStyles,
} from '../../ValueStreamManagement.styles';
import KanbanSection from './views/KanbanSection';
import ViewsPanel from './views/ViewsPanel';
import AnalyticsView from './views/AnalyticsView';
import { useStyles } from './DeliveryManagement.styles';

const DeliveryManagement = () => {
  const globalStyles = useValueStreamManagementStyles();
  const classes = useStyles();

  const {
    appliedFilters,
    apiQueryParameters,
    selectedFilters,
    setSelectedFilters,
    applyFiltersFromPanel,
  } = useFilterPanelContext();

  const {
    setPerspective,
  } = setSelectedFilters;

  {
    // Disable loading indicator on header by setting shared state to false
    const [sharedState, setSharedState] = useSharedState('ANALYTICS_DASHBOARD_IS_LOADING');
    useEffect(() => {
      if (sharedState) {
        setSharedState(false);
      }
    }, [sharedState]);
  }

  // Delivery Management View Mode
  const [view, setView] = useState<string>('past');
  const perspectives = ['board', 'past', 'present', 'future'];

  const switchView = (selection: string) => {
    if (perspectives.includes(selection)) {
      // Analytics View
      setView(selection);
      setPerspective(selection);
    } else {
      //Board View
      setView('board');
      setPerspective('board');
    }
  }

  // Perspective
  const perspective = selectedFilters['perspective'] ?? 'board';

  useEffect(() => {
    applyFiltersFromPanel();
  }, [perspective]);

  return (
    <Box className={classes.generalContainer}>
      <Box className={classes.viewContainer}>
        <ViewsPanel
          switchView={switchView}
        />
      </Box>
      {
        view === 'board'
          ? (
            <Box className={globalStyles.groupContainer}>
              <KanbanSection
                appliedFilters={appliedFilters}
                apiQueryParameters={apiQueryParameters}
              />
            </Box>
          )
          : (
            <AnalyticsView
              appliedFilters={appliedFilters}
              apiQueryParameters={apiQueryParameters}
              perspective={perspective}
            />
          )
      }
    </Box>
  )
}
export default DeliveryManagement;