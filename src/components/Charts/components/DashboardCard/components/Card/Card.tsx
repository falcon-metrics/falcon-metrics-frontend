import Box from '@material-ui/core/Box';
import { ReactNode } from 'react';
import useStyles from './Card.styles';
import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';

interface Props {
  children: ReactNode;
  size: ChartSizes;
  matchHeight?: boolean;
}

function Card({ children, size, matchHeight }: Props) {
  const classes = useStyles();
  let gridSizeClass = size + '-chart-widget';
  if (matchHeight) {
    gridSizeClass = gridSizeClass + ' full-height';
  }

  return (
    <Box className={[classes.box, gridSizeClass].join(' ')}>{children}</Box>
  );
}

export default Card;
