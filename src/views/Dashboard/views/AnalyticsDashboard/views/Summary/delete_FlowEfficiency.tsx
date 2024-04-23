export default null;
// import ZingChart from 'zingchart-react';
// import {HistogramDatum} from 'core/api/ApiClient/lead_time_client';
// // import DashboardCard from 'components/DashboardCard';
// import withFilterColors, {WithFilterColorsProps} from './withFilterColors';

// interface Props extends WithFilterColorsProps {
//   histogramData?: Array<HistogramDatum>;
//   percentile50th?: number;
//   percentile85th?: number;
//   percentile95th?: number;
//   lowerOutliers?: Array<number>;
//   upperOutliers?: Array<number>;
//   modalOpen?: boolean;
// }

// class FlowEfficiencySummary extends Component<Props> {
//   render() {
//     // if (!this.props.histogramData || this.props.histogramData.length < 1)
//     //     return (
//     //         <div className="widget-title">
//     //             Lead Time Histogram
//     //             <FluentUIToolTip contentId="lead-time-histogram" />
//     //         </div>
//     //     );

//     const myTheme = {
//       graph: {
//         plot: {
//           backgroundColor: '#41B6E6',
//           fontSize: '14px',
//         },
//         plotarea: {
//           margin: '20px 50px 60px 60px',
//         },
//         tooltip: {
//           visible: true,
//           callout: true,
//           calloutWidth: '20px',
//           backgroundColor: '#ffffff',
//           fontColor: '#707070',
//           fontSize: '12px',
//           padding: '8px',
//           htmlMode: true,
//           shadow: false,
//           borderColor: '#e3e3e3',
//           borderWidth: '1px',
//           text: '%vt work items took %kt days.',
//         },
//       },
//     };

//     return (
//       <div>
//         <DashboardCard
//           title="Flow Efficiency Trend"
//           contentId="FlowEfficiency"
//           WidgetContent={FlowEfficiencySummary}
//           widgetProps={this.props}
//         />
//         <div className="widget-subtitle"></div>
//         <div className="widget-chart">
//           <ZingChart data={this.setupChartConfig()} theme={myTheme} />
//         </div>
//       </div>
//     );
//   }

//   setupChartConfig() {
//     return {
//       type: 'bar',
//       backgroundColor: '#FFFFFF',
//       stacked: true,
//       stackType: 'normal',
//       plot: {
//         barWidth: '25px',
//         hoverState: {
//           visible: false,
//         },
//       },
//       scaleX: {
//         values: [
//           'JUL',
//           'AUG',
//           'SEP',
//           'OCT',
//           'NOV',
//           'DEC',
//           'JAN',
//           'FEB',
//           'MAR',
//           'APR',
//           'MAY',
//           'JUN',
//         ],
//         guide: {
//           visible: false,
//         },
//         item: {
//           fontColor: '#8B8B8B',
//           // fontFamily: 'arial'
//         },
//         lineColor: '#7E7E7E',
//         tick: {
//           visible: false,
//         },
//       },
//       scaleY: {
//         values: '0:100:10',
//         guide: {
//           lineStyle: 'solid',
//         },
//         item: {
//           fontColor: '#8B8B8B',
//           fontFamily: 'arial',
//         },
//         lineColor: '#7E7E7E',
//         short: true,
//         tick: {
//           visible: false,
//         },
//       },
//       legend: {
//         layout: '3x2',
//         align: 'center',
//         verticalAlign: 'bottom',
//         margin: '5 20 0 0',
//         padding: '5px',
//         borderRadius: '5px',
//         header: {
//           text: 'Legend',
//           color: '#5D7D9A',
//           padding: '10px',
//         },
//         item: {
//           color: '#5D7D9A',
//         },
//       },
//       tooltip: {
//         visible: false,
//       },
//       series: [
//         {
//           text: 'Waiting time',
//           values: [85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85, 85],
//           backgroundColor: '#e03c31',
//         },
//         {
//           text: 'Value-added time',
//           values: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
//           backgroundColor: '#00bfb2',
//         },
//       ],
//     };
//   }
// }

// export default withFilterColors(FlowEfficiencySummary);
