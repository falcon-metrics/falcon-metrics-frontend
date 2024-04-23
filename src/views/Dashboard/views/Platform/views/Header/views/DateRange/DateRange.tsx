import { DATE_STYLE } from 'styles/theme';

import useFilterPanelContext
  from '../../../FilterPanel/contexts/FilterPanelContext';

type Props = {
  styles?: any;
  className?: string;
};

const DateRange = ({ styles = {}, className }: Props) => {
  const {
    appliedFilters: { departureDateLowerBoundary, departureDateUpperBoundary },
  } = useFilterPanelContext();

  if (!departureDateLowerBoundary || !departureDateUpperBoundary) {
    return null;
  }

  const [startDate, finishDate] = [
    departureDateLowerBoundary,
    departureDateUpperBoundary,
  ].map((d) => new Intl.DateTimeFormat('en-GB', DATE_STYLE).format(d));

  const dateRange = `${startDate} - ${finishDate}`;

  return (
    <div
      style={{
        width: 194,
        right: 52,
        borderRadius: 25,
        position: 'absolute',
        backgroundColor: '#e2e2e2',
        top: 2,
        textAlign: 'center',
        padding: '8px 12px',
        fontFamily: 'Open Sans',
        fontSize: 'small',
        ...styles,
      }}
      data-tour="date-range"
      className={`filter-text ${className}`}
    >
      {dateRange}
    </div>
  );
};

export default DateRange;
