import {
  DialogContent as MuiDialogContent,
  FormHelperText,
  Button as MuiButton,
  DialogActions as MuiDialogActions,
  FormControlLabel as MuiFormControlLabel,
  Typography,
  TextField,
} from "@material-ui/core";
import { styled } from "@material-ui/styles";

export const Button = styled(MuiButton)({
  fontFamily: "Open Sans",
  fontSize: 14,
  textTransform: "capitalize",
  maxHeight: 40,
  marginRight: 16,
});

export const Form = styled(`form`)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const ErrorText = styled(FormHelperText)({
  color: "#f44336",
  paddingLeft: 6,
});

export const DialogContent = styled(MuiDialogContent)({
  display: "flex",
  justifyContent: "center",
  padding: 20,
  flexDirection: "row",
});

export const DialogActions = styled(MuiDialogActions)({
  padding: 0,
  margin: 0,
});

export const FormControlLabel = styled(MuiFormControlLabel)({
  marginLeft: 25,
});

export const LabelControl = styled(FormControlLabel)({
  marginLeft: 25
})

export const AddColumnCheckbox = styled(Typography)({
  fontSize: 12,
  fontFamily: "Open Sans",
});

export const InputControl = styled(TextField)({
  marginRight: 20,
  marginLeft: 5,
});
