import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormHelperText, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "views/Governance/views/GovernanceObeya/components/DatePicker";
import * as yup from "yup";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";
import { useEffect } from "react";

type MetricSnapshotFormProps = {
  onSave: any;
  isSaving: boolean;
  setFormDirty: (val: boolean) => void;
  setFormModified: (val: boolean) => void;
};

type MetricSnapshotFormFields = {
  recordedDate: Date;
  value: number;
};

const validatorSchema = yup.object().shape({
  recordedDate: yup.string().required("Recorded date is required"),
  value: yup.number().required("Value is required"),
});
const MetricSnapshotForm = (props: MetricSnapshotFormProps) => {
  const resolver = yupResolver(validatorSchema);
  const formMethods = useForm<MetricSnapshotFormFields>({
    resolver,
    defaultValues: {
      recordedDate: new Date(),
      value: undefined,
    },
  });
  const {
    handleSubmit,
    control,
    getValues,
    register,
    formState: { errors, isDirty },
  } = formMethods;

  const onSubmitForm = () => {
    const formValues = {
      recordedDate: getValues().recordedDate.toISOString(),
      value: parseInt(getValues().value.toString()),
    };
    props.onSave(formValues);
  };

  useEffect(() => {
    props.setFormDirty(isDirty);
    props.setFormModified(isDirty);
  }, [isDirty]);

  return (
    <Box style={{ display: "flex", paddingTop: 25, flexDirection: "column" }}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <DatePicker
          {...register("recordedDate")}
          defaulValue={undefined}
          name="recordedDate"
          label="Date of Check-in"
          format={DEFAULT_DATE_FORMAT}
          placeholder="Date of Check-in"
          margin="normal"
          control={control}
          errors={errors}
        />
        <br />
        <Controller
          render={({ field }) => {
            return (
              <TextField
                type="number"
                id={"value"}
                size="medium"
                style={{ width: "45%" }}
                variant="standard"
                label="Actual"
                value={field.value}
                onChange={field.onChange}
              />
            );
          }}
          name="value"
          control={control}
        />
        <br />
        <br />
        <FormHelperText style={{ color: "red" }}>
          {errors && errors?.value?.message}
        </FormHelperText>
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            startIcon={props.isSaving && <HourglassEmptyIcon />}
            disabled={!isDirty || props.isSaving}
            type="submit"
          >
            {props.isSaving ? "Saving" : "Save"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default MetricSnapshotForm;
