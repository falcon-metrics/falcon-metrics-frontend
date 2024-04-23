import { Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import { useMemo, CSSProperties } from "react";

const ColorMap = {
  [-1]: "#008F80",
  30: "#00B5AE",
  50: "#69CECC",
  70: "#FFCB45",
  85: "#FF9E19",
  95: "#F0870D",
  100: "#F56D5E",
  300: "#E03C31",
  500: "#B22229",
};

interface Props {
  value: number;
}

function FormattedSLE({ value }: Props) {
  const numberValue = Number(value);
  const percentageValue = Math.round(numberValue * 100);

  const fontColor = useMemo(() => {
    let color = "#605E5C";

    const colorMapLimits = sortBy(Object.keys(ColorMap).map((n) => Number(n)));
    colorMapLimits.forEach((limit, i, arr) => {
      const isLast = i === arr.length - 1;
      if (
        percentageValue > limit &&
        (percentageValue <= arr[i + 1] || isLast)
      ) {
        color = ColorMap[limit];
      }
    });
    return color;
  }, [ColorMap, value]);

  const containerStyles: CSSProperties = {
    color: fontColor,
    fontWeight: "bolder",
    fontSize: 12,
    fontFamily: 'Open Sans'
  };

  return <Typography style={containerStyles}>{percentageValue}%</Typography>;
}

export default FormattedSLE;
