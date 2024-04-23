import { memo, useCallback, useEffect, useRef, useState } from "react";

import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import Input from "views/Governance/views/GovernanceObeya/components/Input";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControl } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import { ColumnFormFields } from "../../../../interfaces/PortfolioBoard";
import { useSnackbar } from "notistack";

import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import { AddColumnCheckbox, ErrorText, LabelControl } from "./styles";

import { v4 as uuidV4 } from "uuid";
import FormColorPicker from "components/UI/FormColorPicker";
import { usePortfolio } from "views/LeanPortfolio/hooks/usePortfolio";
export interface ManageColumnProps {
  contextId: string | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValue?: any;
  setFormDirty: (val: boolean) => void;
  setFormModified: (val: boolean) => void;
}

const ManageColumnForm = memo(
  ({
    defaultValue,
    setFormDirty,
    setFormModified,
    ...props
  }: ManageColumnProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const [defaultFormValues, setDefaultFormValues] = useState<
      | {
        columnName?: string;
        columnId?: string;
        order?: number;
        colour?: string;
      }
      | undefined
    >();

    const { data: columns, post, update } = usePortfolio();

    const [checked, setChecked] = useState(false);

    const numColumnsRef = useRef(columns.length);

    const onSubmit = useCallback(
      async (data) => {
        const isEditing = !!defaultFormValues;

        const formData = {
          columnId: defaultValue?.columnId ?? uuidV4(),
          columnName: data.columnName,
          order: data.order ?? numColumnsRef.current + 1,
          colour: data.colour ?? "#D5D7D8",
        };

        try {
          if (isEditing) {
            const formDataToUpdate = {
              ...(defaultFormValues || {}),
              ...formData,
              columnName: formData.columnName,
              colour: formData.colour,
            };

            await update(formDataToUpdate).then(() => {
              enqueueSnackbar(`Column has been updated.`, {
                variant: "success",
                persist: false,
              });
            });
          } else {
            await post(formData).then(() => {
              enqueueSnackbar(
                `New column ${formData.columnName} has been created.`,
                {
                  variant: "success",
                  persist: false,
                }
              );
            });
          }

          props.setOpen(checked);
        } catch (e) {
          console.log("error", e);
        }
      },
      [post, update, history, defaultFormValues, checked]
    );

    const requiredMessage = "This field is required";

    const validationSchema = yup.object().shape({
      columnName: yup.string().required(requiredMessage),
    });

    const resolver: any = yupResolver(validationSchema);

    const methods = useForm<ColumnFormFields>({
      resolver,
      defaultValues: {
        columnName: "",
        columnId: defaultValue ? defaultValue.columnId : uuidV4(),
        order: defaultValue ? defaultValue.order : numColumnsRef.current + 1,
      },
    });

    const { control, register, handleSubmit, formState, setValue } = methods;

    const { errors } = formState;

    useEffect(() => {
      if (!defaultFormValues && !formState.isDirty && !!defaultValue) {
        setDefaultFormValues(defaultValue);
        setValue("columnName", defaultValue?.columnName, {
          shouldDirty: true,
        });
        setValue("columnId", defaultValue?.columnId ?? uuidV4());
        setValue("order", defaultValue?.order || numColumnsRef.current + 1);
        setValue("colour", defaultValue?.colour || "#D5D7D8");
      }
    }, [
      defaultValue,
      setDefaultFormValues,
      defaultFormValues,
      setValue,
      formState.isDirty,
    ]);

    const watchedValue = useWatch({
      control,
      defaultValue: {
        columnName: defaultValue?.columnName || "",
        colour: defaultValue?.colour || "",
      },
    });

    useEffect(() => {
      setFormDirty(formState.isDirty);

      if (defaultValue) {
        const isModified =
          watchedValue.columnName !== defaultValue.columnName ||
          watchedValue.colour !== defaultValue.colour;

        setFormModified(isModified);
      }
    }, [formState.isDirty, defaultValue, setFormDirty, watchedValue]);

    const renderColorPicker = useCallback(
      ({ field }) => (
        <div>
          <FormControl disabled={formState.isSubmitting}>
            <FormColorPicker value={field.value} setValue={field.onChange} />
          </FormControl>
          <ErrorText>{errors?.colour?.message}</ErrorText>
        </div>
      ),
      [formState.isSubmitting, errors]
    );

    return (
      <FormProvider {...methods}>
        <form
          name="interationForm"
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box display="flex" alignItems="center">
            <Controller
              {...register("colour")}
              name="colour"
              control={control}
              render={renderColorPicker}
              // defaultValue="#D5D7D8"
            />

            <Input
              {...register("columnName")}
              required
              fullWidth
              name="columnName"
              placeholder="Name"
              control={control}
              errors={errors}
            // onChange={setFormModified(true)}
            />
          </Box>
          <Box display="flex" justifyContent="end">
            {!defaultValue && (
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
                  <AddColumnCheckbox>Add another column</AddColumnCheckbox>
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
                  !formState.isDirty
                )
              }
              type="submit"
            >
              {defaultFormValues ? "UPDATE" : "SAVE"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    );
  }
);

export default ManageColumnForm;
