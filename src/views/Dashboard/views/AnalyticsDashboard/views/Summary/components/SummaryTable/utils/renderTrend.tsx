import { getTrendArrowImage } from 'utils/statistics/TrendAnalysis';

import { RenderFunction } from '../interfaces/RenderFunction';

export const renderTrendArrow: RenderFunction = (item, _, columnInfo) => {
  if (!columnInfo || !columnInfo.fieldName) {
    return null;
  }
  const trend = item[columnInfo.fieldName];
  const { arrowDirection, arrowColour, text } = trend;
  const image = getTrendArrowImage(arrowDirection, arrowColour);
  return (
    <div
      style={{
        height: 20,
        position: 'relative',
      }}
    >
      <img
        src={image}
        className="sle-trend-icon"
        alt={text}
        style={{
          top: -6,
          position: 'absolute',
        }}
      />
    </div>
  );
};
