import { ChangeEvent } from 'react';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import { CheckpointOption } from '../../interfaces';
import { useStyles } from './CheckboxSelection.styles';
import { sortByDate } from 'utils/dateTime';

export interface Props {
  amountOfCheckpointsToFilter: number;
  selectionOptions: CheckpointOption[];
  setOptions: (items: CheckpointOption[]) => void;
  onCompareCheckpoints: (checkpoints: CheckpointOption[]) => void;
  isLoading?: boolean;
}

const CheckboxSelection = ({
  selectionOptions,
  setOptions,
  onCompareCheckpoints,
  amountOfCheckpointsToFilter,
  isLoading,
}: Props) => {
  const classes = useStyles();
  // const [showAlert, setToggleAlert] = useState<boolean>(false);
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target?.name;
    const newUpdateOptions = selectionOptions.map(updateOption(event, id));
    setOptions(newUpdateOptions);
  };

  const onCompare = () => {
    const selectedOptions: CheckpointOption[] = selectionOptions.filter((option: CheckpointOption) => {
      return option?.checked === true;
    });

    // if (selectedOptions.length <= 1) {
    //   setToggleAlert(true);
    //   return;
    // }

    onCompareCheckpoints(selectedOptions);
  };

  // const hanleCloseAlert = () => {
  //   setToggleAlert(false);
  // };

  const sortedOptions = sortByDate(selectionOptions, "startDate", "asc");
  
  return(
    <Box style={{
      justifyContent: 'flex-start'
    }}>
      <FormControl component="fieldset">
        {/* <Snackbar
          open={showAlert}
          autoHideDuration={4000}
          onClose={hanleCloseAlert}
        >
          <Alert severity="error" onClose={hanleCloseAlert}>
            Select at least two checkpoints to compare
          </Alert>
        </Snackbar> */}
        <FormGroup
          className={classes.checkboxContainer}
          style={{
            maxWidth: 960,
            height: 60,
            overflowX: 'auto',
            display: 'flex',
            flexWrap: 'nowrap'
          }}
        >
          {!isLoading ? sortedOptions.map((option, key) => {
            return (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    checked={option?.checked || false}
                    color="secondary"
                    onChange={handleCheckboxChange}
                    name={`${option.id}`}
                    className={classes.checked}
                  />
                }
                label={option.name}
                className={classes.checkboxItem}
              />
            );
          }) : null}
        </FormGroup>
      </FormControl>
      <Button
        type="button"
        size="small"
        variant="contained"
        color="primary"
        disabled={amountOfCheckpointsToFilter <= 1 || isLoading}
        className={classes.compareButton}
        onClick={onCompare}
      >
        Compare
      </Button>
    </Box>
  );
};

export default CheckboxSelection;

function updateOption(event: ChangeEvent<HTMLInputElement>, id?: string | number) {
  return (checkpointOption) => {
    if (Number(checkpointOption.id) === Number(id)) {
      return {
        ...checkpointOption,
        checked: event.target.checked,
      };
    }
    return checkpointOption;
  }
}

// function Alert(props: AlertProps) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }
