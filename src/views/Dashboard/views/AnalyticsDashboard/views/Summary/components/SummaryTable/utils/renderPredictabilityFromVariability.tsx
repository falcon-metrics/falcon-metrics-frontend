import {
  getPredictabilityColor,
  getReverseLevel,
} from 'utils/statistics/TrendAnalysis';
import { RenderFunction } from '../interfaces/RenderFunction';

export const renderPredictabilityFromVariability: RenderFunction = (
  item,
  _,
  columnInfo,
) => {
  if (!columnInfo || !columnInfo.fieldName) {
    return null;
  }
  const value = getReverseLevel(item[columnInfo.fieldName]) as string;
  const color = getPredictabilityColor(value);
  if (!value) {
    return '-';
  }
  return <div style={{ color, fontWeight: 'bolder' }}>{value}</div>;
};
