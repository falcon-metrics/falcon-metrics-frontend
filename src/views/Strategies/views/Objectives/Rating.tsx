import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/styles";
import { ratingConfig } from "views/Governance/views/GovernanceObeya/utils";
import { styled, Typography } from "@material-ui/core";

const Custom = (bgColor) =>
  withStyles({
    root: {
      backgroundColor: bgColor,
      borderRadius: "50%",
      color: "#fff",
      fontFamily: "Open Sans",
      fontSize: 14,
      width: 12,
      height: 12,
    },
  })(Chip);

type StyleProps = {
  labelColor: string;
};

const RatingLabel = styled(Typography)(({ labelColor }: StyleProps) => ({
  color: labelColor === "dark" ? "#323130" : "#FCFCFC",
  fontFamily: "Open Sans",
  fontSize: 14,
  fontWeight: 600,
  marginLeft: 8,
}));

export const RatingLabels = {
  "1": ({ labelColor }) => getRatingLabel(1, labelColor),
  "2": ({ labelColor }) => getRatingLabel(2, labelColor),
  "3": ({ labelColor }) => getRatingLabel(3, labelColor),
  "4": ({ labelColor }) => getRatingLabel(4, labelColor),
  default: () => "-",
};

function getRatingLabel(rating, labelColor) {
  const { color, text } = ratingConfig[rating];
  const RatingComponent = Custom(color);

  const label = (
    <Box style={{ display: "flex", alignItems: "center" }}>
      <RatingComponent />
      <RatingLabel labelColor={labelColor}>{text}</RatingLabel>
    </Box>
  );

  if (rating === 4) {
    return (
      <Box style={{ display: "flex", alignItems: "center" }}>
        <RatingComponent className={"not-rated-header"} />
        <RatingLabel labelColor={labelColor}>{text}</RatingLabel>
      </Box>
    );
  }

  return label;
}
