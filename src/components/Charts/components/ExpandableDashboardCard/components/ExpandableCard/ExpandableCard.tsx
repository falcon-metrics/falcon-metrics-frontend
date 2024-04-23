import { ReactNode } from 'react';
import Box from '@material-ui/core/Box';

import { ChartSizes } from 'components/Charts/components/DashboardCard/interfaces/ChartSizes';

import useStyles from './ExpandableCard.styles';

interface Props {
  children: ReactNode;
  size: ChartSizes;
}

function ExpandableCard({ children, size }: Props) {
  const classes = useStyles();
  const gridSizeClass = size + '-chart-widget';

  return (
    <Box className={[classes.box, gridSizeClass].join(' ')}>
      {children}
    </Box>
  );
}

export default ExpandableCard;
