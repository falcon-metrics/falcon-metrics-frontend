import { ReactNode } from 'react';

import {
  FilterPanelQueryParameters,
} from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';

import { DropDownConfig } from '../../FilterDropdown/FilterDropdown';

export type FilterGroupConfig = {
  title: string;
  noAccordion?: boolean;
  children?: ReactNode;
} & (
  | {
      dropDownConfigCollection: {
        [K in keyof FilterPanelQueryParameters]: DropDownConfig;
      };
    }
  | {
      groupKey: keyof FilterPanelQueryParameters;
      dropDownConfigCollection: Record<string, DropDownConfig>;
    }
);
