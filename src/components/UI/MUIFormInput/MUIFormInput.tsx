import { HTMLProps } from 'react';
import { UseFormRegisterReturn, useFormState } from 'react-hook-form';
import './MUIFormInput.css';
import { useSnackbar } from 'notistack';
import get from 'lodash/get';
import Spinner from './components/MUIFormInputSpinner/MUIFormInputSpinner';
import TextField from '@material-ui/core/TextField';
import { InputState } from './interfaces/InputState';

export type ValidationRule = (str: string) => Promise<boolean>;
export type ValidationFinishCallback = (isValid: boolean) => any;

const parentDivMuiClasses =
  'MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth';
const middleDivMuiClasses = `MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth 
    MuiInput-fullWidth MuiInputBase-formControl MuiInput-formControl`;
const inputMuiClasses = 'MuiInputBase-input MuiInput-input0';

export type Props = {
  registrationProps: UseFormRegisterReturn;
  inputState?: InputState;
} & HTMLProps<HTMLInputElement>;

function MUIFormInput({ registrationProps, inputState, ...props }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { errors } = useFormState();
  const errorMessage = get(errors, registrationProps.name + '.message') as
    | string
    | undefined;

  const onBlur = async (e) => {
    await registrationProps?.onBlur(e);
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  if (!inputState || (errorMessage && inputState !== InputState.Validating)) {
    inputState = errorMessage ? InputState.Invalid : InputState.Neutral;
  }

  // TODO: Find a way to use MUI here without breaking form's state
  return (
    <div className={parentDivMuiClasses}>
      <TextField style={{ display: 'none' }} />
      <div
        className={[
          inputState,
          'MUI-copy-input-middle-div',
          middleDivMuiClasses,
        ].join(' ')}
      >
        <input
          className={inputMuiClasses + ' MUI-copy-input-input'}
          {...registrationProps}
          onBlur={onBlur}
          {...props}
        />
        <Spinner isVisible={inputState === InputState.Validating} />
      </div>
    </div>
  );
}

export default MUIFormInput;
