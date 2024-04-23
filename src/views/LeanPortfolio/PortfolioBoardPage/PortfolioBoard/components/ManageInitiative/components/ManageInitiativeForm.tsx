import { memo, useCallback, useEffect, useState } from "react";

import { FormProvider } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { DatePicker } from "views/Governance/views/GovernanceObeya/components/DatePicker/DatePicker";
import Input from "views/Governance/views/GovernanceObeya/components/Input";

import { Checkbox, FormHelperText, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import {
  AddInitiativeCheckbox,
  LabelControl,
  SaveButtonContainer,
  Section,
  SectionTitle,
  useStyles,
} from "../styles";
import FQLInputObeya from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaRoom/FQLInputObeya";
import CheckBoxCompleted from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/ManageObjectives/components/CheckBoxCompleted";
import { useInitiatives } from "../../../../../hooks/useInitiatives";
import { useSnackbar } from "notistack";
import ContextSelector from "../../../../../components/ContextSelector";

import ColumnOptions from "../../ColumnOptions/ColumnOptions";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import ChildItemLevelSelector from "../../ChildItemLevelSelector";
import LinkTypesSelector from "../../LinkTypesSelector";
import { emptyState, useFormContext } from "./FormContext";
import { usePortfolio } from "views/LeanPortfolio/hooks/usePortfolio";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";

export interface ManageInitiativeProps {
  contextId: string | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValue?: Record<any, any>;
  isLoadFromObeya?: boolean;
  setFormDirty: (val: boolean) => void;
  setFormModified: (val: boolean) => void;
}

const ManageInitiativeForm = memo(
  ({
    contextId,
    defaultValue: existingData,
    setOpen,
    ...props
  }: ManageInitiativeProps) => {
    const classes = useStyles();
    const history = useHistory();

    const { enqueueSnackbar } = useSnackbar();

    const { methods } = useFormContext();
    const {
      handleSubmit,
      setValue,
      register,
      control,
      formState,
      clearErrors,
      getValues,
      setError,
      reset,
    } = methods;
    const { errors } = formState;
    const { post, update } = useInitiatives();
    const { mutateObeyaData } = useObeyaRoom();
    const { data: columnOptions } = usePortfolio();

    const [validatingFql, setValidatingFql] = useState<boolean>(false);
    const [validatingExcludeFql, setValidatingExcludeFql] = useState<boolean>(
      false
    );

    const [selectedKeys, setSelectedKeys] = useState(["", "", ""]);
    const [isFinished, setIsFinished] = useState(existingData?.isFinished ?? 1);
    const [isArchived, setIsArchived] = useState(existingData?.isArchived ?? 1);

    const [checked, setChecked] = useState(false);

    const [selected, setSelected] = useState("");

    const defaultColumnId =
      existingData?.columnId &&
      columnOptions.some((opt) => opt.columnId === existingData?.columnId)
        ? existingData?.columnId
        : columnOptions.length > 0 && columnOptions[0].columnId;

    const onSubmit = useCallback(
      async (data) => {
        const isEditing = !!existingData;

        const formData = {
          type: "initiative",
          goal: data.goal,
          roomId: existingData?.roomId,
          roomName: data.roomName,
          beginDate: data.beginDate,
          endDate: data.endDate,
          flomatikaQuery: data.filterExpression,
          datasourceId: "-",
          includeRelated: data.includeRelated,
          includeChildren: data.includeChildren,
          includeChildrenOfRelated: data.includeRelated
            ? data.includeChildrenOfRelated
            : false,
          hierarchyLevel: data.includeChildren ? data.hierarchyLevel : 0,
          excludeQuery: data.excludeFilterExpression,
          linkTypes: data.includeRelated ? data.linkTypes : [],
          columnId: data.columnId ?? defaultColumnId,
          contextId: data.selected ?? selected,
          order: data.order ?? 0,
          isFinished: data.isFinished ?? false,
          isArchived: data.isArchived ?? false,
        };
        try {
          if (isEditing) {
            const formDataToUpdate = {
              ...(existingData || {}),
              ...formData,
              // This is bad code. If the names of the properties in the form
              // are same as the names of the properties in the initial data,
              // this wont be required
              flomatikaQuery: formData.flomatikaQuery,
              parsedQuery: formData.flomatikaQuery,
              excludeQuery: formData.excludeQuery,
              parsedExcludeQuery: formData.excludeQuery,
              contextId: formData.contextId,
              columnId: formData.columnId,
            };

            await update(formDataToUpdate).then(() => {
              enqueueSnackbar(`Initiative has been updated.`, {
                variant: "success",
                persist: false,
              });
            });
          } else {
            if (formData.columnId === "") formData.columnId = defaultColumnId;
            try {
              await post(formData);
              enqueueSnackbar(
                `New initiative ${formData.roomName} has been created.`,
                {
                  variant: "success",
                  persist: false,
                }
              );
            } catch (e) {
              enqueueSnackbar(
                `Oops! Something went wrong. Could not create the initiative. Try again.`,
                {
                  variant: "error",
                  persist: false,
                }
              );
            }
          }

          if (!checked) {
            // Close the modal only if the add another initiative checkbox is NOT checked
            setOpen(false);
          } else {
            // If add initiative checkbox is checked, reset the form to the default empty state
            reset(emptyState);
          }
          if (props.isLoadFromObeya) mutateObeyaData();
        } catch (e) {
          console.log("error", e);
        }
      },
      [
        post,
        update,
        history,
        existingData,
        selected,
        checked,
        props.isLoadFromObeya,
      ]
    );

    useEffect(() => {
      // Combine existing values and values already in the form
      const obj = {
        ...existingData,

        // This is workaround.
        // If the names of the properties in the form
        // are same as the names of the properties in the initial data,
        // this wont be required
        // How to fix it?
        // Option 1: Refactor the names of the fields in the form
        // Option 2: Do this mapping OUTSIDE the component.
        filterExpression: existingData?.flomatikaQuery,
        excludeFilterExpression: existingData?.excludeQuery,
      };

      const values: any = getValues();

      // Override only the dirty fields, else use the value in the "existingData" object
      for (const key of Object.keys(formState.dirtyFields)) {
        obj[key] = values[key];
      }
      for (const [key, value] of Object.entries(obj)) {
        setValue(key as any, value);
      }
    }, [existingData, getValues]);

    const getSelectedColumnValue = (array) => {
      let _selected = "";

      if (array[0] !== "") {
        if (array[1] === "all" || array[1] === "") {
          _selected = array[0];
        } else if (array[2] === "all" || array[2] === "") {
          _selected = array[1];
        } else {
          _selected = array[2];
        }
      } else {
        _selected = array[0];
      }

      return _selected;
    };

    useEffect(() => {
      setSelected(getSelectedColumnValue(selectedKeys));
    }, [selectedKeys]);

    return (
      <FormProvider {...methods}>
        <form
          name="interationForm"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box mb={6}>
            {existingData && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  position: "absolute",
                  top: 28,
                  right: 72,
                }}
              >
                <CheckBoxCompleted
                  {...register("isFinished")}
                  size="small"
                  color="primary"
                  name="isFinished"
                  control={control}
                  errors={errors}
                  existingData={isFinished}
                  onChange={(e) => setIsFinished(e.target.checked)}
                />
                <Typography style={{ marginTop: 8 }}>Finished</Typography>

                <CheckBoxCompleted
                  {...register("isArchived")}
                  size="small"
                  color="primary"
                  name="isArchived"
                  control={control}
                  errors={errors}
                  existingData={isArchived}
                  onChange={(e) => setIsArchived(e.target.checked)}
                />
                <Typography style={{ marginTop: 8 }}>Archived</Typography>
              </Box>
            )}
            <Section>
              <SectionTitle>Boards & Aggregations</SectionTitle>
              <ContextSelector
                currentContextId={existingData?.contextId ?? contextId}
                selectedKeys={selectedKeys}
                setSelectedKeys={setSelectedKeys}
                register={register}
                control={control}
                errors={errors}
              />
            </Section>
            <Section>
              <SectionTitle>Initiative Information</SectionTitle>
              <Box>
                <Input
                  {...register("roomName")}
                  required
                  fullWidth
                  name="roomName"
                  placeholder="Name"
                  control={control}
                  errors={errors}
                />
              </Box>
              <Box>
                <Input
                  {...register("goal")}
                  fullWidth
                  name="goal"
                  placeholder="What is the purpose for this Initiative?"
                  control={control}
                  errors={errors}
                />
              </Box>
              <Box className={classes.datesSelectionContainer}>
                <Box className={classes.datepickerBox} ml={1}>
                  <DatePicker
                    {...register("beginDate")}
                    name="beginDate"
                    label="Expected Start Date"
                    format={DEFAULT_DATE_FORMAT}
                    placeholder="Expected Start Date"
                    margin="normal"
                    className={classes.datepicker}
                    control={control}
                    errors={errors}
                  />
                </Box>
                <Box className={classes.datepickerBox}>
                  <DatePicker
                    {...register("endDate")}
                    name="endDate"
                    label="Expected End Date"
                    format={DEFAULT_DATE_FORMAT}
                    placeholder="Expected End Date"
                    margin="normal"
                    className={classes.datepicker}
                    control={control}
                    errors={errors}
                  />
                </Box>
                <Box className={classes.datepickerBox}>
                  <FormHelperText>Portfolio Board Column </FormHelperText>
                  <ColumnOptions
                    register={register}
                    control={control}
                    errors={errors}
                    currentContextId={
                      getSelectedColumnValue(selectedKeys) ?? selectedKeys[0]
                    }
                    defaultColumnId={defaultColumnId}
                    columnOptions={columnOptions}
                  />
                </Box>
              </Box>
            </Section>
            <Section>
              <SectionTitle
                className={`${classes.titleSection} ${classes.titleFilter}`}
              >
                Filter Expression
              </SectionTitle>
              <Box>
                <FQLInputObeya
                  {...{
                    displayName: "filterExpression",
                    fieldNameInForm: "filterExpression",
                    registerOptions: {
                      required: "Filter Expression is Required",
                    },
                    namespace: "-",
                    provider: "-",
                  }}
                  control={methods.control}
                  className={classes.input}
                  errors={errors}
                  classes={classes}
                  setValidate={setValidatingFql}
                  validatingFql={validatingFql}
                  setError={setError}
                  clearErrors={clearErrors}
                  register={register}
                  getValues={getValues}
                  formState={formState}
                  defaultValue={getValues()?.filterExpression}
                />
              </Box>

              <ChildItemLevelSelector
                register={register}
                control={control}
                defaultHierarchyLevel={getValues()?.hierarchyLevel}
                defaultIncludeChildren={getValues()?.includeChildren}
              />

              <LinkTypesSelector
                register={register}
                control={control}
                defaultLinkTypes={getValues()?.linkTypes}
                defaultIncludeChildrenOfRelated={
                  getValues()?.includeChildrenOfRelated
                }
                defaultIncludeRelated={getValues()?.includeRelated}
                setValue={setValue}
              />

              <Box mt={2}>
                <FQLInputObeya
                  {...{
                    displayName: "excludeFilterExpression",
                    fieldNameInForm: "excludeFilterExpression",
                    namespace: "-",
                    provider: "-",
                  }}
                  placeholder="Exclude Filter Expression (optional)"
                  control={methods.control}
                  className={classes.input}
                  errors={errors}
                  classes={classes}
                  setValidate={setValidatingExcludeFql}
                  validatingFql={validatingExcludeFql}
                  setError={setError}
                  clearErrors={clearErrors}
                  register={register}
                  getValues={getValues}
                  formState={formState}
                  defaultValue={getValues()?.excludeFilterExpression}
                />
              </Box>
            </Section>

            <SaveButtonContainer>
              <Box display="flex" justifyContent="flex-end">
                {!existingData && (
                  <LabelControl
                    control={
                      <Checkbox
                        checked={checked}
                        size="small"
                        color="primary"
                        onChange={(e) => setChecked(e.target.checked)}
                      />
                    }
                    label={
                      <AddInitiativeCheckbox>
                        Add another initiative
                      </AddInitiativeCheckbox>
                    }
                  />
                )}
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={
                    formState.isSubmitting && (
                      <Spinner
                        isVisible={formState.isSubmitting}
                        style={{ marginLeft: 30, marginBottom: 2 }}
                      />
                    )
                  }
                  style={{ width: 110 }}
                  disabled={
                    !!(
                      Object.keys(errors)?.length ||
                      formState.isSubmitting ||
                      validatingFql ||
                      validatingExcludeFql ||
                      !formState.isDirty
                    )
                  }
                  className={classes.buttonSave}
                  type="submit"
                >
                  {existingData ? "UPDATE" : "SAVE"}
                </Button>
              </Box>
            </SaveButtonContainer>
          </Box>
        </form>
      </FormProvider>
    );
  }
);

export default ManageInitiativeForm;
