import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import { styled } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useForm } from 'react-hook-form';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

import OutlinedInput from '@material-ui/core/OutlinedInput';

import { useStyles } from './ReplyTextField.styles';

const CustomTextField = styled(OutlinedInput)({
  '&': {
    color: '#2B353B', 
    fontFamily: 'Open Sans',
    background: '#F3F3F3',
    // padding: 16,
    paddingRight: 0,
    width: 250,
    height: 52,
    marginTop: 4,
    borderBottom: 0,
    borderRadius: 20,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff'
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    fontFamily: 'Open Sans',
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0)'
  },
});

type Props = {
  onSubmitReply?: (string) => void;
  afterChange?: () => void;
};

const validatorSchema = yup.object().shape({
  comment: yup.string().max(225, 'Max characters are 225')
});

const resolver = yupResolver(validatorSchema);

export type FormFields = {
  comment?: string;
};

export const ReplyTextField = ({ onSubmitReply, afterChange }: Props) => {
  const classes = useStyles();

  const formMethods = useForm<FormFields>({
    resolver,
    defaultValues: {
      comment: '',
    },
  });
  const {
    control, getValues, reset, 
    formState: {
      errors,
    },
  } = formMethods;

  const submitReply = () => {
    const { comment } = getValues();
    if (!comment?.length) {
      return;
    }
    onSubmitReply?.(comment);
    reset();
  };

  return (
    <Box className={classes.wrapperReplyField}>
      <Controller
        render={({ field }) => {
          return (
            <>
              <FormControl>
                <CustomTextField
                  {...field}
                  onChange={(event) => {
                    field.onChange(event);
                    afterChange?.();
                  }}
                  value={field?.value}
                  error={!!errors?.comment}
                  multiline
                  rows={1}
                  placeholder="Reply"
                  inputProps={
                    {
                      maxLength: 255,
                      style: { fontSize: 14, fontFamily: 'Open Sans' },
                    }
                  }
                  endAdornment={
                    <InputAdornment onClick={submitReply} position="end" style={{ marginLeft: 10, }}>
                      <IconButton
                        aria-label="Reply comment"
                        style={{
                          padding: 8,
                          background: '#CCE4F4',
                          marginRight: 6
                        }}
                      >
                        <ArrowUpwardIcon style={{ color: '#0077C8' }}/>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormHelperText className={classes.helpText}>
                {errors && errors?.comment?.message}
              </FormHelperText>
            </>
          );
        }}
        name="comment"
        control={control}
      />
    </Box>
  );
};
