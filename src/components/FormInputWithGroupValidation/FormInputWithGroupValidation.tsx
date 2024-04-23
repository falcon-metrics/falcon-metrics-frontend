import { HTMLProps, useCallback } from 'react';
import { RegisterOptions, UseFormReturn } from 'react-hook-form';
import MUIFormInput from 'components/UI/MUIFormInput';
import memo from 'utils/typescript/memo';

export type Props = {
  groupNameInForm: string;
  rowIndex: number;
  fieldKeyInRow?: string;
  registerOptions?: RegisterOptions;
  validateFunction: (values: any[]) => boolean;
  getErrorMessage: (values: any[]) => string;
  formMethods: UseFormReturn;
} & HTMLProps<HTMLInputElement>;

function InputWithGroupValidation(props: Props) {
  const {
    groupNameInForm,
    rowIndex,
    fieldKeyInRow,
    registerOptions,
    validateFunction,
    getErrorMessage,
    formMethods,
    ...innerProps
  } = props;
  const fieldNameInForm = getFieldNameInForm(props);
  const { getValues, setError, clearErrors, register } = formMethods;

  const validate = useCallback(
    (value: any) => {
      const rows: any[] = getValues(groupNameInForm);
      const values = fieldKeyInRow ? rows.map((r) => r[fieldKeyInRow]) : rows;
      values[rowIndex] = value;
      const isValid = validateFunction(values);
      const errorMessage = getErrorMessage(values);
      values.forEach((_, i) => {
        const fieldName = `${groupNameInForm}.${i}${getFieldKey(
          fieldKeyInRow,
        )}`;
        if (isValid) {
          clearErrors(fieldName);
        } else {
          setError(fieldName, { message: errorMessage });
        }
      });
      return isValid || errorMessage;
    },
    [
      validateFunction,
      getErrorMessage,
      clearErrors,
      getValues,
      setError,
      fieldKeyInRow,
      groupNameInForm,
      rowIndex,
    ],
  );

  return (
    <MUIFormInput
      registrationProps={register(fieldNameInForm, {
        validate,
        ...registerOptions,
      })}
      {...innerProps}
    />
  );
}

function getFieldNameInForm({
  groupNameInForm,
  rowIndex,
  fieldKeyInRow,
}: Props) {
  const fieldKey = getFieldKey(fieldKeyInRow);
  const fieldNameInForm = `${groupNameInForm}.${rowIndex}${fieldKey}`;
  return fieldNameInForm;
}

function getFieldKey(fieldKeyInRow?: string) {
  return fieldKeyInRow ? `.${fieldKeyInRow}` : '';
}

export default memo(InputWithGroupValidation);
