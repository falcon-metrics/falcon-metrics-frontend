import { useEffect, useMemo, useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ZingChart from "zingchart-react";
import { legendConfigs } from "../ChartConfig";
import { colourPalette } from "views/ValueStreamManagement/views/DeliveryManagement/views/AnalyticsView/views/ProfileOfWorkSection/utils/chartColors";
import { clone } from "lodash";
import _ from "lodash";

const SMALL_LEGEND_WIDTH = 80;
const configLegendSmallResolutions = {
  width: SMALL_LEGEND_WIDTH,
  maxChars: 19,
  border: "1px solid blue",
};
type DemandDistributionTabData = {
  [normalizedDisplayName: string]: number;
};

const defaultTheme = {
  graph: {
    plotarea: {
      margin: "20px 50px 60px 60px",
    },
    tooltip: {
      visible: true,
      callout: true,
      calloutWidth: "20px",
      backgroundColor: "#ffffff",
      fontColor: "#707070",
      fontSize: "12px",
      fontFamily: "Open Sans",
      padding: "8px",
      htmlMode: true,
      shadow: false,
      borderColor: "#e3e3e3",
      borderWidth: "1px",
    },
  },
};

type Props = {
  data: DemandDistributionTabData;
  getColorByDisplayName: (key: string) => string | undefined;
};

const DistributionChart = ({ data, getColorByDisplayName }: Props) => {

  const config = useMemo(() => {
    if (!data) {
      // You should show skeleton loading while there's no data
      console.warn("Missing data on distribution chart");
      return null;
    }
    const legendConfigsAltered: any = clone(legendConfigs);
    legendConfigsAltered.marginLeft = 0;
    legendConfigsAltered.marginRight = 60;
    legendConfigsAltered.marginBottom = 32;
    const config: any = {
      type: "bar",
      scaleX: {
        labels: [""],
        label: {
          text: "",
        },
      },
      series: [],
      tooltip: {
        decimals: 1,
        rules: [
          {
            rule: "%vt <= 1",
            decimals: 2,
            text: `%vt (%data-percentage%) %plot-text item.`,
          },
          {
            rule: "%vt > 1",
            text: `%vt (%data-percentage%) %plot-text items.`,
          },
        ],
      },
      legend: legendConfigsAltered,
      plot: {
        barWidth: "25px",
        hoverState: {
          visible: false,
        },
        // animation: {
        //   method: "LINEAR",
        //   delay: 0,
        //   effect: 0,
        //   sequence: 0,
        //   speed: 0,
        // },
      },
    };
    let colourIdxBG = 0;
    // Keys that are statically ordered
    const total = Object.values(data).reduce((a, v) => a + v, 0);
    const entries = _
      .chain(data)
      .entries()
      .orderBy(entry => entry[1], "desc")
      .value();
    for (const [key, value] of entries) {
      const normalizationColor = getColorByDisplayName(key);
      const color = normalizationColor || colourPalette[colourIdxBG++];
      if (value) {
        config.series.push({
          text: key,
          values: [value],
          backgroundColor: color,
          "data-percentage": total ? ((value / total) * 100) : 0
        });
      }
    }
    return config;
  }, [data]);

  const isWidthLargerThan1550px = useMediaQuery("(min-width: 1550px)");
  const initialConfig = config;
  const [chartConfig, setChartConfig] = useState<any>(initialConfig);

  useEffect(() => {
    if (!config) {
      return;
    }
    if (isWidthLargerThan1550px) {
      console.log("Updating chart config");
      setChartConfig({
        ...config,
        legend: {
          ...config.legend,
          configLegendSmallResolutions,
          layout: "2x2",
          x: "60%",
          y: "8%",
          paddingLeft: "24%",
        },
      });
    }
  }, [isWidthLargerThan1550px, config]);

  return <ZingChart data={chartConfig} theme={defaultTheme} />;
};

export default DistributionChart;
