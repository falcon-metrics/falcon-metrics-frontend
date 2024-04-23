import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

const highColor = '#D15A46';
const mediumColor = '#FFB633';
const lowColor = '#26BAB3';


const low = {
  borderColor: lowColor,
  color: lowColor,
};

const high = {
  borderColor: highColor,
  color: highColor, 
};

const medium = {
  borderColor: mediumColor,
  color: mediumColor,
};

export const badgeColors = {
  low,
  high,
  medium
};

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      color: '#000',
      fontSize: 14,
      fontFamily: 'Open Sans',
    },
    defaultOptionButton: {
      fontFamily: 'Open Sans',
      width: 140,
      fontWeight: 700,
      fontSize: 14,
      borderColor: '#000000',
      color: '#000000',
    },
    high,
    medium,
    low,
    defaultText: {
      fontFamily: 'Open Sans',
    },
    lowHover: {
      '&:hover': low
    },
    highHover: {
      '&:hover': high
    },
    mediumHover: {
      '&:hover': medium
    }
  }),
);
