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
  type?: string;
  unit?: string;
};

const CenteredTextCell = ({ value, formattedValue = value, type, unit }: Props) => {
  if (unit === "days") {
    if (
      (typeof value === "number" && value <= 1) ||
      (typeof value === "object" && value && value[0] <= 1)
    ) {
      unit = unit.replace(/s$/, "");
    }
  }
  
  // show a dash when 'null'
  if (type === "mode") {
    if (value === null || !Array.isArray(value)) {
      const imagePath: string = getTrendArrowImage("stable", "grey");

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
          <img src={imagePath} className="sle-trend-icon" style={imageStyles} />
        </Cell>
      );
    }
  }

  return (
    <Cell
      style={{
        textAlign: "center",
        textTransform: "capitalize",
        fontFamily: "Open Sans",
        fontSize: 14,
        color: "#605E5C",
      }}
    >
      {/* prevent showing "null" on the grid. this happens when fields/custom fields is equal to "null" */}
      {typeof formattedValue === "string" && formattedValue === "null"
        ? ""
        : formattedValue}{" "}
      {unit && `${unit}`}
    </Cell>
  );
};

export default CenteredTextCell;
