import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/styles";
import { ratingConfig } from "views/Governance/views/GovernanceObeya/utils";

const Custom = (bgColor) =>
  withStyles({
    root: {
      backgroundColor: bgColor,
      borderRadius: 2,
      color: "#fff",
      fontFamily: "Open Sans",
      fontSize: 14
    },
  })(Chip);

const NotRated = (bgColor = "#d7d7d7") =>
  withStyles({
    root: {
      backgroundColor: bgColor,
      borderRadius: 2,
      fontFamily: "Open Sans",
      fontSize: 14,
    },
  })(Chip);

export const RatingLabels = {
  "1": () => {
    const { color, text } = ratingConfig[1];
    const OnTrack = Custom(color);
    return <OnTrack label={text} />;
  },
  "2": () => {
    const { color, text } = ratingConfig[2];
    const Behind = Custom(color);
    return <Behind label={text} />;
  },
  "3": () => {
    const { color, text } = ratingConfig[3];
    const AtRisk = Custom(color);
    return <AtRisk label={text} />;
  },
  "4": () => {
    const { color, text } = ratingConfig[4];
    const NotRatedLabel = NotRated(color);
    return <NotRatedLabel className={"not-rated-header"} label={text} />;
  },
  default: () => "-",
};
