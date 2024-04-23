import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CheckpointItem } from 'views/Settings/components/PerformanceCheckPoints/interfaces';
import { sortByDate } from '../../../../../../../../utils/dateTime';
import { useStyles } from './CheckpointSelection.styles';
import { useContextLabels } from './hooks/useContextLabels';
import { Switch } from '@material-ui/core';


export interface Props {
  checkpoints: CheckpointItem[],
  handleSelectCheckpoint: (string) => void;
  dateString: any;
  showSimplifiedView: boolean;
  setShowSimplifiedView: any;
}

type DefaultFormValuesType = {
  checkpoint?: string;
  firstLevel?: string;
  secondLevel?: string;
  thirdLevel?: string;
  display?: string;
};

const CheckpointSelection = ({
  checkpoints,
  handleSelectCheckpoint,
  dateString,
  showSimplifiedView,
  setShowSimplifiedView
}: Props) => {
  const classes = useStyles();
  const { data: labels } = useContextLabels();
  const [formValues, setFormValues] = useState<DefaultFormValuesType>();

  // sorted options
  const sortedOptions = useMemo(
    () => sortByDate(checkpoints, 'startDate', 'asc'),
    [checkpoints]
  );

  // Form
  const formMethods = useForm<DefaultFormValuesType>({
    defaultValues: {
      checkpoint: sortedOptions[0]?.id?.toString(),
      firstLevel: '',
      secondLevel: '',
      thirdLevel: '',
      display: '',
    },
    mode: 'onChange',
  });
  const { control, handleSubmit, setValue } = formMethods;

  const handleChangeSubmit = handleSubmit((values) => {
    setFormValues(values);
  });

  const defaultValue = sortedOptions[0]?.id?.toString() ?? '';

  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== '') {
      // You have to wait till the default value is available
      // So use setValue to set it here
      setValue('checkpoint', defaultValue);
    }
  }, [checkpoints]);

  return (
    <>
      <Box display="flex" style={{ marginBottom: 30, marginTop: 10 }}>
        <Box style={{
          justifyContent: 'flex-start'
        }}>
          <FormControl>
            <InputLabel htmlFor="checkpoints">Checkpoints</InputLabel>
            <Controller
              render={({ field }) => {
                return (
                  <Select
                    labelId="checkpoints"
                    id="checkpoints"
                    className={classes.checkpointSelect}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      console.log(`event.target`, event?.target?.value);
                      handleSelectCheckpoint(event?.target?.value);
                      handleChangeSubmit();
                    }}
                  >
                    {sortedOptions.map((checkpoint: CheckpointItem) => {
                      return (
                        <MenuItem
                          key={checkpoint.id?.toString()}
                          value={checkpoint.id?.toString()}
                        >
                          {checkpoint.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                );
              }}
              name="checkpoint"
              control={control}
              defaultValue={defaultValue}
            />
          </FormControl>
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}>
          {dateString}
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 20 }}>
          <Switch
            checked={showSimplifiedView}
            onChange={(event) => setShowSimplifiedView(event.target.checked)}
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          Simplify
        </Box>
      </Box>
      <Box width={850} style={{ marginBottom: 10, marginTop: 10 }}>
        {formValues?.display === 'team' ?
          <Alert severity="warning">
            <span style={{ textTransform: 'capitalize' }}>{labels?.team}</span> context level is the last level. You should select also one item on the second context level to do the comparison
          </Alert>
          : null}
      </Box>
    </>
  );
};

export default CheckpointSelection;
