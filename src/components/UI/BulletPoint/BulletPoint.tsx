import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ReactNode } from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginBottom: '1.2em',
      height: '3em',
      display: 'flex',
      alignItems: 'center',
    },
    iconContainer: {
      minWidth: '3em',
      height: '100%',
      '& > svg': {
        height: '100%',
        width: '100%',
      },
    },
    labelBulletPoints: {
      fontSize: '1em',
      color: '#303030',
      fontFamily: 'Open Sans',
      width: '100%',
    },
  }),
);

export type Props = {
  text: string;
  iconNode: ReactNode;
};

const BulletPoint = ({ text, iconNode }: Props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.iconContainer}>{iconNode}</Box>
      <Box pl={2}>
        <Typography className={classes.labelBulletPoints}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default BulletPoint;
