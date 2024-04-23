import {
  useContext, useEffect,
} from 'react';

import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import {
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { v4 as uuidV4 } from 'uuid';
import { OKRKeyResult, OKRObjective } from 'views/Governance/views/GovernanceObeya/utils';

import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { SelectedContextIdContext } from 'components/UserStateProvider/UserStateProvider';
import CheckBoxCompleted from './components/CheckBoxCompleted';
import DeleteButton from './components/DeleteButton';
import FormButtons from './components/FormButtons';
import Input from './components/Input';
import KeyResults from './components/KeyResults';
import RadioGroupRating from './components/RadioGroupRating';
import useStyles from './components/styles';

interface Props {
  modalOpen?: boolean;
  currentObjective: OKRObjective;
  submit: (data: OKRObjective) => Promise<any>;
  deleteOKR: (data: OKRObjective) => void;
  hideModal(): void;
  roomId?: string;
  contextId?: string;
  setFormDirty: (val: boolean) => void;
}

const getNewKeyEmptyResult = () => ({
  keyResultDescription: '',
  parentWorkItemId: '',
  keyResultId: uuidV4(),
  completed: false,
  parentWorkItemTitle: '',
  datasourceId: '',
  numberOfItemsCompleted: 0,
  numberOfItemsInProgress: 0,
  numberOfItemsProposed: 0,
  ratingId: '4',
  ratingDescription: 'Not Rated',
  includeChildren: false,
  includeRelated: false,
  childItemLevel: 1,
  linkTypes: []
});

const ManageObjectives = (props: Props) => {
  const classes = useStyles();
  const sendTelemetry = useSendTelemetry();
  const { contextId } = useContext(SelectedContextIdContext);

  const formMethods = useForm<OKRObjective>({
    defaultValues: {
      objectiveId: props.currentObjective?.objectiveId || uuidV4(),
      objectiveDescription: props.currentObjective?.objectiveDescription,
      orgId: props.currentObjective?.orgId,
      roomId: props.currentObjective?.roomId || contextId,
      contextId: props.currentObjective?.contextId || contextId,
      ratingId: props.currentObjective?.ratingId || '4',
      ratingDescription: props.currentObjective?.ratingDescription,
      achieved: props.currentObjective?.achieved || false,
      initiativeId: props.currentObjective?.initiativeId,
      keyResults: props.currentObjective?.keyResults || [
        getNewKeyEmptyResult(),
      ],
    },
  });
  const { control, register, handleSubmit, formState, setValue } = formMethods;

  const { errors, isSubmitting, isDirty } = formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'keyResults',
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
      setValue('keyResults', newKeyResults);
    } else {
      console.error('Invalid index');
    }
  };

  const addNewKR = () => {
    const newEmptyKeyResult = getNewKeyEmptyResult();
    append(newEmptyKeyResult as any);
    sendTelemetry(
      'AddKeyResult',
      `AddKeyResult Key Result ${JSON.stringify(newEmptyKeyResult)}`,
      { page: 'obeya', widget: 'objective' }
    );
  };

  const removeKR = (index) => {
    remove(index);
    sendTelemetry(
      'DeleteKeyResult',
      `DeleteKeyResult Key Result ${JSON.stringify(fields[index])}`,
      { page: 'obeya', widget: 'objective' }
    );
  };

  const deleteOKR = () => {
    props.deleteOKR(props.currentObjective);
    sendTelemetry(
      'RemoveOKR',
      `Delete OKR Id: ${props.currentObjective?.objectiveId}, Description: ${props.currentObjective?.objectiveDescription}`,
      { page: 'obeya', widget: 'objective' }
    );
  };

  useEffect(() => {
    props.setFormDirty(isDirty);
  }, [isDirty]);

  return (
    <div style={{ overflow: "hidden" }}>
      <div>
        <FormProvider {...formMethods}>
          <form name="okrs" onSubmit={handleSubmit(props.submit)}>
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  className={classes.title}
                  style={{ display: 'inline-flex' }}
                >
                  Objective
                </Typography>
                <label className={classes.achievedObjectives}>
                  <CheckBoxCompleted
                    color="default"
                    name="achieved"
                    className={classes.checkboxAchieved}
                    control={control}
                    defaultValue={props?.currentObjective?.achieved}
                  />
                  <span className={classes.achievedText}>Finished</span>
                </label>
              </Box>
              <DeleteButton onClick={deleteOKR} ariaLabel="Delete OKR" />
            </Box>
            <Input
              fullWidth
              required
              name="objectiveDescription"
              control={control}
              inputProps={{ maxLength: 250 }}
              register={register}
            />
            <input
              type="hidden"
              id="objectiveId"
              {...register('objectiveId')}
            />
            <input
              type="hidden"
              id="roomId"
              {...register('roomId')}
              value={props.roomId}
            />
            <input
              type="hidden"
              id="ratingDescription"
              {...register('ratingDescription')}
            />
            <br />
            <br />
            <FormLabel component="legend">Rating*</FormLabel>
            <RadioGroupRating
              fullWidth
              required
              defaultValue="1"
              name="ratingId"
              label="Rating"
              control={control}
              style={{ paddingLeft: "5px" }}
            />
            <br />
            <Grid container>
              <Grid item xs={11} container direction="column">
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  className={classes.title}
                >
                  Key Results
                </Typography>
              </Grid>
              <Grid item xs={1} container direction="column">
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Tooltip
                    title="Add key result"
                    aria-label="Add key result"
                    arrow
                  >
                    <IconButton aria-label="Add Key Result" onClick={addNewKR}>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
            </Grid>
            <Paper className={classes.paper}>
              <div className={classes.wrapper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={7} container direction="column">
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          className={classes.typographySm}
                        >
                          Description *
                        </Typography>
                      </Grid>
                      {/* <Grid item xs={4} direction="column" justifyContent="center">
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          className={classes.typographySm}
                        >
                          Associated Initiative
                        </Typography>
                      </Grid> */}
                      {/* 
                      <Grid item xs={2} direction="column">
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          className={classes.typographySm}
                        >
                          Child Item
                        </Typography>
                      </Grid> */}
                      <Grid item xs={3} direction="column">
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          className={classes.typographySm}
                          style={{ marginLeft: 10, }}
                        >
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
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          className={classes.typographySm}
                          style={{ marginLeft: 30 }}
                        >
                          Finished
                        </Typography>
                      </Grid>
                    </Grid>
                    <KeyResults
                      fields={fields}
                      setValue={setValue}
                      removeKR={removeKR}
                      updateFieldsItem={updateFieldArrayElement}
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
            <FormButtons
              hideModal={props.hideModal}
              isDirty={isDirty}
              errors={errors}
              isSubmitting={isSubmitting}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ManageObjectives;
