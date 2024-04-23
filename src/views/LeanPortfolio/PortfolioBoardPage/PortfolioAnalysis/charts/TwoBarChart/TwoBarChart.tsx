
import ZingChart from 'zingchart-react';
import { TabProps } from '.';
import { ratioLegends } from '../ChartConfig';

export function TwoBarChart(props: TabProps) {
  const data = {
    "graphset": [
      {
        "type": "bar",
        "utc": true,
        "globals": {
          "fontFamily": "Open Sans"
        },
        "legend": {
          ...ratioLegends
        },
        "plot": {
          "marker": {
            "visible": true
          },
          "offsetX": -30,
          "tooltip": {
            "visible": false
          },
          "valueBox": {
            "text": '$%v',
            "decimals": 2,
            "thousandsSeparator": ',',
            "placement": "top",
            "fontColor": "#0077C8",
            "fontSize": "12px",
            "borderWidth": 0,
            "backgroundColor": "transparent",
            "shadow": false,
            "offsetX": -30
          },
        },
        "scaleX": {
          "borderColor": "rgba(0, 0, 0, 0)",
          "borderAlpha": 0,
          "lineWidth": 0,
          "tick": {
            "visible": false
          },
          "visible": false,
          "label": {
            "text": "",
            "fontSize": "14px",
            "fontColor": "rgba(0, 0, 0, 0)",
            "visible": false
          },
          "guide": {
            "lineColor": "#fff"
          }
        },
        "scaleY": {
          "borderColor": "rgba(0, 0, 0, 0)",
          "borderAlpha": 0,
          "lineWidth": 0,
          "tick": {
            "visible": false
          },
          "visible": false,
          "label": {
            "text": "",
            "fontSize": "14px",
            "fontColor": "rgba(0, 0, 0, 0)",
            "visible": false
          },
          "guide": {
            "lineColor": "#fff"
          }
        },
        "series": [
          {
            "type": "bar",
            "text": "Strategic Initiative",
            "values": [props.strategicValue],
            "backgroundColor": "#26BDB5",
            "bar-space": "0.25",
            "bar-width": "80"
          },
          {
            "type": "bar",
            "text": "Operational Work",
            "values": [props.operationalValue],
            "backgroundColor": "#AAEEEA",
            "bar-space": "0.25",
            "bar-width": "80"
          }
        ]
      }
    ]
  }

  return <ZingChart data={data} theme={props.customTheme} />;
}
