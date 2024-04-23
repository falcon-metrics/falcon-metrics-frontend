import { Box, FormControlLabel, TextField, Typography, styled } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: 200,
    },
    includeChildren: {
      display: "inline-flex",
      alignItems: "center",
      marginRight: 4,
    },
    includeCheckboxLabel: {
      color: "rgba(0, 0, 0, 0.54)",
      fontFamily: "Open Sans",
      marginLeft: 4,
      flexGrow: 1,
    },
    checkboxIncludeChildren: {
      padding: 0,
      color: "#757575",
    },
    fqlError: {
      fontSize: 12,
      color: "#f44336",
      fontFamily: "Open Sans",
    },
    loading: {
      "& .MuiInput-underline:after": {
        borderBottomColor: "#4caf50",
      },
    },
    valid: {
      "& .MuiInput-underline:after": {
        borderBottomColor: "#4caf50",
      },
    },
    subtitle: {
      textAlign: "center",
      fontFamily: "Open Sans",
      fontSize: 15,
      color: "#4d4d4d",
      fontWeight: 700,
      marginBottom: 20,
      fontWeigth: "bold",
    },
    general: {
      background: "#f1f1f1",
      display: "flex",
      justifyContent: "center",
    },
    wrapperGeneral: {
      background: "#FCFCFC",
      padding: 20,
    },
    wrapperSystemFields: {
      background: "#FCFCFC",
      padding: 20,
    },
    customTextField: {
      "& input::placeholder": {
        fontSize: "14px",
        fontFamily: "Open Sans",
      },
    },
    title: {
      fontSize: 18,
      fontFamily: "Open Sans",
      marginBottom: 30,
      padding: 10,
    },
    includeLabel: {
      marginTop: -2,
      marginRight: 6,
      fontWeight: "bold",
      color: "#585858",
      fontSize: 14,
      fontFamily: "Open Sans",
      background: "#FCFCFC",
      display: "inline-flex",
      alignSelf: "center",
    },
    input: {
      margin: "8px",
    },
    datesSelectionContainer: {
      display: "flex",
      alignItems: "center",
    },
    datepickerBox: {
      marginRight: "40px",
    },
    datepicker: {
      margin: "8px",
    },
    generalButton: {
      flex: 1,
      flexFlow: "row",
      height: 100,
      border: "1px solid blue",
      background: "blue",
    },
    buttonSave: {
      display: "inline-flex",
      background: "rgb(0, 116, 200)",
      color: "white",
      padding: "0.6rem",
    },
    buttonCancel: {
      display: "inline-flex",
      padding: "0.6rem",
    },
    error: {
      color: "#f44336",
      padding: 10,
    },
    section: {},
    titleSection: {
    },
    textSectionType: {
      width: 50,
    },
    backToLink: {
      display: "flex",
      alignItems: "center",
      color: "#585858",
      fontSize: 14,
      fontWeight: "lighter",
      fontFamily: "Open Sans",
      "&:visited": {
        textDecoration: "none",
      },
      "&:link": {
        textDecoration: "none",
      },
      "&:hover": {
        textDecoration: "underline",
      },
    },
    infoTypeSection: {
      color: "#585858",
      fontSize: 14,
      fontFamily: "Open Sans",
      marginTop: 20,
      padding: 0,
    },
    radio: {
      color: "#585858",
    },
    titleObeyaInfo: {
    },
    titleFilter: {
      paddingLeft: "15px",
      paddingRight: "15px",
      fontWeight: "bold",
    },
    titlePermissions: {
      width: 150,
    },
    sectionPermission: {
      height: 200,
      marginBottom: 5,
    },
    selector: {
      width: 120,
      marginLeft: 50,
    },
    includeRelatedChild: {
      width: 340,
    },
  })
);

export const Section = styled(Box)({
  border: "solid 1px #c4c4c4",
  position: "relative",
  padding: 14,
  marginBottom: 20,
});

export const CheckboxSection = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  position: "absolute",
  top: 28,
  right: 72,
});

export const SectionTitle = styled(Typography)({
  color: "#585858",
  fontSize: 14,
  fontFamily: "Open Sans",
  background: "#FCFCFC",
  position: "absolute",
  top: -10,
  left: 20,
  display: "flex",
  justifyContent: "center",
  paddingLeft: "15px",
  paddingRight: "15px",
  fontWeight: "bold",
});

export const InputControl = styled(TextField)({
  margin: 8
});
export const LabelControl = styled(FormControlLabel)({
  fontSize: 14,
  fontFamily: "Open Sans",
  marginRight: 10
});

export const AddInitiativeCheckbox = styled(Typography)({
  fontSize: 12,
  fontFamily: "Open Sans",
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