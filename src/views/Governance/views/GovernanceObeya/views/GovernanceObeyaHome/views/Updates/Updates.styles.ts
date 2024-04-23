import { Box, Typography, Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';

export const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    borderRadius: "10px",
    height: "10px",
    width: "10px",
    backgroundColor: "#F7F7F7"
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "20px",
    backgroundColor: "#D1D2D3",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    borderRadius: "20px",
  },
};

export const Wrapper = styled(Box)({
  // padding: 30,
  background: '#f0f0f0',
  overflowY: 'auto',
  marginTop: 20,
  height: '98%',
  width: '100%',
  ...scrollbarStyle
});

export const WrapperButtonFilter = styled(Box)({
  width: 530,
  display: 'flex',
  justifyContent: 'space-between',
  textTransform: 'lowercase',
  marginBottom: 50
});

export const ButtonFilter = styled(Button)({
  background: '#e0e0e0',
  fontFamily: 'Open Sans',
  color: '#2B353B',
  '&:hover, active': {
    background: '#0077C8',
    color: '#fff'
  }
});

export const WrapperCard = styled(Box)({
  marginLeft: 45,
  paddingRight: 20
});

export const WrapperCardList = styled(Box)({
  marginTop: 30,
});

export const ListTitle = styled(Typography)({
  marginTop: 28,
  fontFamily: 'Open Sans',
  fontSize: 18,
  fontWeight: 600,
  color: '#2B353B',
  marginBottom: 10
});

export const WrapperHighlightsValueCard = styled(Box)({
  width: 350,
  height: 327,
  display: 'flex',
  padding: '1rem 0px',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const WrapperEmptyHighlightsValueCard = styled(Box)({
  '@media (max-width: 1760px)': {
    height: 'auto',
    position: 'absolute',
    right: -70,
    top: 0,
  },
  '@media (max-width: 1765px)': {
    height: 'auto',
    position: 'absolute',
    right: -35,
    top: 0,
  },
  '@media (max-width: 1773px)': {
    height: 'auto',
    position: 'absolute',
    right: -33,
    top: 0,
  },
  '@media (max-width: 1780px)': {
    height: 'auto',
    position: 'absolute',
    right: -35,
    top: 0,
  },
});

export const WrapperEmptyHighlightsValueCardSecond = styled(Box)({
  '@media (max-width: 1704px)': {
    height: 'auto',
    position: 'absolute',
    right: -45,
    top: 0,
  },
  '@media (max-width: 1765px)': {
    height: 'auto',
    position: 'absolute',
    right: -40,
    top: 0,
  },
  '@media (max-width: 1766px)': {
    height: 'auto',
    position: 'absolute',
    right: -26,
    top: 0,
  },
  '@media (max-width: 1775px)': {
    height: 'auto',
    position: 'absolute',
    right: -45,
    top: 0,
  },
  '@media (max-width: 1783px)': {
    height: 'auto',
    position: 'absolute',
    right: -40,
    top: 0,
  },

});
