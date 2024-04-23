import { Box, IconButton, styled } from "@material-ui/core";
import { EditIconWrapper } from "views/NorthStar/views/NorthStarPage.styles";

export const WrapperHeader = styled(Box)({
    display: "flex",
    background: "#F0F0F0",
    borderRadius: 16,
    position: "relative",
  });
  
  export const WrapperFooter = styled(Box)({
    "& > .footerContainer": {
      backgroundColor: "#00bfb2",
      height: 145.34,
      marginTop: 0,
    },
  });
  
  export const PageContainer = styled(Box)({
    padding: 26,
    // paddingLeft: 30,
    // paddingRight: 30,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    backgroundColor: "#F0F0F0",
    // minHeight: 785,
    // paddingBottom: '3rem'
  });
  
  export const WrapperMain = styled(Box)({
    display: "flex",
    flexDirection: "column",
    background: "#F0F0F0",
    minHeight: "100vh",
    paddingRight: 20
  });
  
  export const EditIcon = styled(EditIconWrapper)({
    color: "#fff",
    fontSize: 16,
  });
  
  export const IconButtonWrapper = styled(IconButton)({
    width: 28,
    height: 28,
    background: "#0077C8",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0067ad",
    },
  });
  
  export const AddButtonWrapper = styled(IconButton)({
    width: 28,
    height: 28,
    background: "#0077C8",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0067ad",
    },
  });
  
  export const AlignedNotAlignedContainer = styled(Box)({
    width: 363,
    height: 290,
  });
  