import {
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { styled } from '@material-ui/styles';

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

export const ActionText = styled(Typography)({
  fontSize: 12,
  fontFamily: 'Open Sans , sans-serif',
  paddingTop: 2,
  paddingRight: 10
});
export const WrapperButton = styled(Box)({
  width: 930,
  display: 'flex',
  justifyContent: 'flex-end',
});

export const ContainerCard = styled(Box)({
  display: 'flex',
  justifyItems: 'center',
  flexDirection: 'column',
  paddingBottom: 20,
  margin: 0,
  flex: 1,
  height: 280,
  overflowY: "auto"
});

export const NotesWrapperEditor = styled(Box)({
  '& .ql-editor ': {
    position: 'relative',
    height: '80px !important',
    fontFamily: 'Open Sans',
    minHeight: 193,
    fontSize: 12,
    width: "100%",
  }
});

export const notesTextEditor = {
  width: "90%",
  marginBottom: 10,
  height: 200
};

export const WrapperStatusChangedInitiative = styled(Box)({
  marginTop: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  justifyItems: 'flex-start',
  minHeight: 30,
});



export const BoxStatusChangedInitiative = styled(Box)({
  display: 'flex',
  minWidth: 300,
  height: 30,
  paddingLeft: 16,
});

export const WrapperContent = styled(Box)({
  // paddingLeft: 14,
});

export const TitleStatusChangedRisk = styled(Typography)({
  color: '#2B353B',
  fontFamily: 'Open Sans',
  fontWeight: 600,
  fontSize: 14,
  alignItems: 'center',
  display: 'flex',
});

export const WrapperStatusChangedRisk = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 16,
  paddingRight: 16,
});

export const BoxStatusChangedRisk = styled(Box)({
  display: 'flex',
  minWidth: 300,
  marginBottom: 3
});

export const WrapperDatePickerTitleRisk = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 200,
});

export const WrapperDatePickerContentRisk = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 260,
});

export const TitleDateRisk = styled(Box)({
  color: '#2B353B',
  fontFamily: 'Open Sans',
  fonSizr: 12,
  fontWeight: 'bold',
  marginTop: 10
});

export const LabelStatusBeforeRisk = styled(Box)({
  padding: 5,
  background: '#FFEED5',
  color: '#FF9E1B',
  textTransform: 'capitalize',
  borderRadius: 6,
});

export const LabelStatusAfterRisk = styled(Box)({
  padding: 5,
  background: '#F0F0F0',
  color: '#2B353B',
  width: 100,
  textAlign: 'center',
  textTransform: 'capitalize',
  borderRadius: 6,
});

export const TitleShare = styled(Typography)({
  fontSize: 12,
  fontFamily: 'Open Sans',
  fontWeight: 600,
  color: '#2B353B'
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

export const WrapperActions = styled(Box)({
  display: 'flex',
  height: 30,
  alignItems: 'center',
  justifyContent: 'space-between',
  '& > p': {
    marginLeft: 10,
  },
  marginTop: 20,
  marginLeft: 5
});

export const ChangedDataWrapper = styled(Box)({
  display: 'flex',
  paddingLeft: 16,
  paddingRight: 16,
  minHeight: 30,
  marginBottom: 3,
  minWidth: 300,
  height: 30,
});

export const DataWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 200,
});

export const Title = styled(Typography)({
  color: '#2B353B',
  fontFamily: 'Open Sans',
  fontWeight: 600,
  fontSize: 14,
  alignItems: 'center',
  display: 'flex',
});

export const ValueWrapper = styled(Box)({
  padding: 5,
  background: '#F0F0F0',
  color: '#2B353B',
  textTransform: 'capitalize',
  borderRadius: 6,
  height: 30,
  minWidth: 150,
  textAlign: 'center'
});

export const ChangedDataWrapperSmall = styled(Box)({
  display: 'flex',
  paddingLeft: 16,
  paddingRight: 16,
  minHeight: 30,
  marginBottom: 3,
  height: 30,
  fontSize: 12
});

export const DataWrapperSmall = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const TitleSmall = styled(Typography)({
  color: '#2B353B',
  fontFamily: 'Open Sans',
  fontWeight: 600,
  fontSize: 12,
  alignItems: 'center',
  display: 'flex',
  marginRight: 10,
  whiteSpace: 'nowrap'
});

export const ValueWrapperSmall = styled(Box)({
  padding: 5,
  background: '#F0F0F0',
  color: '#2B353B',
  textTransform: 'capitalize',
  borderRadius: 6,
  height: 30,
  textAlign: 'center',
  fontSize: 12,
  whiteSpace: 'nowrap'
});

export const Ellipse = styled(Box)({
  width: 4,
  height: 4,
  borderRadius: '50%',
  background: '#2B353B'
});

export const WrapperEllipse = styled(Box)({
  paddingLeft: 10,
  paddingRight: 10,
  display: 'flex',
  paddingTop: 8
});

export const WrapperEmojis = styled(Box)({
  display: 'flex',
  width: 400,
  justifyContent: 'space-between',
});

export const WrapperTitleReplies = styled(Box)({
  color: '#999ea0',
  fontFamily: 'Open Sans',
  display: 'flex',
  alignItems: 'center'
});

export const FlexCenterBox = styled(Box)({
  display: 'flex',
  alignItems: 'center'
});

export const WrapperDatePickerTitle = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 200,
});

export const WrapperDatePickerContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: 260,
});

export const TitleDate = styled(Box)({
  color: '#2B353B',
  fontFamily: 'Open Sans',
  fonSizr: 12,
  fontWeight: 'bold',
  marginTop: 10
});

export const WrapperStatusCard = styled(Box)({
  display: 'flex',
  border: 'solid 1px #F0F0F0',
  flexDirection: 'column',
  borderRadius: 10,
  paddingBottom: 10,
  paddingTop: 10,
  marginTop: 16
});

export const WrapperText = styled(Box)({
  paddingTop: 20,
  color: "#808689",
  marginBottom: 16
});

export const useStyles = makeStyles(() =>
  createStyles({
    wrapperCard: {
      // width: "98%",
      paddingBottom: 26,
      marginTop: 30,
      background: '#fcfcfc',
      fontSize: 14,
      fontFamily: 'Open Sans',
      borderRadius: 16,
      boxShadow: '0px 2px 11px 0px #dcdcdc',
      position: 'relative',
      padding: 30,
      marginLeft: 10,
      maxWidth: "90%"
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
  })
);
