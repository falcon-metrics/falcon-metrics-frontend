import { MenuItem } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import BaseSelect from 'components/UI/BaseSelect';
import BaseTextField from 'components/UI/BaseTextField';
import BaseCurrencyField from 'components/UI/BaseCurrencyField/BaseCurrencyField';

export const ContextTreeItem = styled('div')({
  margin: 4,
  display: 'flex',
  alignItems: 'center',
});

export const ContextInput = styled(BaseTextField)({
  margin: 6,
  width: 375,
  paddingLeft: 10,
  '& .MuiInput-underline:before': {
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
});

export const ContextSelect = styled(BaseSelect)({
  margin: 6,
  width: 375,
  paddingLeft: 10,
  '& .MuiInput-underline:before': {
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
});

export const CurrencyTextField = styled(BaseCurrencyField)({
  margin: 6,
  width: 375,
  paddingLeft: 5,
  '& .MuiInput-underline:before': {
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
});

export const CustomMenuItem = styled(MenuItem)({
  fontFamily: 'Open Sans',
  '& .Mui-checked > span > svg > path': {
    fill: 'rgb(0, 120, 212)'
  },
});
