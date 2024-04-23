import { Box, TextField, Button } from "@material-ui/core";
import { createStyles, makeStyles, styled } from "@material-ui/core/styles";

export const CustomTextField = styled(TextField)({
  "&": {
    color: "#1890ff",
    fontFamily: "Open Sans",
  },
  "& .MuiFormLabel-root": {
    fontFamily: "Open Sans",
  },
});

export const SaveButton = styled(Button)({
  "MuiButton-containedSizeLarge": {
    padding: "8px 56px",
  },
});

export const SaveButtonContainer = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  position: "absolute",
  bottom: 25,
  right: 30,
  width: "100%",
  background: "#fcfcfc",
  paddingTop: 10,
});

export const WrapperStrategyDescription = styled(Box)({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  marginBottom: 20
});

export const TextFieldLabel = styled(Box)({
  display: "flex",
  fontSize: "12px",
  marginTop: "14px",
  marginBottom: "10px",
  fontFamily: "Open Sans",
  color: "rgba(0, 0, 0, 0.58)",
});

export const AmountOfCharacters = styled(Box)({
  fontFamily: "Open Sans",
  fontSize: 12,
  color: "rgba(0, 0, 0, 0.58)",
  display: "flex",
  justifyContent: "flex-end",
  marginTop: -15,
});

export const useStyles = makeStyles(
  createStyles({
    inputSize: {
      width: 332,
      marginTop: 20,
    },
    inputSizeStrategyTitle: {
      width: "100%",
    },
    inputSizeHorizon: {
      width: 200,
      marginTop: 20,
    },
    inputSizeStrategyHorizon: {
      marginBottom: 35,
      marginTop: 20,
    },
    inputSizeEfectiveDate: {
      width: 250,
      marginTop: 0,
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    publishButton: {
      display: "flex",
      justifyContent: "flex-end",
    },
    wrapperForm: {
      margin: 20,
      marginBottom: 35
    },
    textField: {
      width: 374,
    },
    textFieldStrategyTitle: {
      width: 860,
    },
    saveButton: {
      background: "#1976d2",
      color: "#fff",
    },
    helpText: {
      color: "#f44336",
    },
    titleElementInput: {
      marginTop: 22,
      fontFamily: "Open Sans",
    },
    titleSelectElement: {
      fontFamily: "Open Sans",
    },
    inputWidget: {
      width: 332,
      marginTop: 40,
    },
    inputElement: {
      marginTop: 5,
      width: 332,
    },
    selectElement: {
      width: 200,
    },
    multiSelectTags: {
      width: 374,
      height: "auto",
      display: "flex",
      flexWrap: "wrap",
    },
    inputStrategyStatement: {
      width: 864,
    },
    titleFormContext: {
      fontSize: 20,
      fontFamily: "Open Sans",
      color: "#2B353B",
      fontWeight: "bold",
      margingTop: 10,
      marginBottom: 20,
    },
    titleBreadcrumb: {
      fontSize: 14,
      fontFamily: "Open Sans",
      color: "#2B353B",
      fontWeight: "bold",
      marginTop: 40,
      marginBottom: 10,
    },
  })
);
