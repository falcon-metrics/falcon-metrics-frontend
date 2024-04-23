import { makeStyles } from '@material-ui/core/styles';

export const inlineStyles = {
  blockedByLabel: {
    textAlign: 'center',
  },
  asssociatedItem: {
    color: '#333',
    fontFamily: 'Open Sans',
    fontSize: 14,
    paddingLeft: 4,
  },
  cell: {
    color: '#444B52',
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  headerColumn: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeigth: 'bold',
    color: '#444B52',
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
  },
  center: inlineStyles.center,
  filterButton: {
    color: '#444B52',
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  actionsContainers: {
    display: 'flex',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    '* > svg': {
      fontSize: '1.2rem',
    }
  },
  asssociatedItem: inlineStyles.asssociatedItem,
  cell: inlineStyles.cell,
  headerColumn: inlineStyles.headerColumn,
  dataGrid: {
    border: '0px solid #000 !important',
    root: {
      width: '200vw',
    },
    columnHeader: {
      fontWeight: 'bold',
    },
  },
  gridToolbarExport: {
    position: 'absolute',
    right: 0,
    top: 510,
  },
});

export default useStyles;