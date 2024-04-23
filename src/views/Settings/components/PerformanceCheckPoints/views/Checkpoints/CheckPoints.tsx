import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import { Skeleton } from '@material-ui/lab';
import MuiAlert, {
  AlertProps,
  Color,
} from '@material-ui/lab/Alert';
import { ButtonTypes } from 'components/NavigationButtons/components/NavigateButton';
import _ from 'lodash';
import { DateTime } from 'luxon';
import {
  memo,
  useCallback,
  useState
} from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidV4 } from 'uuid';
import { useCheckpoints } from '../../hooks/useCheckpoints';
import { CheckpointItem, CheckpointItemForm, CheckpointItemFormRow } from '../../interfaces';
import CheckPointsForm from './components/CheckpointsForm';
import CheckpointsTable from './components/CheckpointsTable';
import FormButton from './components/FormButtons';
import { createDateFromString, getUTCDate } from './utils';

// Wrapper to pass the data to the checkpoints component
export const CheckPoints = () => {
  const hookResponse = useCheckpoints();
  if (hookResponse.isLoadingCheckpoints) {
    return <>
      <Box style={{ margin: '20px', padding: 0, height: '500px' }}>
        <Skeleton height={'500px'} variant={'rect'} />
      </Box>
    </>;
  }

  return <CheckPointsChildComponent checkpointsProps={hookResponse} />;
};
// Not a great name, but other names are taken
const CheckPointsChildComponent = memo((
  {
    checkpointsProps: {
      data, isLoadingCheckpoints, postCheckpointView,
      mutate, removeCheckpointView, isValidating, patchCheckpointView,
      widgetInfo,
    },
  }: { checkpointsProps: ReturnType<typeof useCheckpoints>; }
) => {
  const [currentCheckpointsToDelete, setCurrentCheckpointsToDelete] = useState<CheckpointItem[] | undefined>();
  const [checkpointToEdit, setCurrentCheckpointToEdit] = useState<CheckpointItemForm | undefined>();

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverity] = useState<Color>('info');
  const [alertMessage, setAlertMessage] = useState<string>('Your changes are being saved...');
  const [confirmDeleteAlertOpen, setconfirmDeleteAlertOpen] = useState<boolean>(false);
  const [isAnyRowEditMode] = useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  /**
   * Turns an array of checkpoints to an object
   * with keys as the ids of the checkpoints and 
   * the values as the corresponding checkpoint object
   */
  const reduceCheckpoints = useCallback((elems: CheckpointItem[]) => {
    return elems.reduce((accum, current) => {
      // Cant use numbers as keys. Its a known bug in react hook form
      if (!current.id) console.warn('id is undefined');
      const id = `id-${(current.id ?? '').toString()}`;
      accum[id] = current;
      return accum;
    }, {} as Record<any, any>);
  }, []);


  /**
   * Default value. 
   * 
   * This will never be undefined. Because the wrapper components renders
   * this component only if the data has been loaded
   */
  const checkpoints = (data ?? [])
    .map((checkpointItem: CheckpointItem) => ({
      ...checkpointItem,
      start_date: createDateFromString(checkpointItem.start_date as string),
      end_date: createDateFromString(checkpointItem.end_date as string),
    }))
    .reduce((accum, current) => {
      // Cant use numbers as keys. Its a known bug in react hook form
      if (!current.id) console.warn('id is undefined');
      const id = `id-${(current.id ?? '').toString()}`;
      accum[id] = current;
      return accum;

    }, {} as Record<string, CheckpointItem>);

  // Form
  const formMethods = useForm<{ checkpoints: Record<string, CheckpointItem>; }>({
    defaultValues: {
      checkpoints
    },
  });
  const { control, formState, getValues, setValue, reset } = formMethods;

  /**
   * formState.isDirty doesnt work here in this form. Therefore I had to implement 
   * a custom isDrity with a deep comparison with lodash
   */
  const customIsDirty = !(_.isEqual(getValues().checkpoints, checkpoints));

  const appendCheckpoint = (checkpoint: CheckpointItem) => {
    const uuid = uuidV4();
    const newCheckPoint = {
      ...checkpoint,
      id: checkpoint?.id ? checkpoint?.id : uuid,
      shouldCreate: !checkpoint?.id,    // flag to map and understand who will be created
      shouldUpdate: !!(checkpoint?.id), // flag to map and understand who will be updated
    };
    const checkpoints = { ...getValues().checkpoints };
    checkpoints[`id-${newCheckPoint.id}`] = newCheckPoint;
    setValue('checkpoints', { ...checkpoints });
    setIsOpenModal(false);
  };

  const addOrUpdateCheckPoint = async () => {
    const checkpointsList = Object.values(getValues().checkpoints)
      // This filter is required for some reason.
      // Deleting a checkpoint causes the id to be undefined. Hence has to be filtered out
      .filter(c => c.id !== undefined);
    const {
      checkpointsToCreate,
      checkpointsToUpdate,
    }: {
      checkpointsToCreate: CheckpointItemFormRow[];
      checkpointsToUpdate: CheckpointItemFormRow[];
    } = getBulkOfCheckpointsToUpdateOrCreate(checkpointsList);
    try {
      /*
       * should create all new checkpoints in parallel request
      */
      setAlertMessage('Your changes are being saved...');
      setAlertSeverity('info');
      setAlertOpen(true);
      if (checkpointsToCreate?.length) {
        const createCheckpointItems = checkpointsToCreate.map(checkpointInfo => {
          return postCheckpointView(
            {
              name: checkpointInfo.name,
              start_date: checkpointInfo.start_date,
              end_date: checkpointInfo.end_date,
            }
          );
        });
        await Promise.all(createCheckpointItems);
      }

      /*
       * should update all new checkpoints in parallel request
      */
      if (checkpointsToUpdate.length) {
        const checkpointsListToUpdate = checkpointsToUpdate.map(checkpointInfo => {
          return patchCheckpointView({
            name: checkpointInfo.name,
            start_date: checkpointInfo.start_date,
            end_date: checkpointInfo.end_date,
            id: checkpointInfo.id,
          });
        });
        await Promise.all(checkpointsListToUpdate);
      }

      setAlertMessage('Checkpoint saved successfully.');
      setAlertSeverity('success');
      setAlertOpen(true);
      reset({ checkpoints: reduceCheckpoints(checkpointsList) });
      mutate(
        'checkpoints-views',
        {
          data: {
            checkpoints: checkpointsList,
            widgetInfo,
          },
        },
        { shouldRevalidate: true },
      );
    } catch (error) {
      setAlertSeverity('error');
      setAlertMessage('Error when try to save checkpoint.');
      console.error(`error`, error);
      throw error;
    }
  };

  const onSelectToRemove = (ids) => {
    const checkpointItems = data.filter(d => ids.includes(d.id));

    if (checkpointItems) {
      setCurrentCheckpointsToDelete(checkpointItems);
    }
  };

  const deleteCheckpoint = async () => {
    setconfirmDeleteAlertOpen(false);
    handleCloseAlert();

    try {
      if (currentCheckpointsToDelete?.length) {
        setAlertOpen(true);
        setAlertMessage('Your changes are being saved...');
        setAlertSeverity('info');
        const beforeDelete = getValues().checkpoints;
        await Promise.all(currentCheckpointsToDelete.map(currentCheckpointToDelete => removeCheckpointView(currentCheckpointToDelete?.id)));
        // await removeCheckpointView(currentCheckpointToDelete?.id);
        setAlertOpen(false);
        setAlertMessage(currentCheckpointsToDelete.length > 1 ? 'Checkpoints deleted successfully.' : 'Checkpoint deleted successfully.');
        // Deleting checkpoints on the table doesnt delete them from the form. 
        // The form will still have the object 
        currentCheckpointsToDelete.forEach(c => delete beforeDelete[`id-${c.id}`]);
        reset({ checkpoints: { ...beforeDelete } });
        setAlertSeverity('success');
        setAlertOpen(true);
        mutate();
      }
    } catch (e) {
      setAlertSeverity('error');
      setAlertMessage(currentCheckpointsToDelete && currentCheckpointsToDelete.length > 1 ? 'Error when trying to delete checkpoints.' : 'Error when trying to delete checkpoint.');
      setAlertMessage('');
      console.log(`error when delete`, e);
    }
  };

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const closeAlerts = () => {
    setconfirmDeleteAlertOpen(false);
  };

  const openDeleteConfirm = () => setconfirmDeleteAlertOpen(true);

  const handleCancelClick = (checkpointInfoToEdit: any) => {
    setCurrentCheckpointToEdit(checkpointInfoToEdit);
    setIsOpenModal(true);
  };

  return (
    <Box style={{ width: '100%' }}>
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box style={{ height: 400, width: '100%', marginTop: 20 }}>
        <Dialog
          open={confirmDeleteAlertOpen}
          onClose={closeAlerts}
          keepMounted
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete {currentCheckpointsToDelete && currentCheckpointsToDelete?.length > 1 ? 'these Checkpoints' : 'this Checkpoint'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: '#323130' }} id="alert-dialog-description">
              {currentCheckpointsToDelete?.map(currentCheckpointToDelete => currentCheckpointToDelete.name).join(',')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAlerts} color="primary">
              No
            </Button>
            <Button onClick={deleteCheckpoint} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <CheckpointsTable
          checkpointsItems={Object.values(getValues().checkpoints)}
          isLoadingCheckpoints={isLoadingCheckpoints}
          isValidating={isValidating}
          onSelectToRemove={onSelectToRemove}
          isAnyRowEditMode={isAnyRowEditMode}
          currentCheckpointsToDelete={currentCheckpointsToDelete}
          openDeleteConfirm={openDeleteConfirm}
          handleEditClick={handleCancelClick}
          control={control}
          openCheckpointForm={openModal}
        />
      </Box>
      <CheckPointsForm
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        onSubmit={appendCheckpoint}
        checkpointToEdit={checkpointToEdit}
        afterClose={setCurrentCheckpointToEdit}
      />
      <Box style={{ marginTop: 20, }}>
        <FormButton
          onClick={addOrUpdateCheckPoint}
          isSubmitting={false}
          backPath='/'
          backButtonProps={{
            path: '/',
            content: 'Back',
            buttonType: ButtonTypes.back,
            shouldRequestConfirmation: customIsDirty,
          }}
          saveButtonProps={{
            disabled: !customIsDirty || formState?.isSubmitting,
            isSubmitting: formState?.isSubmitting && isLoadingCheckpoints,
            defaultText: 'Save',
            submittingText: 'Saving',
          }}
        />
      </Box>
    </Box>
  );
});

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type BulkOfCheckpoints = { checkpointsToCreate: CheckpointItemFormRow[], checkpointsToUpdate: CheckpointItemFormRow[]; };

/*
* Should go through each one and create two lists of checkpoints items to Update or Create
*/
function getBulkOfCheckpointsToUpdateOrCreate(checkpointsList: CheckpointItemFormRow[]): {
  checkpointsToCreate: CheckpointItemFormRow[]; checkpointsToUpdate: CheckpointItemFormRow[];
} {
  return (checkpointsList || []).reduce((acc: BulkOfCheckpoints, checkpointItem) => {
    const start_date = getUTCDate(DateTime.fromJSDate(checkpointItem.start_date as Date)).toISO();
    const end_date = getUTCDate(DateTime.fromJSDate(checkpointItem.end_date as Date)).toISO();

    if (checkpointItem?.shouldCreate) {
      const { ...checkpointInfo } = checkpointItem;
      acc.checkpointsToCreate.push({
        name: checkpointInfo.name,
        start_date,
        end_date,
      });
    }

    if (checkpointItem?.shouldUpdate) {
      const { ...checkpointInfo } = checkpointItem;
      acc.checkpointsToUpdate.push({
        ...checkpointInfo,
        id: checkpointInfo.id,
        name: checkpointInfo.name,
        start_date,
        end_date,
      });
    }
    return acc;
  }, { checkpointsToCreate: [], checkpointsToUpdate: [] });
}
