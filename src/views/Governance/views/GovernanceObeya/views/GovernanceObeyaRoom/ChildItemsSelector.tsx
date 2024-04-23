import { FormControl, makeStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useState } from 'react';

import { ChildItemsLevels } from '../../interfaces/index';

type Props = {
  disabled: boolean;
  hierarchyLevel: number;
  handleChange: (value: number) => void;
  childItemsLevelKeys: string[];
};

const useStyles = makeStyles({
  formControl: {
    width: 350
  },
});

export function ChildItemsSelector({
  disabled,
  handleChange,
  childItemsLevelKeys,
  hierarchyLevel,
}: Props) {
  const classes = useStyles();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const [value, setValue] = useState(hierarchyLevel === 0 ? 1 : hierarchyLevel);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    if ( typeof value === "number") {
      handleChange(value);
      setValue(value);
    }
  };
  return (
    <div>
      <FormControl className={classes.formControl}>
        <span style={{ fontSize: "12px", color: "#C0C0C0"}}>
          Level of hierarchy
        </span>
        <Select
          fullWidth
          name="hierarchyLevel"
          margin="dense"
          disabled={hierarchyLevel ? false : disabled}
          defaultValue={hierarchyLevel === 0 ? 1 : hierarchyLevel}
          onChange={onChange}
          value={value}
          // input={<OutlinedInput />}
          MenuProps={MenuProps}
        >
          <MenuItem dense value="" disabled>
            Level
          </MenuItem>
          {childItemsLevelKeys.map((item, index) => {
            const level = ChildItemsLevels[item];
            return (
              <MenuItem key={index} dense value={index + 1}>
                {level}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
