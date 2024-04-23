import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import { Accordion, Box, MenuItem, Select } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import Input from 'views/Governance/views/GovernanceObeya/components/Input';
import TextEditor from '../TextEditor';

export const WrapperSelect = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 20
});

export const WrapperDatePicker = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: 312,
  marginTop: 10,
});

export const WrapperObjectives = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const WrapperObjectivesDropdwon = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginTop: 12
});

export const WrapperDropdown = styled(Box)({
  marginTop: 10,
});

export const Label = styled(Box)({
  color: '#2B353B',
  fontFamily: 'Open Sans',
  fonSizr: 12,
  fontWeight: 'bold',
  marginTop: 10
});

export const TitleWrapperSelect = styled(Box)({
  fontFamily: 'Open Sans',
  fontSize: 10,
  marginTop: 10,
});

export const CustomMenuItem = styled(MenuItem)({
  padding: 10,
  fontSize: 14,
  fontFamily: 'Open Sans',
  color: '#555D62'
});

export const CustomMenuItemTitle = styled(Box)({
  fontSize: 14,
  fontFamily: 'Open Sans',
  color: '#555D62'
});

export const WrapperEditor = styled(Box)({
  '& .ql-editor ': {
    position: 'relative',
    width: "100%",
    height: '80px !important',
    fontFamily: 'Open Sans',
    minHeight: 93,
    fontSize: 12
  }
});

export const WrapperButton = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 10,
});

export const CustomTextEditor = styled(TextEditor)({
  '.ql-editor': {
    maxHeight: '60px !important',
  }
});

export const ContainerCard = styled(Box)({
  display: 'flex',
  justifyItems: 'center',
  flexDirection: 'column',
  margin: 0,
  flex: 1
});

export const NotesWrapperEditor = styled(Box)({
  '& .ql-editor ': {
    position: 'relative',
    height: '80px !important',
    fontFamily: 'Open Sans',
    minHeight: 193,
    fontSize: 12,
    width: "100%",
  },
  paddingRight: 20
});

export const WrapperInitiative = styled(Box)({
  '& .MuiInput-underline:before': {
    borderBottom: '0px !important',
  },
  '& .MuiInput-underline:after': {
    borderBottom: '0px !important',
  },
});

export const WrapperEmptyState = styled(Box)({
  marginTop: 20,
  flexShrink: 1,
  width: "96%",
  minWidth: 765,
  minHeight: 80,
  background: '#F9F9F9',
  fontFamily: 'Open Sans',
  fontSize: 12,
  fontWeight: 400,
  padding: 12,
  cursor: 'text',
  color: '#808689',
  borderRadius: 8,
  border: '2px solid #ECECEC',
  transition: 'border-color 0.3s ease-in-out',

  '&:hover': {
    border: '2px solid #0077C8',
  },
});

export const NotesWrapperEmptyState = styled(WrapperEmptyState)({
  // width: "103%",
  minWidth: "103%",
});

export const activeTextField = {
  marginTop: 20,
  flexShrink: 1,
  minHeight: 100,
  background: '#F9F9F9',
  fontFamily: 'Open Sans',
  fontSize: 12,
  fontWeight: 400,
  padding: 2,
  cursor: 'text',
  color: '#808689',
  borderRadius: 8,
  transition: 'border-color 0.3s ease-in-out',
  marginBottom: 20
};

export const notesTextEditor = {
  minWidth: "103%",
  maxWidth: "100%",
  width: '100%',
  height: 200
};

export const CustomSelect = styled(Select)({
  width: 300,
  fontFamily: 'Open Sans',
  borderRadius: 4,
  padding: "1px 8px"
});

export const CustomInput = styled(Input)({
  width: 300,
  fontFamily: 'Open Sans',
});

export const StyledAccordion = styled(Accordion)({
  border: '1px solid #f0f0f0',
  boxShadow: 'none'
});

export const useStyles = makeStyles(() =>
  createStyles({
    wrapperCard: {
      // width: "100%",
      paddingBottom: 26,
      background: '#fefefe',
      fontSize: 14,
      fontFamily: 'Open Sans',
      borderRadius: 16,
      boxShadow: '0px 2px 11px 0px #dcdcdc',
      position: 'relative',
      paddingLeft: 30,
      paddingRight: 30,
      maxWidth: "80%"
    },
    wrapperCardSkeleton: {
      width: 270,
      height: 150,
      marginTop: 14,
      background: '#fcfcfc',
      fontSize: 14,
      fontFamily: 'Open Sans',
      borderRadius: 8,
      boxShadow: '0px 2px 11px 0px #dcdcdc',
      position: 'relative',
      padding: 10
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
    buttonAction: {
      paddingTop: 10,
      paddingRight: 0,
      height: 10,
      fontFamily: 'Open Sans',
      justifyContent: 'flex-end',
      color: '#555D62',
      '&:hover': {
        backgroundColor: 'transparent'
      },
    },
    buttonActionItem: {
      fontSize: 14,
      fontFamily: 'Open Sans',
    },
    seeMoreDate: {
      fontSize: 14,
    },
    authorName: {
      color: '#323130',
      paddingTop: 14,
      fontFamily: 'Open Sans',
      textAlign: 'right',
      fontSize: 12,
      position: 'absolute',
      right: 10,
      bottom: 10,
    },
    seeMoreAuthorName: {
      color: '#323130',
      paddingTop: 14,
      fontFamily: 'Open Sans',
      textAlign: 'right',
      fontSize: 12,
      position: 'absolute',
      right: 34,
      bottom: 18,
    },
    wrapperDescription: {
      color: '#323130',
      fontSize: 12,
      fontFamily: 'Open Sans',
      whiteSpace: 'pre-line',
      width: 242,
      overflowWrap: 'break-word',
    },
    seeMoreButton: {
      'text-transform': 'lowerCase',
      '&:hover': {
        background: 'none',
        textDecoration: 'underline',
      },
      position: 'absolute',
      fontFamily: 'Open Sans',
      width: 78,
      fontSize: 12,
      padding: 3,
      left: 2,
      bottom: 22,
      color: '#4A9AD7'
    },
    seeMoreTitle: {
      marginTop: 14,
      fontFamily: 'Open Sans',
      fontSize: 16,
      fontWeight: 'bold'
    },
    seeMoreDescription: {
      fontFamily: 'Open Sans',
      height: 100,
      width: '100%',
      paddingTop: 10
    },
    tooltipTitle: {
      fontSize: 12,
      fontFamily: 'Open Sans',
    },
    percentSymbol: {
      color: '#a2a2a2'
    },
    riskInput: {
      margin: 0,
      width: 360,
    }
  })
);
