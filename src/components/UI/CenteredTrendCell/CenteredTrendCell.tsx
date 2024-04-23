import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/styles";
import { CSSProperties } from "react";
import { getTrendArrowImage } from "utils/statistics/TrendAnalysis";

const Cell = styled(Box)({
  width: "100%",
});

type Props = {
  value: any;
};

const CenteredTrendCell = ({
  value
}: Props) => {
  const trendAnalysisSLE = value;
  const { arrowDirection, arrowColour, text } = trendAnalysisSLE;
  const imagePath: string = getTrendArrowImage(arrowDirection, arrowColour);

  const containerStyles: CSSProperties = {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  };
  
  const imageStyles: CSSProperties = {
    position: "relative",
  };
  
  return (
    <Cell style={containerStyles}>
      <img
        src={imagePath}
        className="sle-trend-icon"
        alt={text}
        style={imageStyles}
      />
    </Cell>
  );
};

export default CenteredTrendCell;
