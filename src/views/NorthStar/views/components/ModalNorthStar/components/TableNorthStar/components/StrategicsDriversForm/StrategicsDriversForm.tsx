import { memo, useEffect, useState, lazy, Suspense, useCallback } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import FormColorPicker from "components/UI/FormColorPicker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import SaveButton from "components/NavigationButtons/components/SaveButton";
import ModalSearchIcons from "../ModalSearchIcons/ModalSearchIcons";
import { v4 as uuidV4 } from "uuid";

import { useStyles } from "./StrategicsDriversForm.styles";
import { AssignmentOutlined } from "@material-ui/icons";
import * as yup from "yup";
import { debounce } from "lodash";
import _ from "lodash";

const CustomTextField = styled(TextField)({
  "&": {
    color: "#1890ff",
    fontFamily: "Open Sans",
  },
  "& .MuiFormLabel-root": {
    fontFamily: "Open Sans",
  },
});

const WrapperColourPicker = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginLeft: 20,
  marginTop: 6,
});

const WrapperIcon = styled(Box)({
  fontSize: 30,
});

const WrapperIconContainer = styled(Box)({
  display: "inline-flex",
});

const WrapperPickerContainer = styled(Box)({
  display: "inline-flex",
});

const WrapperSaveButton = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
});

const SaveButtonContainer = styled(Box)({
  width: 120,
  display: "flex",
  justifyContent: "flex-end",
});

type FormFields = {
  id: string;
  name: string;
  description: string;
  uuid?: string;
  icon_name?: string;
  colour?: string;
  oneLineSummary?: string;
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Required")
    .max(80, "Maximum characters allowed is 80"),
  oneLineSummary: yup.string().max(255, "Maximum characters allowed is 255"),
  description: yup
    .string()
    .required("Required")
    .max(2000, "Maximum characters allowed is 2000"),
});

const maxLengths = {
  name: 80,
  oneLineSummary: 255,
  description: 2000,
};

const StrategicsDriversForm = ({
  onSubmitStrategicDrivers,
  strategicInfoToEdit,
  setIsFormDirty,
  isFormDirty,
}: any) => {
  const classes = useStyles();
  const [icon, setIcon] = useState<boolean>();
  const [isOpenModalSearchIcon, setOpenModalSearchIcon] = useState<boolean>(
    false
  );

  const formMethods = useForm<FormFields>({
    defaultValues: {
      id: "",
      name: "",
      description: "",
      uuid: uuidV4(),
      icon_name: "Assignment",
      colour: "",
      oneLineSummary: "",
    },
    // Not working
    // resolver: yupResolver(validationSchema)
  });

  const {
    control,
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods;

  useEffect(() => {
    if (!icon && !isDirty && strategicInfoToEdit?.icon_name) {
      setIcon(strategicInfoToEdit?.icon_name);
    }
  }, [strategicInfoToEdit?.icon_name]);

  const [initIcon, setInitIcon] = useState("");
  const [initColour, setInitColour] = useState<any>();

  const [selectedColour, setSelectedColour] = useState(initColour);

  const isIconDirty = !_.isEqual(initIcon, getValues()?.icon_name);
  useEffect(() => {
    const isColourDirty = !_.isEqual(initColour, selectedColour);
    setIsFormDirty(isDirty || isIconDirty || isColourDirty);
  }, [isDirty, isIconDirty, selectedColour]);

  useEffect(() => {
    if (strategicInfoToEdit && !isDirty) {
      setValue("id", strategicInfoToEdit?.id);
      setValue("name", strategicInfoToEdit?.name);
      setValue("description", strategicInfoToEdit?.description);
      setValue("uuid", strategicInfoToEdit?.uuid);
      setValue("icon_name", strategicInfoToEdit?.icon_name);
      setValue("colour", strategicInfoToEdit?.colour ?? "#04548A");
      setValue("oneLineSummary", strategicInfoToEdit?.oneLineSummary);

      setInitIcon(strategicInfoToEdit?.icon_name);
      setInitColour(strategicInfoToEdit?.colour);
      setSelectedColour(strategicInfoToEdit?.colour);
    }
  }, [strategicInfoToEdit]);

  const openModalSearchIcon = () => {
    setOpenModalSearchIcon(true);
  };

  const onSubmitValues = async () => {
    try {
      await validationSchema.validate(getValues(), { abortEarly: false });
      onSubmitStrategicDrivers(getValues());
    } catch (error: any) {
      if (error.inner) {
        error.inner.forEach((validationError) => {
          setError(validationError.path, { message: validationError.message });
        });
      }
    }
  };

  const onSubmitSearchIcon = (iconName) => {
    setValue("icon_name", iconName?.replace("Outlined", ""));
  };

  const handleShowSelectedIcon = (newIcon) => {
    setIcon(newIcon?.replace("Outlined", ""));
  };

  const iconName = getValues().icon_name;

  const SelectedIcon = iconName
    ? lazy(() => import(`@material-ui/icons/${icon || iconName}Outlined`))
    : () => <span></span>;

  const renderColorPicker = useCallback(
    ({ field }) => {
      return (
        <>
          <FormControl disabled={isSubmitting}>
            <FormColorPicker
              defaultColor="#04548A"
              value={field.value}
              setValue={(color) => {
                setValue("colour", color);
                setSelectedColour(color);
              }}
            />
          </FormControl>
          {/* <ErrorText>{errors?.colour?.message}</ErrorText> */}
        </>
      );
    },
    [isSubmitting, errors]
  );

  const [characterCounts, setCharacterCounts] = useState({
    name: strategicInfoToEdit?.name.length || 0,
    oneLineSummary: strategicInfoToEdit?.oneLineSummary.length || 0,
    description: strategicInfoToEdit?.description.length || 0,
  });

  const updateCharacterCount = debounce((field, value) => {
    const characterCount = value.length;
    const maxLength = maxLengths[field];

    if (characterCount > maxLength) {
      setError(field, {
        type: "maxLength",
        message: `Maximum characters allowed is ${maxLength}`,
      });
    } else {
      clearErrors(field);
    }

    // Update the character count in the state
    setCharacterCounts((prevCounts) => ({
      ...prevCounts,
      [field]: characterCount,
    }));
  }, 50);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box className={classes.wrapperForm}>
        <form className={classes.form}>
          <WrapperIconContainer>
            <Controller
              render={() => {
                return (
                  <WrapperPickerContainer>
                    <Box style={{ display: "flex", flexDirection: "column" }}>
                      <Box
                        style={{
                          marginTop: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Suspense fallback="">
                          <WrapperIcon>
                            <SelectedIcon style={{ width: 50, height: 50 }} />
                          </WrapperIcon>
                        </Suspense>
                        {!iconName ? (
                          <AssignmentOutlined
                            style={{ width: 50, height: 50 }}
                          />
                        ) : null}
                      </Box>
                      <Button
                        className={classes.TypographyIconSearch}
                        variant="outlined"
                        onClick={openModalSearchIcon}
                      >
                        Select Icon
                      </Button>
                    </Box>
                    <WrapperColourPicker>
                      <span>Colour picker:</span>
                      <Controller
                        name="colour"
                        render={renderColorPicker}
                        control={control}
                      />
                      <ModalSearchIcons
                        isOpenModalSearchIcon={isOpenModalSearchIcon}
                        setOpenModalSearchIcon={setOpenModalSearchIcon}
                        onSubmitSearchIcon={onSubmitSearchIcon}
                        handleShowSelectedIcon={handleShowSelectedIcon}
                        control={control}
                      />
                    </WrapperColourPicker>
                  </WrapperPickerContainer>
                );
              }}
              name="icon_name"
              control={control}
            />
          </WrapperIconContainer>
          {/* 
          </WrapperPickerContainer> */}
          <>
            <Controller
              render={({ field }) => {
                return (
                  <>
                    <FormControl className={classes.inputSize}>
                      <CustomTextField
                        {...field}
                        className={classes.textField}
                        size="medium"
                        onChange={(e) => {
                          const { value } = e.target;
                          field.onChange(e);
                          updateCharacterCount("name", value);
                        }}
                        value={field.value}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors?.name}
                        label="Strategic Driver"
                        inputProps={{ style: { fontFamily: "Open Sans" } }}
                      />
                    </FormControl>
                    <Box display="flex" justifyContent="space-between">
                      <FormHelperText className={classes.helpText} error>
                        {errors && errors?.name?.message}
                      </FormHelperText>
                      <FormHelperText
                        className={classes.helpText}
                        error={!!errors?.name?.message}
                      >
                        {characterCounts["name"]}/{maxLengths["name"]}
                      </FormHelperText>
                    </Box>
                  </>
                );
              }}
              name="name"
              control={control}
            />
            <Controller
              render={({ field }) => {
                return (
                  <>
                    <FormControl className={classes.inputSize}>
                      <CustomTextField
                        {...field}
                        className={classes.textField}
                        size="medium"
                        onChange={(e) => {
                          const { value } = e.target;
                          field.onChange(e);
                          updateCharacterCount("oneLineSummary", value);
                        }}
                        value={field.value}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors?.oneLineSummary}
                        label="One Line Summary"
                        inputProps={{ style: { fontFamily: "Open Sans" } }}
                      />
                    </FormControl>
                    <Box display="flex" justifyContent="space-between">
                      <FormHelperText className={classes.helpText} error>
                        {errors && errors?.oneLineSummary?.message}
                      </FormHelperText>
                      <FormHelperText
                        className={classes.helpText}
                        error={!!errors?.oneLineSummary?.message}
                      >
                        {characterCounts["oneLineSummary"]}/
                        {maxLengths["oneLineSummary"]}
                      </FormHelperText>
                    </Box>
                  </>
                );
              }}
              name="oneLineSummary"
              control={control}
            />
            <Controller
              render={({ field }) => {
                return (
                  <>
                    <FormControl className={classes.inputSize}>
                      <CustomTextField
                        {...field}
                        className={classes.textField}
                        size="medium"
                        onChange={(e) => {
                          const { value } = e.target;
                          field.onChange(e);
                          updateCharacterCount("description", value);
                        }}
                        value={field.value}
                        InputLabelProps={{ shrink: true }}
                        error={!!errors?.description}
                        minRows={4}
                        maxRows={6}
                        multiline
                        label="Brief"
                        inputProps={{ style: { fontFamily: "Open Sans" } }}
                      />
                    </FormControl>
                    <Box display="flex" justifyContent="space-between">
                      <FormHelperText className={classes.helpText}>
                        {errors && errors?.description?.message}
                      </FormHelperText>
                      <FormHelperText
                        className={classes.helpText}
                        error={!!errors?.description?.message}
                      >
                        {characterCounts["description"]}/
                        {maxLengths["description"]}
                      </FormHelperText>
                    </Box>
                  </>
                );
              }}
              name="description"
              control={control}
            />
          </>
          <Box
            display="flex"
            justifyContent="flex-end"
            style={{
              width: 500,
              marginTop: 20,
            }}
          ></Box>
        </form>
        <WrapperSaveButton>
          <SaveButtonContainer>
            <SaveButton
              defaultText="Save"
              isSubmitting={isSubmitting}
              className={classes.saveButton}
              onClick={onSubmitValues}
              disabled={
                !isFormDirty || isSubmitting || !!Object.keys(errors)?.length
              }
            />
          </SaveButtonContainer>
        </WrapperSaveButton>
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default memo(StrategicsDriversForm);
