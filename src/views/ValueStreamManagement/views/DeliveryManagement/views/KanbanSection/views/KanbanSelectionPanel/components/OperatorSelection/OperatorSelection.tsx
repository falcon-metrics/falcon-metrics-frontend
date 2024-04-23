import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

import { useStyles } from './OperatorSelection.styles';

export interface Props {
  selectionOperator: string;
  setSelectionOperator: Dispatch<SetStateAction<string>>;
  isValidating: boolean;
}

const OperatorSelection = ({
  selectionOperator,
  setSelectionOperator,
  isValidating,
}: Props) => {
  const classes = useStyles();

  const handleOperatorChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSelectionOperator(target.value);
  };

  return(
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="operator"
        name="operator"
        value={selectionOperator}
        onChange={handleOperatorChange}
        className={classes.radioButtonContainer}
        row
      >
        <FormControlLabel
          value="and"
          control={<Radio className={classes.checked}/>}
          label="AND"
          disabled={isValidating}
        />
        <FormControlLabel
          value="or"
          control={<Radio className={classes.checked}/>}
          label="OR"
          disabled={isValidating}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default OperatorSelection;
