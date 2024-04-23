import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    filterExpressionTitle: {
      color: '#707070',
      fontFamily: 'Open Sans',
      fontSize: 14,
      fontWeight: 'bold',
    },
    filterExpressionSmallTitle: {
      color: '#707070',
      fontFamily: 'Open Sans',
      fontSize: 12,
      fontWeight: 'bold',
    },
    filterExpressionParagraph: {
      color: '#707070',
      fontFamily: 'Open Sans',
      fontSize: 12,
    },
    systemFieldContainer: {
      border: '1px solid #707070',
      width: 300,
      fontFamily: 'Open Sans',
      color: '#707070',
    },
    systemFieldCell: {
      border: '1px solid #707070',
      padding: 4,
    },
  }),
);

export default useStyles;
