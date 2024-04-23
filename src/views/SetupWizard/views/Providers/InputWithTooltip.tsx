import { CSSProperties } from 'react';
import { useController, Control } from 'react-hook-form';
import Tooltip from '@material-ui/core/Tooltip';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStylesTooltip = makeStyles(() => ({
  arrow: {
    color: '#335da9',
  },
  tooltip: {
    backgroundColor: '#335da9',
    zIndex: 600,
  },
}));

function Input({ name, rules, defaultValue, control, ...props }: any) {
  const {
    field: { ref, ...inputProps },
    fieldState: { error, invalid },
  } = useController({ name, rules, defaultValue, control });
  return (
    <TextField
      {...inputProps}
      inputRef={ref}
      error={invalid}
      helperText={invalid && error}
      {...props}
    />
  );
}

type Props = {
  tooltipContent;
  tooltipStyle: CSSProperties;
  control?: Control<any>;
  showTooltip?: boolean;
};

const InputWithTooltip = (props: Props & TextFieldProps) => {
  const { tooltipContent, tooltipStyle, control, showTooltip } = props;
  const [open, setOpen] = useState(false);
  const classesTooltip = useStylesTooltip();
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      {showTooltip && 
      <Tooltip
        classes={classesTooltip}
        onClose={handleTooltipClose}
        open={open}
        title={tooltipContent}
        arrow
        interactive
        PopperProps={{
          disablePortal: false,
        }}
      >
        <span style={tooltipStyle}></span>
      </Tooltip>}
      <Input
        control={control}
        {...props}
        onClick={handleTooltipOpen}
        //onHover={handleTooltipOpen}
        onFocus={handleTooltipOpen}
        onBlur={handleTooltipClose}
      />
    </div>
  );
};

export default InputWithTooltip;
