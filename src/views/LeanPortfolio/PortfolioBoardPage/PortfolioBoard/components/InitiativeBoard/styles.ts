import {
  Box,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Typography,
  FormControlLabel,
  createStyles,
  styled,
  withStyles,
  Button,
  FormHelperText,
} from "@material-ui/core";

import { CSSProperties } from "react";
import { Link } from "react-router-dom";

const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    borderRadius: "10px",
    height: "10px",
    width: "10px",
    backgroundColor: "#F7F7F7",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "20px",
    backgroundColor: "#D1D2D3",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    borderRadius: "20px",
  },
};

export function getDroppableStyle(dragging: boolean): CSSProperties {
  return {
    paddingTop: 0,
    minHeight: 660,
    border: !dragging ? "" : "3px dashed #EBEBEB",
    backgroundColor: !dragging ? "" : "#F7F7F7",
    borderRadius: !dragging ? 0 : 10,
  };
}

export function getColumnHeaderStyle(headerColor: string): CSSProperties {
  return {
    backgroundColor: headerColor,
    padding: 10,
    minHeight: 50,
    fontFamily: "Open Sans",
    fontSize: 14,
  };
}

export function getColumnContentStyle(): CSSProperties {
  return {
    padding: 10,
    height: 680,
    minHeight: 10,
    overflowY: "auto",
    overflowX: "hidden",
    fontFamily: "Open Sans",
    fontSize: 14,
  };
}

export function getInitiativeCardStyle(headerColor: string): any {
  return {
    backgroundColor: "#FEFEFE",
    minHeight: 100,
    minWidth: 270,
    boxShadow: "0px 2px 5px 0px #e2e2e2",
    borderLeft: `8px solid ${headerColor}`,
    borderRight: "none",
    borderTop: "none",
    borderBottom: "none",
    borderRadius: 5,
    fontFamily: "Open Sans",
    fontSize: 14,
  };
}
export const BorderLinearProgress = withStyles(() =>
  createStyles({
    root: {
      height: 8,
      borderRadius: 5,
      width: 110,
    },
    colorPrimary: {
      backgroundColor: "#D9D9D9",
    },
    bar: {
      borderRadius: 5,
      backgroundColor: "#33B0E5",
    },
  })
)(LinearProgress);

export const DragDropContainer = styled(Box)({
  position: "relative",
  paddingTop: 10,
  width: "100%",
  minHeight: 740,
  overflow: "hidden"
});

export const ColumnCard = styled(Card)({
  backgroundColor: "#F0F0F0",
  boxShadow: "none",
  marginRight: 10,
  borderRadius: 10,
  minWidth: 320,
});

export const ColumnHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const ColumnHeaderContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#F0F0F0",
});

export const ColumnTitle = styled(Box)({
  fontFamily: "Open Sans",
  fontSize: 16,
  fontWeight: 600,
  color: "#FEFEFE",
  textAlign: "center",
  marginLeft: 5,
  display: "flex",
  alignItems: "center",
});

export const Counter = styled(FormHelperText)({
  color: "#FEFEFE",
  fontFamily: "Open Sans",
  alignItems: "center",
  justifyContent: "flex-end",
  display: "flex",
  fontSize: 14,
  fontWeight: 600,
  paddingBottom: 5
});

export const ColumnContent = styled(CardContent)({
  margin: 5,
  ...scrollbarStyle,
});
export const ColumnMenuIcon = styled(IconButton)({
  height: 25,
  width: 25,
  color: "#FEFEFE",
});

export const InitiativeDiv = styled(`div`)({
  padding: 5,
});

export const Header = styled(Box)({
  display: "flex",
  padding: "10px 0 0 12px",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
});

export const Title = styled(Link)({
  alignItems: "center",
  fontSize: 14,
  fontWeight: 600,
  fontFamily: "Open Sans",
  color: "#2B353B",
  cursor: "pointer",
  wordWrap: "break-word"
});

export const MenuIcon = styled(IconButton)({
  height: 25,
  width: 25,
  position: "absolute",
  top: 5,
  right: 5,
  color: "#2B353B",
});

export const InitiativeContent = styled(CardContent)({
  padding: 12,
  margin: 0,
});

export const DeliveryDateContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  paddingTop: 2,
  color: "#2B353B",
  fontFamily: "Open Sans",
  fontSize: 12,
});

export const DeliveryDate = styled(DeliveryDateContainer)({
  backgroundColor: "#F0F0F0",
  borderRadius: 12,
  padding: "1px 4px 1px 4px",
});

export const PrimaryText = styled(Typography)({
  color: "#2B353B",
  fontFamily: "Open Sans",
  fontSize: 10,
});

export const SecondaryText = styled(PrimaryText)({
  color: "#808689",
  paddingLeft: 2,
});

export const ProgressContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const ProgressValue = styled(Typography)({
  color: "#808689",
  fontFamily: "Open Sans",
  fontSize: 12,
  paddingLeft: 3,
  paddingRight: 3,
  lineHeight: 3,
});

export const ConfidenceContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  backgroundColor: "#FCF4F4",
  borderRadius: 12,
  marginBottom: 5
});

export const ConfidenceValue = styled(Typography)({
  color: "#2B353B",
  fontFamily: "Open Sans",
  fontSize: 12,
  fontWeight: 600,
});

export const ConfidenceCaption = styled(Typography)({
  color: "#808689",
  fontFamily: "Open Sans",
  fontSize: 11,
  paddingLeft: 2,
});

export const EstimatedDatesContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  paddingTop: 5,
});

export const EstimatedDates = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

export const ExpectedDateHeader = styled(Typography)({
  fontWeight: 600,
  fontSize: 12,
  fontFamily: "Open Sans",
  color: "#2B353B",
});

export const LabelControl = styled(FormControlLabel)({
  marginLeft: -10
})

export const AchievedCheckbox = styled(Typography)({
  fontSize: 12,
  fontFamily: "Open Sans",
});

export const LinkIconContainer = styled(Box)({
  display: "flex",
  padding: 0,
  justifyContent: "flex-end",
  marginBottom: -18,
  marginRight: -7,
});

export const SeeMoreButton = styled(Button)({
  padding: 0, 
  marginTop: 10,
  marginBottom: 10,
  textTransform: 'capitalize',
  backgroundColor: "transparent",
  fontSize: 12,
  fontFamily: "Open Sans",
  fontWeight: 600
})