import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import { styled } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import TextEditor from '../../../TextEditor';

export const CustomTextEditor = styled(TextEditor)({
  '.ql-editor': {
    height: 60,
  }
});

export const WrapperEllipse = styled(Box)({
  paddingLeft: 10,
  paddingRight: 10,
  display: 'inline-flex',
  alignItems: 'center'
});

export const TitleEdit = styled(Typography)({
  fontSize: 12,
  fontFamily: 'Open Sans',
  fontWeight: 600,
  color: '#2B353B',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  }
});

export const WrapperEditor = styled(Box)({
  '& .ql-editor ': {
    position: 'relative',
    height: '80px !important',
    fontFamily: 'Open Sans',
    fontSize: 12
  },
  padding: 0,
  // width: "100%"
});

export const useStyles = makeStyles(() =>
  createStyles({
    wrapperCard: {
      fontFamily: 'Open Sans',
      fontSize: 14,
      width: 700,
      border: 'solid 1px #F0F0F0',
      marginTop: 10,
      boxShadow: 'none',
      borderRadius: 10,
      marginLeft: '9px',
      paddingTop: 20,
      paddingBottom: 20,
      flexDirection: 'column',
      minHeight: 80,
      paddingLeft: 20,
      marginBottom: 20,
      paddingRight: 8,
      position: 'relative',
    },
    dividerAndDateCard: {
      display: 'flex',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center'
    },

    wrapperContent: {
      padding: 13
    },
    titleCard: {
      fontWeight: 'bold',
      marginTop: 4,
      marginBottom: 4,
      fontFamily: 'Open Sans',
      'max-width': 242,
      overflow: 'hidden',
      'white-space': 'nowrap',
      'text-overflow': 'ellipsis'
    },
    dateCard: {
      padding: '14px 2px 0px 12px',
      fontSize: 12,
      display: 'flex',
      fontFamily: 'Open Sans',
      justifyContent: 'space-between',
    },
    authorName: {
      color: '#323130',
      paddingTop: 14,
      fontFamily: 'Open Sans',
      textAlign: 'right',
      fontSize: 12,
      right: 10,
      bottom: 10,
    },
    wrapperDescription: {
      color: '#323130',
      fontSize: 12,
      fontFamily: 'Open Sans',
      whiteSpace: 'pre-line',
      width: 242,
      overflowWrap: 'break-word',
    },
    tooltipTitle: {
      fontSize: 12,
      fontFamily: 'Open Sans',
    },
    divider: {
      width: '100%',
      background: 'rgba(0, 0, 0, 0.08)',
    },
    wrapperComment: {
      display: 'flex',
      flexDirection: 'column'
    },
    containerCard: {
      display: 'flex',
      justifyItems: 'center',
      flexDirection: 'column'
    },
    wrapperText: {
      // width: '100%',
      paddingTop: 20,
      color: '#808689',
    }
  })
);
