import { useEffect, useContext, useState } from "react";
import { useForm, UseFormReset, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";

import {
  CustomTextField,
  SaveButton,
  SaveButtonContainer,
  TextFieldLabel,
  WrapperStrategyDescription,
  useStyles,
} from "./FormCurrentStrategy.styles";
import useProfile from "hooks/useProfile";
import { SelectedContextIdContext } from "components/UserStateProvider/UserStateProvider";
import { useStrategy } from "../../../../hooks/useStrategies";
import TextEditor from "views/Strategies/views/StrategiesPage/components/TextEditor";
import { useHorizons } from "../../../../hooks/useHorizons";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import { debounce } from "lodash";
import _ from "lodash";

const validatorSchema = yup.object().shape({
  strategyStatement: yup
    .string()
    .required("Required")
    .max(250, "Max characters are 250"),
});

type Props = {
  onSubmit: (values: any, afterSuccess: UseFormReset<any>) => void;
  selectedHorizon?: any;
  isFormDirty: boolean;
  setFormDirty: (val: boolean) => void;
};

const FormCurrentStrategy = ({
  onSubmit,
  selectedHorizon,
  setFormDirty,
  isFormDirty
}: Props) => {
  const classes = useStyles();

  const [strategyStatementLength, setStrategyStatementLength] = useState(0);
  const [strategyDescriptionLength, setDescriptionLength] = useState(0);
  const { contextId } = useContext(SelectedContextIdContext);
  const { data } = useStrategy("strategies", contextId, selectedHorizon);

  const { data: horizons } = useHorizons();
  const resolver = yupResolver(validatorSchema);

  /*
   * Get user info from useProfile hook
   */
  const { data: user } = useProfile();

  const formMethods = useForm<any>({
    resolver,
    defaultValues: {
      lastUser: data?.[0]?.lastUser || "",
      strategyStatement: data?.[0]?.strategyStatement || "",
      strategyDescription: data?.[0]?.strategyDescription || "",
      relationshipType: "",
      relationship: [],
      updatedAt: data?.[0]?.updatedAt || "",
      userCreated: user?.user_id,
      userModified: "",
      orgId: "",
      id: "",
      contextId: contextId,
      horizonId: data?.[0]?.horizonId || "",
    },
  });
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  const onSubmitValues = (values) => {
    if (Object.keys(errors).length) {
      console.log("errors", errors);
      return;
    }

    const formValues = {
      ...values,
      lastUser: user?.given_name || user?.name || user?.nickname,
    };
    if (!formValues.horizonId) formValues.horizonId = selectedHorizon;
    onSubmit(formValues, reset);
  };

  const handleHorizon = (event) => {
    const value = event.target.value;
    setValue("horizonId", value, { shouldDirty: true });
  };

  useEffect(() => {
    setValue("userCreated", user?.user_id);
  }, [user?.user_id]);

  useEffect(() => {
    const descriptionLength = data?.[0]?.strategyDescription?.length ?? 0;
    const isStrategyDescriptionDirty = !_.isEqual(descriptionLength , strategyDescriptionLength);
    setFormDirty(isDirty || isStrategyDescriptionDirty);
  }, [isDirty, strategyDescriptionLength]);

  useEffect(() => {
    const strategyInfo = data?.[0];
    if (strategyInfo?.id && !isDirty) {
      setValue("strategyDescription", strategyInfo?.strategyDescription || "");
      setValue("strategyStatement", strategyInfo?.strategyStatement);
      setValue("id", strategyInfo?.id);
      setValue("orgId", strategyInfo?.orgId);
      setValue("relationshipType", strategyInfo?.relationshipType);
      setValue("relationship", strategyInfo?.relationships);
      setValue("updatedAt", strategyInfo?.updatedAt);
      setValue("userCreated", strategyInfo?.userCreated);
      setValue("userModified", strategyInfo?.userModified);
      setValue("contextId", strategyInfo?.contextId);
      setValue("lastUser", strategyInfo?.lastUser);
      setValue("horizonId", strategyInfo?.horizonId);
      
      setStrategyStatementLength(strategyInfo?.strategyStatement?.length);
      setDescriptionLength(strategyInfo?.strategyDescription?.length || 0);
    }
  }, [data]);

  const afterChangeDescription = debounce((newValue) => {
    setValue("strategyDescription", newValue);
    setDescriptionLength(newValue?.length)
  }, 50);

  const defaultDescription = getValues()?.strategyDescription || "";

  const normalizedHorizonData = (horizons || []).map((item) => {
    return { label: item?.title, value: item?.id };
  });

  const selectedOption = normalizedHorizonData.find(
    (o) => o.value === selectedHorizon
  );

  const updateCharacterCount = debounce((value) => {
    const characterCount = value.length;
    setStrategyStatementLength(characterCount);

    if (characterCount > 250)
      setError("strategyStatement", {
        type: "maxLength",
        message: `The maximum length is 250 characters`,
      });
    else clearErrors("strategyStatement");
  }, 50);

  return (
    <Box className={classes.wrapperForm}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmitValues)}>
        <Box className={classes.inputElement}>
          <Controller
            render={({ field }) => {
              return (
                <>
                  <FormControl className={classes.inputSizeStrategyHorizon}>
                    <InputLabel>Strategy Horizon</InputLabel>
                    <Select
                      label="Strategy Horizon"
                      {...field}
                      disabled={
                        !!selectedHorizon?.[0] || !!data?.[0]?.horizonId
                      }
                      value={
                        data?.[0]?.horizonId ||
                        selectedOption?.value ||
                        selectedHorizon?.[0]
                      }
                      onChange={handleHorizon}
                      className={classes.selectElement}
                      inputProps={{ style: { fontFamily: "Open Sans" } }}
                    >
                      {normalizedHorizonData.map((elementOption, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={elementOption.value}
                            className={classes.titleSelectElement}
                          >
                            {elementOption.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <FormHelperText className={classes.helpText}></FormHelperText>
                </>
              );
            }}
            name="horizonId"
            control={control}
          />
        </Box>
        <WrapperStrategyDescription>
          <Controller
            render={({ field }) => {
              return (
                <>
                  <FormControl className={classes.inputSizeStrategyTitle}>
                    <CustomTextField
                      {...field}
                      className={classes.textFieldStrategyTitle}
                      size="medium"
                      onChange={(e) => {
                        const { value } = e.target;
                        field.onChange(e);
                        updateCharacterCount(value);
                      }}
                      value={field.value}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors?.strategyStatement}
                      label="Strategy Title"
                      inputProps={{ style: { fontFamily: "Open Sans" } }}
                      multiline
                    />
                  </FormControl>
                  <Box display="flex" justifyContent="space-between">
                    <FormHelperText className={classes.helpText} error>
                      {errors && errors?.strategyStatement?.message}
                    </FormHelperText>
                    <FormHelperText
                      error={!!errors?.strategyStatement?.message}
                    >
                      {strategyStatementLength}/{250}
                    </FormHelperText>
                  </Box>
                </>
              );
            }}
            name="strategyStatement"
            control={control}
          />
        </WrapperStrategyDescription>
        <WrapperStrategyDescription>
          <TextFieldLabel>Strategy Brief</TextFieldLabel>
          <TextEditor
            // maxLength={2000}
            onAfterChange={afterChangeDescription}
            defaultContent={defaultDescription}
          />
        </WrapperStrategyDescription>{" "}
        <Controller render={() => <span> </span>} name="id" control={control} />
        <Controller
          render={() => <span> </span>}
          name="contextId"
          control={control}
        />
        <SaveButtonContainer>
          <SaveButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            className={classes.saveButton}
            startIcon={isSubmitting ? <Spinner isVisible={isSubmitting} /> : ""}
            disabled={!isFormDirty || !!Object.keys(errors).length || isSubmitting}
          >
            Save
          </SaveButton>
        </SaveButtonContainer>
      </form>
    </Box>
  );
};

export default FormCurrentStrategy;
