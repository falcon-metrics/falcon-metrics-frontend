import * as React from 'react';

import {
  useValueStreamManagementStyles,
} from 'views/ValueStreamManagement/ValueStreamManagement.styles';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './PerspectiveSction.styles';

type Props = {
  title: string;
  customStyles?: { title: React.CSSProperties };
  children: React.ReactNode;
};

export const PerspectiveSection = ({
  title,
  customStyles = { title: { background: '#f0f0f0' } },
  children,
}: Props) => {
  const globalStyles = useValueStreamManagementStyles();
  const classes = useStyles();
  return (
    <Box className={globalStyles.groupContainer}>
      <Box p={20} className={classes.section}>
        <Typography className={classes.titleSection} style={customStyles.title}>
        {title}
        </Typography>
        <Box className={classes.periodSelectionContainer}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};