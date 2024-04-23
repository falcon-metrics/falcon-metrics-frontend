import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateTime } from "luxon";
import { Controller } from "react-hook-form";
import { v4 as uuidV4 } from "uuid";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import SaveButton from "components/NavigationButtons/components/SaveButton";

import { useStyles } from "./StrategicsHorizonForm.styles";
import { DEFAULT_DATE_FORMAT } from "utils/dateTime";

const schema = yup.object().shape({
  title: yup.string().required("Required"),
  startDate: yup.date().required(),
  endDate: yup.date().required(),
});

const CustomTextField = styled(TextField)({
  "&": {
    color: "#1890ff",
    fontFamily: "Open Sans",
  },
  "& .MuiFormLabel-root": {
    fontFamily: "Open Sans",
  },
});

type FormFields = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  uuid?: string;
};

const StrategicsHorizonForm = ({
  horizonInfoToEdit,
  onSubmitStrategicDrivers,
}: any) => {
  const classes = useStyles();

  // Default end date is definete with 1 month ahead the current day
  const defaultEndDate = DateTime.fromJSDate(new Date())
    .plus({ months: 1 })
    .toJSDate();
  const defaultStartDate = new Date();

  const formMethods = useForm<FormFields>({
    resolver: yupResolver(schema),
    defaultValues: {
      uuid: horizonInfoToEdit?.uuid || horizonInfoToEdit?.id || uuidV4(),
      title: horizonInfoToEdit?.title || "",
      startDate: horizonInfoToEdit?.startDate || defaultStartDate,
      endDate: horizonInfoToEdit?.endDate || defaultEndDate,
    },
  });

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = formMethods;

  const onSubmitValues = (data: FormFields) => {
    const values = { ...data };
    values.startDate = DateTime.fromJSDate(values.startDate).toUTC() as any;
    values.endDate = DateTime.fromJSDate(values.endDate).toUTC() as any;
    onSubmitStrategicDrivers(values);
  };

  useEffect(() => {
    if (horizonInfoToEdit && !isDirty) {
      setValue("id", horizonInfoToEdit?.id);
      setValue("title", horizonInfoToEdit?.title);
      setValue("startDate", horizonInfoToEdit?.startDate);
      setValue("uuid", horizonInfoToEdit?.uuid);
      setValue("endDate", horizonInfoToEdit?.endDate);
    }
  }, [horizonInfoToEdit]);

  const valueError =
    (errors && errors?.title && errors?.title?.message) || undefined;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box className={classes.wrapperForm}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmitValues)}>
          <Box className={classes.wrapperForm}>
            <Box className={classes.wrapperInputCheckBox}>
              <Controller
                render={() => <span></span>}
                name="uuid"
                control={control}
              />
              <Controller
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      InputLabelProps={{ shrink: true }}
                      label="Strategy Horizon Title"
                      error={!!valueError}
                      helperText={valueError}
                      fullWidth
                    />
                  );
                }}
                name="title"
                control={control}
              />
            </Box>
            <Box className={classes.datepickerBox} gridGap={25}>
              <Controller
                render={({ field }) => {
                  return (
                    <KeyboardDatePicker
                      {...field}
                      disableToolbar
                      variant="inline"
                      format={DEFAULT_DATE_FORMAT}
                      margin="normal"
                      label="Start Date"
                      value={field.value}
                      fullWidth
                      onChange={field.onChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  );
                }}
                name="startDate"
                control={control}
              />
              <Controller
                render={({ field }) => {
                  return (
                    <KeyboardDatePicker
                      {...field}
                      disableToolbar
                      variant="inline"
                      format={DEFAULT_DATE_FORMAT}
                      margin="normal"
                      label="End Date"
                      value={field.value}
                      fullWidth
                      onChange={field.onChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  );
                }}
                name="endDate"
                control={control}
              />
            </Box>
            <Box>
              <FormHelperText style={{ color: "#d32f2f" }}>
                {(errors && errors?.endDate?.message) ||
                  (errors && errors?.startDate?.message)}
              </FormHelperText>
            </Box>
          </Box>
          <Box
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <SaveButton type="submit" isSubmitting={false} defaultText="Save" />
          </Box>
        </form>
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default memo(StrategicsHorizonForm);
