import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import useFilterPanelContext
  from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext';
import {
  FilterPanelQueryParameters,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';
import {
  getSelectedFilterCount,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FilterCounter from '../../../../components/FilterCounter/FilterCounter';
import FilterDropdown, {
  DropDownConfig,
} from '../FilterDropdown/FilterDropdown';
import useStyles from './FilterGroup.styles';
import { FilterGroupConfig } from './interfaces/FilterGroupConfig';

type Props = {
  globalExpandedNumber: number;
  activeFilterCountOverride?: number;
} & FilterGroupConfig;

export function FilterGroup({
  title,
  dropDownConfigCollection,
  globalExpandedNumber,
  noAccordion,
  children,
  activeFilterCountOverride,
  ...rest
}: Props) {
  const groupKey = 'groupKey' in rest ? rest.groupKey : undefined;
  const classes = useStyles();
  const getIsGlobalExpanded = () => globalExpandedNumber % 2 === 1;
  const [expanded, setExpanded] = useState(getIsGlobalExpanded());

  useEffect(() => {
    setExpanded(getIsGlobalExpanded());
  }, [globalExpandedNumber, setExpanded]);

  const { selectedFilters } = useFilterPanelContext();
  const selectedFilterCount = useMemo(() => {
    if (activeFilterCountOverride !== undefined) {
      return activeFilterCountOverride;
    }
    const keys = [...Object.keys(dropDownConfigCollection), groupKey] as Array<
      keyof FilterPanelQueryParameters
    >;
    return getSelectedFilterCount(keys, selectedFilters);
  }, [
    selectedFilters,
    dropDownConfigCollection,
    groupKey,
    activeFilterCountOverride,
  ]);

  const dropdowns = useMemo(() => {
    const dropDownKeys = Object.keys(dropDownConfigCollection);
    return dropDownKeys.map((key) => {
      const dropDownConfig = dropDownConfigCollection[
        key
      ] as DropDownConfig;
      return (
        <FilterDropdown
          key={key}
          camelCaseLabel={key}
          groupKey={groupKey}
          {...dropDownConfig}
        />
      );
    });
  }, [dropDownConfigCollection, groupKey]);

  if (noAccordion) {
    return (
      <Box className={classes.ungroupedContainer}>
        <Box className={classes.summaryContent}>{title}</Box>
        {dropdowns}
      </Box>
    );
  }

  return (
    <Accordion
      className={classes.container}
      expanded={expanded}
      data-cy="filter-group"
    >
      <AccordionSummary
        className={[classes.font, classes.summary].join(', ')}
        expandIcon={<ExpandMoreIcon />}
        onClick={() => setExpanded((expanded) => !expanded)}
      >
        <Box className={classes.summaryContent}>
          {title}
          <FilterCounter count={selectedFilterCount} />
        </Box>
      </AccordionSummary>
      <AccordionDetails className={classes.content}>
        {dropdowns}
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

export default FilterGroup;
