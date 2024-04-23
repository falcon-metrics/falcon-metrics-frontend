import { Button as MuiButton, styled } from "@material-ui/core";

export const SaveButton = styled(MuiButton)({
  backgroundColor: "#F4FAFE",
  width: 160,
  height: 40,
  marginTop: 25,
  color: "#2196f3",
  boxShadow: "none",
  fontWeight: 500,
  fontFamily: "Roboto, sans-serif", // to match the toolbars font
  fontSize: 14,
  "&:hover": {
    backgroundColor: "#BCDFFB",
    boxShadow: "none",
  },
});

export const ResetButton = styled(SaveButton)({
  width: 115,
})