import { makeStyles } from '@material-ui/core/styles';
import { ObeyaColors } from 'views/Governance/utils/constants';

const white = '#fff';

const hoverColor = {
  backgroundColor: '#0075C9',
  '& > *': {
    color: white,
  },
  '& .not-rated-header': {
    borderColor: white,
    color: white,
  },
};

export const useStyles = makeStyles((theme) => ({
  addParentWorkItemBtnContainer: {
    height: 76,
    justifyContent: 'flex-end',
    paddingRight: 20,
    alignItems: 'center',
    display: 'flex',
  },
  addParentWorkItemBtn: {
    fontFamily: 'Open Sans',
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    fontWeight: 'bold',
    color: '#0175ca !important',
    fontSize: 13,
  },
  completedIcon: {
    fontSize: 36,
    color: `${ObeyaColors.COMPLETED} !important`,
  },
  completedContainerIcon: {
    paddingBottom: 5,
    color: ObeyaColors.COMPLETED,
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 16,
    alignItems: 'center',
    height: '98%',
  },
  ratingIconContainer: {
    paddingBottom: 5,
    color: ObeyaColors.COMPLETED,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '98%',
    width: '14px',
  },
  objectiveContainer: {
    marginBottom: 8,
  },
  accordionContent: {
    '&$expanded': {
      margin: 0,
    },
  },
  ratingListContainer: {
    width: '100%',
    '&  .MuiChip-root': {
      border: `1px solid ${white} !important`,
    },
  },
  accordionContainer: {
    width: '100%',
    margin: 0,
    backgroundColor: 'inherit',
    fontFamily: 'Open Sans',
    color: '#696969',
    overflow: "hidden",
    textShadow: 'none',
    '.MuiGrid-root .not-rated': {
      color: 'inherit',
      borderColor: '#696969',
    },
    '& *': {
      color: 'inherit',
    },
    '&:hover, &.Mui-expanded': hoverColor,
    '& > .Mui-expanded': {
      minHeight: '0px !important',
      borderTopRightRadius: 5,
      borderTopLeftRadius: 5,
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {
      margin: '0px !important',
    },
  },
  editIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIconContainer: {
    color: '#6AE0D9'
  },
  keyResultContainer: {
    background: '#ccc',
    width: '100%',
  },
  expandMoreIcon: {
    fontSize: 22,
  },
  editIconButton: {
    marginTop: 4,
  },
  objectiveEditIcon: {
    fontSize: 18,
  },
  okrContainerTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  objectiveTitle: {
    padding: 0,
    width: '90%',
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
    paddingBottom: 5,
    alignItems: 'center',
    display: 'flex',
  },
  keyResultCard: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
    marginBottom: 2,
  },
  darkBlue: {
    fontFamily: 'Open Sans',
    color: '#333',
    borderRadius: 0,
    marginBottom: 2,
  },
  lightBlue: {
    fontFamily: 'Open Sans',
    color: '#333',
    borderRadius: 0,
    marginBottom: 2,
    border: '1px solid #fff',
  },
  gray: {
    color: '#333',
    borderRadius: 0,
  },
  main: {
    fontFamily: 'Open Sans',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignedOnTop: {
    alignItems: 'flex-start',
    alignContent: 'start',
    justify: 'flex-start',
  },
  typographySm: {
    fontFamily: 'Open Sans',
    paddingLeft: 8,
    display: 'flex',
    justify: 'flex-start',
    color: '#626262',
    fontSize: '14px',
  },
  typographyMd: {
    fontSize: 14,
    fontFamily: 'Open Sans',
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(1),
  },
  wrapper: {
    height: '50vh',
    position: 'relative',
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  chipContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyValueGridContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '600px'
  },
  emptyValueGridButton: {
    borderRadius: '5px!important',
    padding: '2px 24px 2px 12px!important',
    marginTop: '16px'
  },
  emptyValueGridText: {
    color: '#8E8E8E',
    fontSize: '1.1rem'
  },
  emptyValueGridButtonText: {
    marginLeft: '5px',
    fontSize: '0.8rem',
    textTransform: 'none'
  }
}));
