import { makeStyles, createStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => createStyles({
  choiceContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: '0 2vw',
    width: '100%',
  },
  graphContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  labelFooter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
    fontSize: '0.78rem',
    fontFamily: 'Open Sans',
  },
  circle: {
    width: '13px',
    height: '13px',
    borderRadius: '15px',
    border: '1px solid transparent',
    margin: '10px 5px',
  },
})
);
