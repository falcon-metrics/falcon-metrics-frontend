import { Tooltip, ValueLabelProps } from "@material-ui/core";

// https://github.com/mui/material-ui/blob/9fb11b6f487d012fadc880c3e9fcd636a4aa3a88/docs/src/pages/components/slider/CustomizedSlider.js#L17
/**
 * Component to display a custom translucent label on the slider's position in the Slider component
 * @param props ValueLabelProps
 * @returns MUI Tooltip
 */
const SliderValueLabel = (props: ValueLabelProps) => {
    const { children, open, value } = props;
  
    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }

export default SliderValueLabel