import { styled } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export const BoxMessage = styled(Box)({
  fontFamily: 'Open Sans',
  fontSize: '13px !important',
  color: '#323130',
  marginBottom: 16,
});

export const BoxButtonClick = styled(Box)({
  fontFamily: 'Open Sans',
  fontSize: '13px !important',
  color: '#323130'
});

export const CustomAddIcon = styled(AddIcon)({
  width: 22,
  height: 22 
});

export const Wrapper = styled(Box)({
  marginTop: 30 
});
