import Box from "@material-ui/core/Box";
import { styled } from "@material-ui/styles";
import { ReactNode } from "react";

const Cell = styled(Box)({
  width: "100%",
});

type Props = {
  value: ReactNode;
  formattedValue?: ReactNode;
  unit?: string;
};

const CenteredCell = ({ value, formattedValue = value, unit }: Props) => {
  if (unit === "days") {
    if (
      (typeof value === "number" && value <= 1) ||
      (typeof value === "object" && value && value[0] <= 1)
    ) {
      unit = unit.replace(/s$/, "");
    }
  }

  return (
    <Cell
      style={{
        textAlign: typeof value === "number" ? "center" : "initial",
        textTransform: typeof value === "string" ? "capitalize" : "none",
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

export default CenteredCell;
