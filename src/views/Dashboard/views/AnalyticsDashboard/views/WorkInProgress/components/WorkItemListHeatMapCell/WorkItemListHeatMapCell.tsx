import HeatMapCell, { ColorMap } from 'components/UI/HeatMapCell';

const HeatMapColorMap: ColorMap = {
  [-1]: '#008F80',
  30: '#00B5AE',
  50: '#69CECC',
  70: '#FFCB45',
  85: '#FF9E19',
  95: '#F0870D',
  100: '#F56D5E',
  300: '#E03C31',
  500: '#B22229',
};

const WorkItemListHeatMapCell = ({ value }: { value?: unknown }) => {
  const numberValue = Number(value);
  const percentageValue = Math.round(numberValue * 100);

  return (
    <HeatMapCell value={percentageValue} colorMap={HeatMapColorMap}>
      {percentageValue}%
    </HeatMapCell>
  );
};

export default WorkItemListHeatMapCell;
