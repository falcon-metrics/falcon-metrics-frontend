import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Controller, FormProvider, useFieldArray } from "react-hook-form";
import { emptyKeyResultState, useObjectivesFormContext } from "./FormContext";
import { FormHeader, FormLabel, FormRow } from "./styles";
import { RatingOptionsConstant } from "views/Governance/utils/constants";
import KeyResultsGrid from "./KeyResultsGrid";
import {
  OKRKeyResult,
  OKRObjective,
} from "views/Governance/views/GovernanceObeya/utils";
import { getStatusStyles } from "../Updates/components/UpdateCard/utils";
import DeleteButton from "./components/DeleteButton";
import { useSendTelemetry } from "core/api/CustomerTelemetryClient";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";
import { useSnackbar } from "notistack";
import AddIcon from "@material-ui/icons/Add";
import { useObeyaRoom } from "views/Governance/views/GovernanceObeya/hooks/useObeyaRoom";

type Props = {
  submit: (data: OKRObjective, afterSubmit?: any) => Promise<any>;
  deleteOKR: (data: OKRObjective) => void;
  existingData: OKRObjective | undefined;
};

const ManageObjectivesForm = ({ submit, deleteOKR, existingData }: Props) => {
  const { activeObeyaRoomId: roomId } = useObeyaRoom();
  const { methods } = useObjectivesFormContext();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
    setValue,
  } = methods;

  const sendTelemetry = useSendTelemetry();
  const { enqueueSnackbar } = useSnackbar();

  const [ratingDescription, setRatingDescription] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "keyResults",
  });

  /**
   * This method creates a new array, replaces the element with the new value and updates the array with a new array with setValue. 
   * 
   * 
   * If we are using a field array, we cannot use setValue to update an element of the field array. If we do that, the props dont get updated with the array containing the updated element. That means we cannot write logic that uses the current value of the element in the field array. 
   * 
   * See here for the issue https://github.com/react-hook-form/react-hook-form/discussions/5832
   * 
   * See here https://react-hook-form.com/api/usefieldarray#update
   * So why not use the update function from useFieldArray? That method is not avaiable 
   * in the current version of the package being used here. Replacing the entire array instead of upgrading the pacakge version and potentially breaking something.
   * 
   * TODO: Use the version of react-hook-form pacakge that has the update function
   * 
   * 
   
   * @param index Index of the element to update
   * @param object New object
   */
  const updateFieldArrayElement = (index: number, object: OKRKeyResult) => {
    const newKeyResults = [...fields] as OKRKeyResult[];
    if (index >= 0 && index < newKeyResults.length) {
      newKeyResults[index] = object;
      setValue("keyResults", newKeyResults);
    } else {
      console.error("Invalid index");
    }
  };

  const onSubmit = async (data) => {
    try {
      data.roomId = roomId;
      data.ratingDescription = getStatusStyles(data.ratingId).label;
      // data.objectiveId = existingData?.objectiveId ?? "";
      await submit(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddKR = () => {
    const newKr = emptyKeyResultState();
    append(newKr as any);
    sendTelemetry(
      "AddKeyResult",
      `AddKeyResult Key Result ${JSON.stringify(newKr)}`,
      { page: "obeya", widget: "objective" }
    );
  };

  const onRemoveKR = (index) => {
    enqueueSnackbar(
      `The deleted key result will only be saved after clicking Save.`,
      {
        variant: "info",
      }
    );
    remove(index);
    sendTelemetry(
      "DeleteKeyResult",
      `DeleteKeyResult Key Result ${JSON.stringify(fields[index])}`,
      { page: "obeya", widget: "objective" }
    );
  };

  const onDeleteObjective = () => {
    if (!existingData) return;
    deleteOKR(existingData);
    sendTelemetry(
      "RemoveOKR",
      `Delete OKR Id: ${existingData?.objectiveId}, Description: ${existingData?.objectiveDescription}`,
      { page: "obeya", widget: "objective" }
    );
  };

  useEffect(() => {
    setValue("objectiveId", existingData?.objectiveId ?? "");
    setValue("objectiveDescription", existingData?.objectiveDescription ?? "");
    setValue("achieved", existingData?.achieved ?? false);
    setValue("ratingDescription", existingData?.ratingDescription ?? "");
    setValue("ratingId", existingData?.ratingId ?? "");
    setValue("keyResults", existingData?.keyResults ?? [emptyKeyResultState()]);
  }, [existingData]);

  console.log(`File: ManageObjectivesForm.tsx, Line: 144 -> existingData`, existingData);
  return (
    <Box style={{ overflowX: "hidden" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow style={{ justifyContent: "space-between" }}>
            <FormRow>
              <Controller
                name="roomId"
                control={control}
                render={({ field }) => (
                  <input type="hidden" {...field} value={roomId || undefined} />
                )}
              />

              <Controller
                name="ratingDescription"
                control={control}
                render={({ field }) => (
                  <input type="hidden" {...field} value={ratingDescription} />
                )}
              />
              <FormHeader>Objective</FormHeader>
              <Controller
                name="achieved"
                control={control}
                render={({ field }) => (
                  <>
                    <Checkbox {...field} color="primary" checked={field.value} /> Finished
                  </>
                )}
              />
            </FormRow>
            {existingData?.objectiveId && (
              <DeleteButton
                onClick={onDeleteObjective}
                ariaLabel="Delete OKR"
              />
            )}
          </FormRow>

          <Controller
            name="objectiveDescription"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <TextField
                  fullWidth
                  label="Description"
                  margin="dense"
                  {...field}
                  error={!!errors.objectiveDescription}
                  helperText={errors.objectiveDescription?.message}
                />
              </FormControl>
            )}
          />

          <FormRow>
            <FormLabel>Rating</FormLabel>
            <Controller
              name="ratingId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="dense">
                  <FormRow>
                    <RadioGroup
                      row
                      aria-label="ratingId"
                      name="ratingId"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setRatingDescription(
                          getStatusStyles(e.target.value).label
                        );
                      }}
                    >
                      {RatingOptionsConstant.map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={<Radio color="primary" />}
                          label={option.label}
                        />
                      ))}
                    </RadioGroup>
                    {errors.ratingId && (
                      <FormHelperText error>
                        {errors.ratingId.message}
                      </FormHelperText>
                    )}
                  </FormRow>
                </FormControl>
              )}
            />
          </FormRow>

          <br />
          <Grid container>
            <Grid item xs={11} container direction="column">
              <Typography gutterBottom variant="subtitle1">
                Key Results
              </Typography>
            </Grid>
            <Grid item xs={1} container direction="column">
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Tooltip
                  title="Add key result"
                  aria-label="Add key result"
                  arrow
                >
                  <IconButton aria-label="Add Key Result" onClick={onAddKR}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>

          <div>
            <Grid container>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={4} container direction="column">
                    <Typography gutterBottom variant="subtitle1">
                      Description *
                    </Typography>
                  </Grid>
                  <Grid item xs={3} direction="column" justifyContent="center">
                    <Typography gutterBottom variant="subtitle1">
                      Associated Flow Item
                    </Typography>
                  </Grid>
                  <Grid item xs={2} direction="column">
                    <Typography gutterBottom variant="subtitle1">
                      Child Item
                    </Typography>
                  </Grid>
                  <Grid item xs={2} direction="column">
                    <Typography gutterBottom variant="subtitle1">
                      Rating
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    container
                    direction="column"
                    justifyContent="center"
                  >
                    <Typography gutterBottom variant="subtitle1">
                      Finished
                    </Typography>
                  </Grid>
                </Grid>
                <KeyResultsGrid
                  fields={fields}
                  setValue={setValue}
                  obeyaRoomId={roomId || undefined}
                  removeKR={onRemoveKR}
                  updateFieldsItem={updateFieldArrayElement}
                />
              </Grid>
            </Grid>
          </div>

          {/* <KeyResultsGrid
            // roomId={roomId}
            // deleteOKR={deleteOKR}
            // existingData={existingData ?? emptyState}
            fields={fields}
            setValue={setValue}
            obeyaRoomId={roomId}
            removeKR={onRemoveKR}
            updateFieldsItem={updateFieldArrayElement}
          /> */}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            {/* <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
            Submit
          </Button> */}

            <Button
              variant="contained"
              color="primary"
              startIcon={
                isSubmitting && (
                  <Spinner
                    isVisible={isSubmitting}
                    style={{ marginLeft: 30, marginBottom: 2 }}
                  />
                )
              }
              style={{ width: 110 }}
              disabled={
                !!(Object.keys(errors)?.length || isSubmitting || !isDirty)
              }
              type="submit"
            >
              {existingData?.objectiveId ? "UPDATE" : "SAVE"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Box>
  );
};

export default ManageObjectivesForm;
