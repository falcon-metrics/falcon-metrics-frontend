import { makeStyles, createStyles, styled } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      display: 'flex',
      width: '100%',
      maxHeight: '10vh',
    },
    closeButton: {
      display: 'flex',
      alignContent: 'flex-end',
      justifyContent: 'flex-end',
      width: '100%',
      position: 'absolute',
      right: 2,
      top: 0,
    },
    removeoutline: {
      outline: 0,
    },
    paper: {
      width: '48vh',
      minWidth: 500,
      position: 'relative',
      padding: '0px 30px 30px 38px',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 15,
      boxShadow: theme.shadows[5],
      outline: 0,
      '&:focus': {
        outline: 0,
      },
    },
    label: {
      fontSize: '20px',
      color: '#001a70',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      width: '100%',
    },
    labelBlack: {
      fontSize: '20px',
      color: '#303030',
      fontFamily: 'Open Sans',
      fontWeight: 600,
      width: '100%',
    },
    labelBulletPoints: {
      fontSize: '14px',
      color: '#303030',
      fontFamily: 'Open Sans',
      width: '100%',
    },
    button: {
      textTransform: 'none',
      fontFamily: 'Open Sans',
      color: 'white',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: 600,
      '&:hover': {
        backgroundColor: 'rgb(33, 160, 154, 1)',
      },
      width: '140px',
      height: '50px',
    },
  }),
);

export const GreenSpan = styled('span')({
  fontSize: '20px',
  color: '#00BBB4',
  fontFamily: 'Open Sans',
  fontWeight: 600,
  width: '100%',
});

export default useStyles;
