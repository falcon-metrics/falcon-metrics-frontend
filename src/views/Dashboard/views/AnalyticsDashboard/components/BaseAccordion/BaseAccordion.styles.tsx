import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';

const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    borderRadius: "10px",
    height: "10px",
    width: "10px",
    backgroundColor: "#F7F7F7"
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "20px",
    backgroundColor: "#D1D2D3",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    borderRadius: "20px",
  },
};

export const useStyles = makeStyles(() =>
  createStyles({
    accordion: {
      backgroundColor: '#fbfbfb',
    },
    accordionTitle: {
      fontSize: '18px',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      fontStyle: 'normal',
      color: 'rgba(0, 0, 0, 0.7)',
    },
    accordionDetails: {
      backgroundColor: '#fbfbfb',
      overflow: 'auto',

      margin: 5,
      ...scrollbarStyle
    },
    accordionSummary: {
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25);'
    },
  })
);
