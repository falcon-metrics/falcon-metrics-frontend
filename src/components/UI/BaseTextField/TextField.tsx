import { useController, useFormContext } from 'react-hook-form';
import TextFieldBase, { TextFieldProps } from '@material-ui/core/TextField';

const TextField = ({ name = '', defaultValue, ...props }: TextFieldProps) => {
  const { control } = useFormContext();
  const {
    field: { ref, ...input },
    fieldState: { invalid },
  } = useController({ name, defaultValue, control });

  return <TextFieldBase inputRef={ref} {...input} error={invalid} {...props} />;
};

export default TextField;
