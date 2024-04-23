import { useController, useFormContext } from "react-hook-form";
import { TextFieldProps } from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

const BaseCurrencyField = ({
  name = "",
  defaultValue,
  ...props
}: TextFieldProps) => {
  const { control } = useFormContext();
  const {
    field: { ref, value, onChange, onBlur },
    fieldState: { invalid },
  } = useController({ name, defaultValue, control });

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue.replaceAll(",", ""));
  };

  return (
    // uses $ as default currencySymbol
    <CurrencyTextField
      minimumValue={0}
      maximumValue={2147483647} // the max value that the current database type can hold
      decimalPlaces={0}
      variant="standard"
      outputFormat="string"
      onChange={handleInputChange}
      inputRef={ref}
      value={value}
      onBlur={onBlur}
      error={invalid}
      {...props}
    />
  );
};

export default BaseCurrencyField;
