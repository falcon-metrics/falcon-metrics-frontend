import { useMemo } from 'react';
import { Box } from '@material-ui/core';

import { BaseRoutes, ValueStreamManagementIndexes } from 'utils/routes';
import { useLandingPage } from 'hooks/useLandingPage';

import { AnalyticsDashboardPageIndexes } from 'views/Dashboard/views/AnalyticsDashboard';
import { useAnalyticsDashboardTab } from 'views/Dashboard/views/AnalyticsDashboard/hooks/useAnalyticsDashboardTab';
import { DataAggregations, DateAnalysisOptions } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';
import { useValueStreamManagementTab } from 'views/ValueStreamManagement/hooks/useValueStreamManagementTab';

import FilterGroup from '../FilterGroup';
import FilterByDelayedItems from './components/FilterDelayedItems';
import DateAnalysisPanel from './components/DateAnalysisPanel';
import { buildOptionsForEnum } from './utils/buildOptionsForEnum';
import { useStyles } from './PreferencesGroup.styles';
import useFilterPanelContext from '../../../../contexts/FilterPanelContext';

interface Props {
  globalExpandedNumber: number
  delayedItemsSelection: string | undefined;
  setDelayedItemsSelection(selection: string | undefined): void;
  dateAnalysisOption: DateAnalysisOptions | undefined;
  setDateAnalysisOption(option: DateAnalysisOptions | undefined):void;
};

const PreferencesGroup = ({
  globalExpandedNumber,
  delayedItemsSelection,
  dateAnalysisOption,
  setDelayedItemsSelection,
  setDateAnalysisOption
}: Props) => {
  const classes = useStyles();

  // Page-Specific Behavior
  const landingPage = useLandingPage();
  const analyticsDashboardTab = useAnalyticsDashboardTab();
  const valueStreamManagementTab = useValueStreamManagementTab();
  const filterPanelContext = useFilterPanelContext();

  const currentPagePath = `/${landingPage}`;

  // Delivery Management Conditions
  const isDeliveryManagementTab: boolean =
    valueStreamManagementTab === ValueStreamManagementIndexes.ValueStreamManagementDeliveryManagement;

  // Always show delayed items filter selector
  const displayDelayedItemsFilter = true;

  const displayDateAnalysisFilter: boolean = 
    currentPagePath === BaseRoutes.ValueStreamManagement 
    && isDeliveryManagementTab 
    && filterPanelContext.appliedFilters.perspective !== 'board' 
    && filterPanelContext.appliedFilters.perspective !== 'past';

  // Dropdown Selectors
  const generateDropdownConfigs = () => {
    const isAnalyticsDashboardSummary = 
      currentPagePath === BaseRoutes.AnalyticsDashboard &&
      analyticsDashboardTab === AnalyticsDashboardPageIndexes.summary;

    const isValueStreamManagement =
      currentPagePath === BaseRoutes.ValueStreamManagement;

    const config = {}
    
    if (isAnalyticsDashboardSummary || isValueStreamManagement) {
      config["currentDataAggregation"] = {
        options: buildOptionsForEnum(DataAggregations),
        placeholder: 'Weeks'
      }
    }
    
    return config;
  }

  const dropdownConfigCollection = useMemo(
    generateDropdownConfigs,
    [currentPagePath, analyticsDashboardTab],
  );

  const noContentAvailable: boolean =
    !dropdownConfigCollection &&
    !displayDelayedItemsFilter &&
    !displayDateAnalysisFilter;

  if (noContentAvailable) {
    return null;
  }

  return (
    <FilterGroup
      title="Preferences"
      globalExpandedNumber={globalExpandedNumber}
      dropDownConfigCollection={dropdownConfigCollection}
      activeFilterCountOverride={0}
    >
      {
        displayDateAnalysisFilter && 
        <Box className={classes.optionContainer}>
          <DateAnalysisPanel 
            dateAnalysisOption={dateAnalysisOption}
            setDateAnalysisOption={setDateAnalysisOption}
          />
        </Box>
      }
      {
        displayDelayedItemsFilter &&
        <Box className={classes.optionContainer}>
          <FilterByDelayedItems
            onCheckedCallback={setDelayedItemsSelection}
            currentSelection={delayedItemsSelection}
            label="Delayed Items"
          />
        </Box>
      }
    </FilterGroup>
  );
};

export default PreferencesGroup;
