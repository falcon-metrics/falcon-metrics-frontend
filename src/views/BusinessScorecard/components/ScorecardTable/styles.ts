import {
  Typography,
  styled,
  Accordion,
  AccordionSummary,
  Box,
} from "@material-ui/core";
import { ToggleButtonGroup } from "@material-ui/lab";

export const TableHeader = styled(Typography)({
  fontFamily: "Open Sans , sans-serif",
  fontStyle: "normal",
  lineHeight: "18px",
  fontWeight: 600,
  fontSize: "12px",
  color: "#2B353B",
});

export const StyledAccordion = styled(Accordion)({
  border: "1px solid #f0f0f0",
  boxShadow: "none",
  marginTop: 0,
  marginBottom: 0,
  padding: 0,
});

export const StyledAccordionSummary = styled(AccordionSummary)({
  display: "flex",
  height: 55,
  color: "#FFFFFF",
  borderRadius: 4,
  minHeight: 0,
});

export const AccordionTitle = styled(Typography)({
  fontFamily: "Open Sans",
  lineHeight: "47px",
  padding: 5,
  fontWeight: 500,
  fontSize: "18px",
  paddingLeft: 10,
});

export const MetricCount = styled(Typography)({
  fontFamily: "'Open Sans'",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10px",
  textTransform: "uppercase",
  color: "#FFFFFF",
  padding: 5,
  lineHeight: "50px",
});

export const LastCheckinContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const LastCheckin = styled(Typography)({
  fontFamily: "Open Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  color: "#555D62"
});

export const ToggleButtons = styled(ToggleButtonGroup)({
  height: 30,
  position: "relative",
  right: -15,
});

export const GraphName = styled(Typography)({
  fontFamily: "'Open Sans'",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 14,
  color: "#2B353B",
  marginLeft: 35,
});

export const GraphContainer = styled(Box)({
  height: 300,
  maxHeight: 300,
});

export const ToggleButtonContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  margin: "0px 35px",
});

export const MetricContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  backgroundColor: "#FFFFFF",
  border: "1px solid #F0F0F0",
});

export const ModalFilterContainer = styled(Box)({
  display: "flex",
  width: "100%",
  backgroundColor: "#fcfcfc",
  position: "sticky",
  top: 0,
  paddingBottom: 15,
  justifyContent: "space-between",
  flexDirection: "row",
  gridGap: 10
});
