import { styled } from '@material-ui/styles';
import BaseTextField from 'components/UI/BaseTextField';
import BaseSelect from '../BaseSelect';
import BaseCurrencyField from 'components/UI/BaseCurrencyField';

export const ContextTreeItem = styled('div')({
  margin: 4,
  display: 'flex',
  alignItems: 'center',
});

export const ContextSelect = styled(BaseSelect)({
  margin: 6,
  width: 375,
  paddingLeft: 10,
  '& .MuiInput-underline:before': {
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
});

export const ContextInput = styled(BaseTextField)({
  margin: 6,
  width: 375,
  paddingLeft: 10,
  '& .MuiInput-underline:before': {
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
});

export const CurrencyTextField = styled(BaseCurrencyField)({
  margin: 6,
  width: 400,
  paddingLeft: 5,
  '& .MuiInput-underline:before': {
    borderColor: 'rgba(0, 0, 0, 0.10)',
  },
});
