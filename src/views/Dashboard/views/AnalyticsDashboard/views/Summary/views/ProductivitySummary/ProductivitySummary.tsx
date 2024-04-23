import { ProductivityData } from 'core/api/ApiClient/SummaryClient';
import BarChart from 'views/Dashboard/components/Charts/components/BarChart/BarChart';
import { ChartProps } from '../../interfaces/ChartProps';

const defaultColorMap = {
  'Defect & Incident': '#ff585d',
  'Defects & Incidents': '#ff585d',
  Features: '#008674',
  Feature: '#008674',
  'Enhancement & Optimization': '#64ccc9',
  'Enhancements & Optimisations': '#64ccc9',
  'Enablers & Tech Debt': '#003594',
  'Risk & Compliance': '#f2c75c',
  'Risks & Compliances': '#f2c75c',
  'Risks & Compliance': '#f2c75c',
  'Risk and Compliance': '#f2c75c',
  'Management Activity': '#99c9e9',
  'Management Activities': '#99c9e9',
};

const zingchartOptions = {
  stackType: 'normal',
  plot: {
    // animation: {
    //   effect: 'ANIMATION_SLIDE_BOTTOM',
    //   sequence: 0,
    //   speed: 600,
    //   delay: 300,
    //   'bars-space-left': 0.15,
    //   'bars-space-right': 0.15,
    // },
    legend: { layout: '2x3' },
  },
};

const ProductivitySummary = (props: ChartProps<ProductivityData>) => {
  return (
    <BarChart<ProductivityData>
      {...props}
      defaultColorMap={defaultColorMap}
      zingchartConfigs={zingchartOptions}
      tooltipPluralization={''}
    />
  );
};

export default ProductivitySummary;
