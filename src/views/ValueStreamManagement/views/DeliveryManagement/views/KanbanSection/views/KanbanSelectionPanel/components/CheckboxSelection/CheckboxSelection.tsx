import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';

import { ItemSelectionOptions } from '../../../../KanbanSection';
import { useStyles } from './CheckboxSelection.styles';

export interface Props {
  selectionOptions: ItemSelectionOptions;
  setSelectionOptions: Dispatch<SetStateAction<ItemSelectionOptions>>;
  isValidating: boolean;
}

const CheckboxSelection = ({
  selectionOptions,
  setSelectionOptions,
  isValidating,
}: Props) => {
  const classes = useStyles();

  // Handle Local Checkbox Selection separately from Global Filters
  const [
    localOptions,
    setLocalOptions
  ] = useState<ItemSelectionOptions>(selectionOptions);
  const {
    includeBlocked,
    includeStale,
    includeAboveSle,
    includeExpedited,
    includeUnassigned,
    includeDelayed,
    includeDiscardedAfter,
    includeDiscardedBefore,
  } = localOptions;

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const updatedOptions: ItemSelectionOptions = {
      ...localOptions,
      [event.target.name]: event.target.checked
    };

    // Update checkbox displays
    setLocalOptions(updatedOptions);

    // Update global selection filters, potentially debounced operation
    setSelectionOptions(updatedOptions);
  };

  return(
    <FormControl component="fieldset" >
      <FormGroup className={classes.checkboxContainer}>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeBlocked}
              color="secondary"
              onChange={handleCheckboxChange}
              name="includeBlocked"
              className={classes.checked}
              disabled={isValidating}
            />
          }
          label="Blocked Items"
          className={classes.checkboxItem}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeStale}
              onChange={handleCheckboxChange}
              name="includeStale"
              className={classes.checked}
              disabled={isValidating}
            />
          }
          label="Stale Items"
          className={classes.checkboxItem}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeDelayed}
              onChange={handleCheckboxChange}
              name="includeDelayed"
              className={classes.checked}
              disabled={isValidating}
            />
          }
          label="Delayed Items"
          className={classes.checkboxItem}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeAboveSle}
              onChange={handleCheckboxChange}
              name="includeAboveSle"
              className={classes.checked}
              disabled={isValidating}
            />
          }
          label="Above SLE"
          className={classes.checkboxItem}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeExpedited}
              onChange={handleCheckboxChange}
              name="includeExpedited"
              className={classes.checked}
              disabled={isValidating}
            />
          }
          label="Expedited Items"
          className={classes.checkboxItem}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeUnassigned}
              onChange={handleCheckboxChange}
              name="includeUnassigned"
              className={classes.checked}
              disabled={isValidating}
            />
          }
          label="Unassigned"
          className={classes.checkboxItem}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeDiscardedBefore}
              onChange={handleCheckboxChange}
              name="includeDiscardedBefore"
              className={classes.checked}
              disabled={isValidating}
            />
          }
          label="Discarded Before Start"
          className={classes.checkboxItem}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={includeDiscardedAfter}
              onChange={handleCheckboxChange}
              name="includeDiscardedAfter"
              className={classes.checked}
              disabled={isValidating}
            />
          }
          label="Discarded After Start"
          className={classes.checkboxItem}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxSelection;
