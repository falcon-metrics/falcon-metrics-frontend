import { alpha, makeStyles } from '@material-ui/core/styles';
import theme from 'styles/theme';

export const inlineStyles = {
  dependencyName: {
    color: '#0075C9',
    fontFamily: 'Open Sans',
    fontSize: 14,
    paddingLeft: 4,
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  headerColumn: {
    fontFamily: 'Open Sans',
    fontSize: 18,
    // fontWeigth: 'bold',
    color: '#444B52',
    fontWeight: 600,
  },
  cell: {
    color: '#444B52',
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const useStyles = makeStyles({
  container: {
    marginBottom: '3em',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    // width: '100%'
    textAlign: 'center'
  },
  headerColumn: inlineStyles.headerColumn,
  contentRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: '1px solid #E1E1E1',
    padding: '0.75em 0em 0.75em 0em'
  },
  tableContainer:{
    width: '45%',
    marginLeft: '0.5em'
  },
  contentColumn:{
    ...inlineStyles.headerColumn,
    justifyContent: 'center'
  },
  deliveryDate:{
    ...inlineStyles.headerColumn,
    fontSize:14,
    width: "150px",
    borderRadius: "4px",
    textAlign: "center",
    color: '#616161',
    backgroundColor: 'rgba(170, 237, 233, 0.38)',
  },
  beforeDesiredGoal:{
    backgroundColor: 'rgba(170, 237, 233, 0.38)',    
  },
  afterDesiredGoal:{
    backgroundColor: 'rgba(209, 90, 70, 0.2)',    
  },
  desiredGoalContainer:{
    width: '42%',
    justifyContent: 'space-around',
    display: 'flex',
    fontFamily: 'Open Sans',
    [theme.breakpoints.up(1500)]: {
      width:'49%'
    },
    [theme.breakpoints.up(1800)]: {
      width:'45%'
    },
  },
  desiredGoalBlock:{
    backgroundColor: alpha("#E3E3E3", 0.43),
    borderRadius: 4,
    flexDirection: 'column',
    width: '30%',
    minHeight: '193px',
    justifyContent:'center',
    display:"flex",
    alignItems: 'center',
    color: '#616161',
    minWidth:'146px',
    [theme.breakpoints.up(1500)]: {
      width:'40%'
    }
  },
  highConfidence:{
    backgroundColor:'rgba(170, 237, 233, 0.2)'
  },
  mediumConfidence:{
    backgroundColor:'rgba(255, 182, 51, 0.2)'
  },
  lowConfidence:{
    backgroundColor:'rgba(209, 90, 70, 0.2)'
  },
  emptyMessage: {
    fontSize: 14,
    fontFamily: 'Open Sans',
    justifyContent: 'center',
    height: '200px'
  }
});

export default useStyles;