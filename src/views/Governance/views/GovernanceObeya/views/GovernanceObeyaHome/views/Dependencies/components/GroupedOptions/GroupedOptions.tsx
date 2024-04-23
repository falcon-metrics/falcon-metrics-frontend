import { useState } from 'react';

import { useController } from 'react-hook-form';

import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { useStyles } from './styles';

export enum OptionsTypes {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
};

type Props = {
  onSelectChange?: (value: string) => void;
  defaultValue?: string;
  name: string;
  control: any;
  disabled?: boolean;
};

export const GroupedOptions = ({ onSelectChange, defaultValue, name, control, disabled }: Props) => {
  const [selectedOption, setOption] = useState<string>(defaultValue || 'medium');
  const classes = useStyles();
  const { field: inputProps } = useController({ name, control });

  return (
    <Box className={classes.wrapper}>
      <Button
        className={`${classes.defaultOptionButton} ${classes.highHover}  ${selectedOption === OptionsTypes.HIGH ? classes.high : ''}`}
        type="button"
        size="large"
        variant="outlined"
        color="primary"
        onClick={() => {
          inputProps.onChange(OptionsTypes.HIGH);
          setOption(OptionsTypes.HIGH);
          onSelectChange?.(OptionsTypes.HIGH);
        }}
        disabled={disabled}
      >
        High
      </Button>
      &nbsp;
      <Button
        className={`${classes.defaultOptionButton} ${classes.mediumHover} ${selectedOption === OptionsTypes.MEDIUM ? classes.medium : ''}`}
        type="button"
        size="large"
        variant="outlined"
        color="primary"
        onBlur={() => {
          inputProps.onChange(OptionsTypes.MEDIUM);
          setOption(OptionsTypes.MEDIUM);
          onSelectChange?.(OptionsTypes.MEDIUM);
        }}
        onClick={() => {
          setOption(OptionsTypes.MEDIUM);
          onSelectChange?.(OptionsTypes.MEDIUM);
        }}
        disabled={disabled}
      >
        Medium
      </Button>
      &nbsp;
      <Button
        className={`${classes.defaultOptionButton} ${classes.lowHover} ${selectedOption === OptionsTypes.LOW ? classes.low : ''}`}
        type="button"
        size="large"
        variant="outlined"
        color="primary"
        onClick={() => {
          inputProps.onChange(OptionsTypes.LOW);
          setOption(OptionsTypes.LOW);
          onSelectChange?.(OptionsTypes.LOW);
        }}
        disabled={disabled}
      >
        Low
      </Button>
    </Box>
  );
};