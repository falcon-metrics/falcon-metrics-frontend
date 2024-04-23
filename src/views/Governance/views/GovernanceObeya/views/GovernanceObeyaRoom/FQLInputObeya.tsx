import {
  HTMLProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { InputState } from "components/UI/MUIFormInput";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import validateFQL from "core/api/ValidadeFQL";
import debounce from "lodash/debounce";
import { RegisterOptions } from "react-hook-form";
import memo from "utils/typescript/memo";
import Input from "views/Governance/views/GovernanceObeya/components/Input";
import Box from "@material-ui/core/Box";

export type Props = {
  fieldNameInForm: string;
  displayName?: string;
  registerOptions?: RegisterOptions;
  formState?: any;
  getValues?: any;
  register?: any;
  control: any;
  errors: any;
  classes: any;
  setValidate?(isValidating: boolean): void;
  validatingFql: boolean;
  setError?: any;
  clearErrors?: any;
  placeholder?: string;
  defaultValue?: any;
} & HTMLProps<HTMLInputElement>;

function FQLInputObeya({
  fieldNameInForm,
  registerOptions,
  register,
  setValidate,
  setError,
  control,
  errors,
  validatingFql,
  classes,
  clearErrors,
  placeholder,
}: Props) {
  const initialState = InputState.Neutral;
  const [inputState, setInputState] = useState<InputState>(initialState);

  const queryRef = useRef();
  const isNotRequired =
    !registerOptions || !Object.keys(registerOptions).includes("required");

  const getIsQueryValid = useCallback(
    async (query: string) => {
      if (!query) {
        clearErrors(fieldNameInForm);
        setInputState(InputState.Neutral);
        return;
      }

      const isEmptyAndNotRequired = isNotRequired && !query;
      return (
        isEmptyAndNotRequired ||
        validateFQL(query ?? "", undefined, undefined, "/fql-obeya-validation")
      );
    },
    [isNotRequired]
  );

  const checkFilterExpression = useCallback(
    (event) => {
      const value = event.target.value;
      console.log("Value..", value);
      if (!value) {
        clearErrors(fieldNameInForm);
        setInputState(InputState.Neutral);
        return;
      }

      setValidate?.(true);
      getIsQueryValid(value).then((storedQueryIsValid) => {
        const error = "FQL Query is Invalid";
        if (!storedQueryIsValid) {
          setError?.(fieldNameInForm, {
            type: "manual",
            message: error,
          });
        }
        setValidate?.(false);

        const invalidOrEmpty =
          value && !storedQueryIsValid
            ? InputState.Invalid
            : InputState.Neutral;

        const newState = storedQueryIsValid ? InputState.Valid : invalidOrEmpty;
        setInputState(newState);
      });
    },
    [getIsQueryValid, setInputState, fieldNameInForm, setError, setValidate]
  );

  const debounceValidateExpression = useMemo(
    () => debounce(checkFilterExpression, 1000),
    [checkFilterExpression]
  );

  const onValidateFilterExpression = useCallback(debounceValidateExpression, [
    debounceValidateExpression,
  ]);

  useEffect(() => {
    inputState === InputState.Valid && clearErrors(fieldNameInForm);
  }, [clearErrors, inputState, fieldNameInForm]);

  const inputStateStyles = {
    [InputState.Valid]: classes.valid,
    [InputState.Invalid]: classes.inValid,
    [InputState.Validating]: classes.loading,
    [InputState.Neutral]: "",
  };

  return (
    <Box style={{ position: "relative" }}>
      <Input
        {...register(fieldNameInForm)}
        required
        fullWidth
        ref={queryRef}
        inputState={inputState}
        name={fieldNameInForm}
        placeholder={
          placeholder
            ? placeholder
            : "workItemType = 'feature' OR workItemType = 'bug'"
        }
        control={control}
        afterChange={onValidateFilterExpression}
        InputLabelProps={{
          classes: {
            root: inputStateStyles[inputState],
          },
        }}
        errors={errors}
        classes={classes}
        multiline
        rowsMax={4}
        inputProps={{
          style: {
            resize: "vertical",
          },
        }}
      />
      <Spinner
        isVisible={validatingFql}
        style={{
          top: inputState === InputState.Invalid ? -44 : -22,
          right: -7,
        }}
      />
    </Box>
  );
}

export default memo(FQLInputObeya);
