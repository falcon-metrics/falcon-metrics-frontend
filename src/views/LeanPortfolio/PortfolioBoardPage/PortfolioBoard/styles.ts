import { Box, Button as MuiButton, styled } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export const ButtonContainer = styled(Box)({
  display: "flex",
  position: "absolute",
  top: 20,
  right: 40
});

export const AddButton = styled(MuiButton)({
  fontFamily: "Open Sans",
  textTransform: "capitalize",
  backgroundColor: "#F7F7F7",
  borderRadius: 12,
  width: 145,
  "&:hover": {
    color: "#0077C8"
  },
});

export const SkeletonButton = styled(Skeleton)({
  paddingBottom: 20,
  height: 25,
  borderRadius: 12
});
