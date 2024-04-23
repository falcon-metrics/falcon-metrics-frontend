import { Box } from '@material-ui/core';
import { ReactComponent as NoDataIcon } from 'assets/icons/empty-state.svg';
import { useStyles } from './NoDataPanel.styles';

const NoDataPanel = ({ message = 'No data matched the selected criteria.' }: { message?: string }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <NoDataIcon />
      <Box className={classes.mainMessage}>
        {message}
      </Box>
    </Box>
  );
};

export default NoDataPanel;
