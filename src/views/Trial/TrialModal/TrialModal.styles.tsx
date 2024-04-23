import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles, createStyles, styled } from '@material-ui/core/styles';

export const Icon = styled(CheckCircleIcon)({
  color: '#10cfc9',
  width: 40,
  fontSize: 'large',
});

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      width: 480,
      position: 'relative',
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
    labelBulletPoints: {
      fontSize: '14px',
      color: '#303030',
      fontFamily: 'Open Sans',
      width: '100%',
    },
  }),
);

export default useStyles;
