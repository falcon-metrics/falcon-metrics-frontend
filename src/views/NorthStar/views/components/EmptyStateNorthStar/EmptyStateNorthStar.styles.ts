import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';

export const WrapperTitleAndContent = styled(Box)({
  marginBottom: 10
});

export const WrapperMessage = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const BoxMessage = styled(Box)({
  fontFamily: 'Open Sans',
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#323130',
  marginBottom: 16,
  width: 1000,
  textAlign: 'center'
});

export const ContentTitle = styled(Box)({
  fontFamily: 'Open Sans',
  fontSize: 15,
  opacity: 0.5,
  marginTop: 10
});

export const WrapperTitles = styled(Box)({
  width: 600,
});

export const BoxButtonClick = styled(Box)({
  fontFamily: 'Open Sans',
  fontSize: '14px',
  background: '#0077c8',
  borderRadius: 5,
  padding: 10,
  color: '#fff',
  cursor: 'pointer'
});

export const CustomAddIcon = styled(AddIcon)({
  width: 22,
  height: 22 
});

export const Wrapper = styled(Box)({
  minHeight: 600,
});

export const VisionTitle = styled(Box)({
  color: '#2B353B',
  fontSize: 16,
  marginTop: '1rem',
  fontWeight: 'bold',
  fontFamily: 'Open sans',
  opacity: 0.5
});

export const MissionTitle = styled(Box)({
  color: '#2B353B',
  fontSize: 16,
  marginTop: 5,
  fontWeight: 'bold',
  fontFamily: 'Open sans',
  marginBottom: 0,
  opacity: 0.5
});

export const StrategicDriversTitle = styled(Box)({
  color: '#2B353B',
  fontSize: 16,
  marginTop: 5,
  fontWeight: 'bold',
  fontFamily: 'Open sans',
  marginBottom: 5,
  opacity: 0.5
});

export const DividerLine = styled(Divider)({
  width: 23,
  marginTop: 5,
  color: '#00bfb2',
  backgroundColor: '#00bfb2',
  height: 3,
  borderRadius: 4
});
