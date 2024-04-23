import { ReactNode } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ReactComponent as NoDataIcon } from 'assets/icons/empty-state.svg';

interface ZeroStateProps {
  message: ReactNode;
  minHeight?: number;
  maxWidth?: string | number;
  maxIconHeight?: number;
  fontSize?: number;
  textTopMargin?: number;
  textBottomMargin?: number;
  iconPadding?: number;
}
const ZeroState = ({ message, minHeight, maxWidth , maxIconHeight , fontSize , textTopMargin , textBottomMargin , iconPadding }: ZeroStateProps) => {
  const paperStyles = makeStyles(() =>
    createStyles({
      root: {
        color: '#919191',
        boxShadow: 'none',
        minHeight: minHeight || 300,
        maxWidth: maxWidth || '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      },
    }),
  );
  const generalStyles = makeStyles(() => ({
    text: {
      marginTop: textTopMargin || 20,
      fontFamily: 'Open Sans',
      fontSize: fontSize || 24,
      fontWeight: 600,
      textAlign: 'center',
      color: '#32383E',
      marginBottom: textBottomMargin || 0
    },
    icon: {
      padding: iconPadding || 0,
      maxHeight: maxIconHeight
    }
  }));
  const classes = paperStyles();
  const styles = generalStyles();

  return (
    <Box justifyContent="center">
      <Paper elevation={1} classes={classes}>
        <Box
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          display="flex"
        >
          <NoDataIcon className={maxIconHeight ? styles.icon : ''}/>
          <Box className={styles.text}>{message}</Box>
        </Box>
      </Paper>
    </Box>
  );
};

ZeroState.defaultProps = {
  message: 'No data available for the selected criteria.',
};

export default ZeroState;
