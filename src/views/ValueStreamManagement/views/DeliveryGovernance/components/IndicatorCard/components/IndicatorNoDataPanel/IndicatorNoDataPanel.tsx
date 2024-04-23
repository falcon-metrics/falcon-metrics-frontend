import { Box } from '@material-ui/core';
import { ReactComponent as NoDataIcon } from 'assets/icons/empty-state.svg';
import { useStyles } from './IndicatorNoDataPanel.styles';

const IndicatorNoDataPanel = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <NoDataIcon className={classes.icon}/>
      <Box className={classes.mainMessage}>
        No data matched the selected criteria.
      </Box>
    </Box>
  );
};

export default IndicatorNoDataPanel;
