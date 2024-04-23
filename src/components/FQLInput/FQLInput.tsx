import {
  HTMLProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { InputState } from "components/UI/MUIFormInput";
import { useSnackbar } from "notistack";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { useWizardContext } from "views/SetupWizard/contexts/useWizardContext";
import { WizardRouteParams } from "views/SetupWizard/interfaces/WizardRouteParams";

import validateFQL from "../../core/api/ValidadeFQL";
import Checkbox from "@material-ui/core/Checkbox";
import { Box, FormControlLabel } from "@material-ui/core";

const initialState = InputState.Neutral;
const debounceTime = 700;
import MUIFormTextarea from "components/UI/MUIFormInput/MUIFormTextarea";

export type Props = {
  fieldNameInForm: string;
  displayName?: string;
  registerOptions?: RegisterOptions;
  defaultValueForOnlyIncludeChildren?: boolean;
  defaultValueForAlsoIncludeChildren?: boolean;
  fieldNameForAlsoIncludeChildren?: string;
  fieldNameForOnlyIncludeChildren?: string;
  checkboxVerb?: "fetch" | "exclude" | "block" | "discard";
} & HTMLProps<HTMLTextAreaElement> &
  Pick<WizardRouteParams, "provider" | "namespace">;

function applyCheckboxStyleIntoState(
  span: HTMLElement,
  state: boolean | undefined
) {
  if (state) {
    span.classList.add("Mui-checked", "PrivateSwitchBase-checked-233");
    const svgPath = span.querySelector("svg > path[d]");
    if (svgPath) {
      svgPath.setAttribute(
        "d",
        "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      );
    }
  } else {
    for (let i = span.classList.length - 1; i >= 0; i--) {
      const className = span.classList[i];
      if (className.includes("-checked")) {
        span.classList.remove(className);
      }
    }
    const svgPath = span.querySelector("svg > path[d]");
    if (svgPath) {
      svgPath.setAttribute(
        "d",
        "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
      );
    }
  }
}

function FQLInput({
  fieldNameInForm,
  displayName,
  registerOptions,
  namespace,
  provider,
  defaultValueForAlsoIncludeChildren,
  defaultValueForOnlyIncludeChildren,
  fieldNameForAlsoIncludeChildren,
  fieldNameForOnlyIncludeChildren,
  checkboxVerb,
  ...props
}: Props) {
  const {
    setValue,
    register,
    getValues,
    formState,
  } = useFormContext();
  const { setIsDirty } = useWizardContext();
  const { enqueueSnackbar } = useSnackbar();
  const enqueueErrorSnackbar = (message: string) =>
    enqueueSnackbar(message, { variant: "error" });

  const storedQuery = useRef<string>(getValues(fieldNameInForm));

  const timeoutRef = useRef<NodeJS.Timeout>();

  const alsoIncludeRef = useRef<any>();
  const onlyIncludeRef = useRef<any>();

  const [inputState, setInputState] = useState<InputState>(initialState);

  // when the form isDirty we need to update the contextAPI state
  useEffect(() => {
    if (inputState === InputState.Valid) {
      setIsDirty(formState.isDirty);
    }
  }, [formState.isDirty, inputState]);

  const namePartOfErrorMessage = displayName ? `for "${displayName}"` : "";
  const isNotRequired =
    !registerOptions || !Object.keys(registerOptions).includes("required");

  const debouncedValidateFQL = (query: string): Promise<boolean> => {
    const getIsQueryValid = async (query: string) => {
      const isEmptyAndNotRequired = isNotRequired && !query;
      return isEmptyAndNotRequired || validateFQL(query, provider, namespace);
    };
    return new Promise((resolve) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(async () => {
        setInputState(InputState.Validating);
        const isValid = await getIsQueryValid(query);
        resolve(isValid);
      }, debounceTime);
    });
  };

  const latestValidationPromiseRef = useRef<Promise<boolean | undefined>>(
    Promise.resolve(true)
  );

  const validate = (query: string) => {
    const previousQuery = storedQuery.current;
    storedQuery.current = query;

    if (previousQuery !== query) {
      // Promise is only reset if query changes
      latestValidationPromiseRef.current = debouncedValidateFQL(query)
        .catch(() => {
          latestValidationPromiseRef.current.catch(() => {
            enqueueErrorSnackbar(
              "Connection with query validator couldn't be stabilished. Please wait or check your internet connection."
            );
            setInputState(InputState.Neutral);
          });
          return undefined;
        })
        .then((isValid) => {
          // Must use reference to the latest promise, which will be equal to it's own result if
          // it's the latest.
          latestValidationPromiseRef.current.then(async (isValid) => {
            setInputState(isValid ? InputState.Valid : InputState.Invalid);
          });
          return isValid;
        });
    }

    return (
      latestValidationPromiseRef.current.then((isValid) => {
        latestValidationPromiseRef.current.then((isValid) => {
          if (isValid === false) {
            enqueueErrorSnackbar(
              `FQL Query ${namePartOfErrorMessage} is Invalid`
            );
          }
        });
        return !!isValid;
      }) || "FQL Query is Invalid"
    );
  };

  // Register checkboxes changes on the form so that react knows when the user updated it
  // This is so the save button gets enabled (because of the dirty form state)
  const registerAlsoInclude = useMemo(
    function () {
      if (!fieldNameForAlsoIncludeChildren) {
        return undefined;
      }
      return register(fieldNameForAlsoIncludeChildren, {
        value: defaultValueForAlsoIncludeChildren,
        validate: () => {
          return true;
        },
      });
    },
    [fieldNameForAlsoIncludeChildren]
  );

  const registerOnlyInclude = useMemo(
    function () {
      if (!fieldNameForOnlyIncludeChildren) {
        return undefined;
      }
      return register(fieldNameForOnlyIncludeChildren, {
        value: defaultValueForOnlyIncludeChildren,
        validate: () => {
          return true;
        },
      });
    },
    [fieldNameForOnlyIncludeChildren]
  );

  const [alsoIncludeChildrenChecked, setAlsoIncludeChildrenChecked] = useState(
    fieldNameForAlsoIncludeChildren
      ? getValues(fieldNameForAlsoIncludeChildren)
      : false
  );
  const [onlyIncludeChildrenChecked, setOnlyIncludeChildrenChecked] = useState(
    fieldNameForOnlyIncludeChildren
      ? getValues(fieldNameForOnlyIncludeChildren)
      : false
  );

  useEffect(() => {
    if (fieldNameForAlsoIncludeChildren) {
      const checkedAlso = getValues(fieldNameForAlsoIncludeChildren);
      if (alsoIncludeChildrenChecked !== checkedAlso) {
        // console.log('Updating also=', checkedAlso);
        setAlsoIncludeChildrenChecked(checkedAlso);
        if (alsoIncludeRef && alsoIncludeRef.current) {
          applyCheckboxStyleIntoState(alsoIncludeRef.current, checkedAlso);
        }
      }
    }
    if (fieldNameForOnlyIncludeChildren) {
      const checkedOnly = getValues(fieldNameForOnlyIncludeChildren);
      if (onlyIncludeChildrenChecked !== checkedOnly) {
        // console.log('Updating only=', checkedOnly);
        setOnlyIncludeChildrenChecked(checkedOnly);
        if (onlyIncludeRef && onlyIncludeRef.current) {
          applyCheckboxStyleIntoState(onlyIncludeRef.current, checkedOnly);
        }
      }
    }
  }, [
    alsoIncludeChildrenChecked,
    onlyIncludeChildrenChecked,
    fieldNameForAlsoIncludeChildren
      ? getValues(fieldNameForAlsoIncludeChildren)
      : null,
    fieldNameForOnlyIncludeChildren
      ? getValues(fieldNameForOnlyIncludeChildren)
      : null,
  ]);

  const handleAlsoIncludeCheckboxChange = useCallback(
    function () {
      if (!fieldNameForAlsoIncludeChildren || !registerAlsoInclude) {
        return;
      }
      const checked = !getValues(fieldNameForAlsoIncludeChildren);
      if (
        checked &&
        registerOnlyInclude &&
        fieldNameForOnlyIncludeChildren &&
        getValues(fieldNameForOnlyIncludeChildren)
      ) {
        // console.log('The other checkbox (also) was active and it will be unchecked');
        setValue(fieldNameForOnlyIncludeChildren, false);
        if (onlyIncludeRef && onlyIncludeRef.current) {
          applyCheckboxStyleIntoState(onlyIncludeRef.current, false);
        }
        setOnlyIncludeChildrenChecked(false);
        registerOnlyInclude.onChange({
          type: "change",
          target: {
            name: fieldNameForOnlyIncludeChildren,
            type: "checkbox",
            checked: false,
          },
        });
      }

      setValue(fieldNameForAlsoIncludeChildren, checked);
      if (alsoIncludeRef && alsoIncludeRef.current) {
        applyCheckboxStyleIntoState(alsoIncludeRef.current, checked);
      }
      setAlsoIncludeChildrenChecked(checked);
      registerAlsoInclude.onChange({
        type: "change",
        target: {
          name: fieldNameForAlsoIncludeChildren,
          type: "checkbox",
          checked: checked,
        },
      });
      return true;
    },
    [
      fieldNameForAlsoIncludeChildren,
      alsoIncludeChildrenChecked,
      onlyIncludeChildrenChecked,
      setValue,
      registerAlsoInclude,
      registerOnlyInclude,
      alsoIncludeRef,
      alsoIncludeRef,
    ]
  );

  const handleOnlyIncludeCheckboxChange = useCallback(
    function () {
      if (!fieldNameForOnlyIncludeChildren || !registerOnlyInclude) {
        return;
      }
      const checked = !getValues(fieldNameForOnlyIncludeChildren);
      if (
        checked &&
        registerAlsoInclude &&
        fieldNameForAlsoIncludeChildren &&
        getValues(fieldNameForAlsoIncludeChildren)
      ) {
        // console.log('The other checkbox (also) was active and it will be unchecked');
        setValue(fieldNameForAlsoIncludeChildren, false);
        if (alsoIncludeRef && alsoIncludeRef.current) {
          applyCheckboxStyleIntoState(alsoIncludeRef.current, false);
        }
        setAlsoIncludeChildrenChecked(false);
        registerAlsoInclude.onChange({
          type: "change",
          target: {
            name: fieldNameForAlsoIncludeChildren,
            type: "checkbox",
            checked: false,
          },
        });
      }
      setValue(fieldNameForOnlyIncludeChildren, checked);
      if (onlyIncludeRef && onlyIncludeRef.current) {
        applyCheckboxStyleIntoState(onlyIncludeRef.current, checked);
      }
      setOnlyIncludeChildrenChecked(checked);
      registerOnlyInclude.onChange({
        type: "change",
        target: {
          name: fieldNameForOnlyIncludeChildren,
          type: "checkbox",
          checked: checked,
        },
      });
      return true;
    },
    [
      fieldNameForOnlyIncludeChildren,
      alsoIncludeChildrenChecked,
      onlyIncludeChildrenChecked,
      setValue,
      registerAlsoInclude,
      registerOnlyInclude,
      alsoIncludeRef,
      onlyIncludeRef,
    ]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        marginBottom: "-22px",
      }}
    >
      <MUIFormTextarea
        registrationProps={register(fieldNameInForm, {
          validate,
          ...registerOptions,
        })}
        inputState={inputState}
        {...props}
      />
      {/* <Input
        {...register(fieldNameInForm)}
        required
        fullWidth
        multiline
        rowsMax={4}
        ref={queryRef}
        inputState={inputState}
        name={fieldNameInForm}
        errors={errors}
        placeholder={props.placeholder}
        // afterChange={onValidateFilterExpression}
        afterChange={(e) => onValidateFilterExpression}
        InputLabelProps={{
          classes: {
            root: inputStateStyles[inputState],
          },
        }}
        inputProps={{
          style: {
            resize: "vertical",
          },
        }}
      />
      <Spinner isVisible={inputState === InputState.Validating} /> */}
      {fieldNameForOnlyIncludeChildren && (
        <FormControlLabel
          key={fieldNameForOnlyIncludeChildren}
          control={
            <Checkbox
              checked={onlyIncludeChildrenChecked}
              ref={onlyIncludeRef}
              onChange={handleOnlyIncludeCheckboxChange}
              color="primary"
            />
          }
          label={
            <Box component="span" fontSize={12} color="#555">
              Only {checkboxVerb || "fetch"} child items
            </Box>
          }
        />
      )}
      {fieldNameForAlsoIncludeChildren && (
        <FormControlLabel
          key={fieldNameForAlsoIncludeChildren}
          control={
            <Checkbox
              checked={alsoIncludeChildrenChecked}
              ref={alsoIncludeRef}
              onChange={handleAlsoIncludeCheckboxChange}
              color="primary"
            />
          }
          label={
            <Box component="span" fontSize={12} color="#555">
              Also {checkboxVerb || "fetch"} child items
            </Box>
          }
        />
      )}
    </div>
  );
}

export default FQLInput;
