import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/styles';
import { CSSProperties } from 'react';
import FilterCounter from '../../../FilterPanel/components/FilterCounter';

type Props = {
  onClick: () => void;
  isActive: boolean;
  filterCount?: number;
};

const FilterCounterContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translate(30%, -30%)',
});

function FilterButton({ onClick, isActive, filterCount = 0 }: Props) {
  const iconColor = isActive ? '3252c' : 'mono';
  const icon = `img/icons/${iconColor}/filter_${iconColor}.svg`;
  const titleEnding = isActive ? 'results' : 'not available for demo data';
  const title = 'Filter ' + titleEnding;
  const containerStyle: CSSProperties = isActive
    ? {}
    : { pointerEvents: 'none' };

  return (
    <div data-tour="filter-panel" style={containerStyle} onClick={onClick}>
      <img
        src={icon}
        className="filter-icon"
        alt="Filter results"
        onClick={onClick}
        onKeyPress={onClick}
        style={{ cursor: 'pointer' }}
        title={title}
      />
      {isActive && (
        <FilterCounterContainer>
          <FilterCounter count={filterCount} />
        </FilterCounterContainer>
      )}
    </div>
  );
}

export default FilterButton;
