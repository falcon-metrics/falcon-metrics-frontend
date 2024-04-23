import { useCustomSWR } from 'core/api/fetch';

import { FilterGroup } from './FilterGroup';
import { FilterGroupConfig } from './interfaces/FilterGroupConfig';

type Props = {
  fetcher: () => Promise<FilterGroupConfig | undefined>;
  index: number;
  globalExpandedNumber: number;
};

export const FilterGroupWithData = ({ fetcher, index, ...rest }: Props) => {
  const { data: fetchedData } = useCustomSWR<any>('filter-group' + index, fetcher);

  if (!fetchedData) {
    return null;
  }

  const { children, ...data } = fetchedData;

  return (
    <FilterGroup {...data} {...rest}>
      {children}
    </FilterGroup>
  );
};
