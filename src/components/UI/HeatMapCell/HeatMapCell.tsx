import Box from '@material-ui/core/Box';
import sortBy from 'lodash/sortBy';
import { ReactNode, useMemo } from 'react';
import { hexToHSL } from 'utils/colors';
import CenteredCell from '../CenteredCell';
import useStyles from './HeatMapCell.styles';

export type ColorMap = Record<number, string>;

interface Props {
  colorMap: ColorMap;
  value: number;
  children?: ReactNode;
}

function HeatMapCell({ colorMap, value, children }: Props) {
  const classes = useStyles();

  const [backgroundColor, color] = useMemo(() => {
    let backgroundColor = 'transparent';
    let color = 'black';
    const colorMapLimits = sortBy(Object.keys(colorMap).map((n) => Number(n)));
    colorMapLimits.forEach((limit, i, arr) => {
      const isLast = i === arr.length - 1;
      if (value > limit && (value <= arr[i + 1] || isLast)) {
        backgroundColor = colorMap[limit];
        const { perceivedLightness } = hexToHSL(backgroundColor);
        if (perceivedLightness < 0.6) {
          color = 'white';
        }
      }
    });
    return [backgroundColor, color];
  }, [colorMap, value]);

  return (
    <CenteredCell
      value={
        <Box style={{ backgroundColor, color }} className={classes.cell}>
          {children ?? value}
        </Box>
      }
    />
  );
}

export default HeatMapCell;
