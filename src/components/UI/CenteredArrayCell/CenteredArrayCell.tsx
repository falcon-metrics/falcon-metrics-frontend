import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/styles";
import { CSSProperties, ReactNode } from "react";
import { getTrendArrowImage } from "utils/statistics/TrendAnalysis";

const Cell = styled(Box)({
  width: "100%",
});

type Props = {
  value: ReactNode;
  formattedValue?: ReactNode;
};

const CenteredArrayCell = ({ value, formattedValue = value }: Props) => {
  // show a dash when 'null'
  if (value === null || !Array.isArray(value)) {
    const imagePath: string = getTrendArrowImage("stable", "grey");

    const containerStyles: CSSProperties = {
      display: "flex",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    };

    const imageStyles: CSSProperties = {
      position: "relative",
    };

    return (
      <Cell style={containerStyles}>
        <img
          src={imagePath}
          className="sle-trend-icon"
          style={imageStyles}
          alt="Trend Icon"
        />
      </Cell>
    );
  }

  const daysLabels: string =
    Array.isArray(value) && value.length === 1
      ? `${value[0]}`
      : `[${value?.toString()}]`;

  const timeUnit: string =
    Array.isArray(value) && value.length === 1 && value[0] === 1
      ? "day"
      : "days";

  return (
    <Cell
      style={{
        textAlign: "center",
        fontFamily: "Open Sans",
        fontSize: 14,
        color: "#605E5C",
      }}
    >
      {/* prevent showing "null" on the grid. this happens when fields/custom fields is equal to "null" */}
      {typeof formattedValue === "string" && formattedValue === "null"
        ? ""
        : `${daysLabels} ${timeUnit}`}
    </Cell>
  );
};

export default CenteredArrayCell;
