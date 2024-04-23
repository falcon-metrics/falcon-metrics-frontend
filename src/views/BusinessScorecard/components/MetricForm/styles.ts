import {
  Box,
  Select,
  TextField,
  Typography,
  styled,
} from "@material-ui/core";

export const Section = styled(Box)({
  border: "solid 1px #c4c4c4",
  position: "relative",
  padding: 20,
  marginBottom: 20,
  marginRight: 20,
});

export const GroupTitle = styled(Typography)({
  color: "#585858",
  fontSize: 14,
  fontFamily: "Open Sans",
  background: "#FCFCFC",
  display: "flex",
  paddingBottom: 3,
  fontWeight: "bold",
});

export const SectionTitle = styled(GroupTitle)({
  position: "absolute",
  top: -10,
  left: 20,
  display: "flex",
  justifyContent: "center",
  paddingLeft: "15px",
  paddingRight: "15px",
});

export const StyledTextField = styled(TextField)({
  marginBottom: 10,
  width: "45%",
  maxWidth: 300,
});

export const StyledSelect = styled(Select)({
  marginBottom: 10,
  marginTop: 10,
  width: "45%",
  maxWidth: 300,
});

export const StyledNumeric = styled(TextField)({
  marginBottom: 10,
  width: 300,
  maxWidth: 300,
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
