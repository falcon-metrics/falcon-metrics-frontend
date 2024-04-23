import Burndown from '../Burndown/';
interface Props {
  data?: any;
  // activeFilters?: boolean;
  lineColor?: string;
}

const defaultLineColor = '#fc4713';

const RiskBurndown = ({
  data,
  // activeFilters
  lineColor,
}: Props) => {
  return (
    <Burndown
      // title="Risk Burndown"
      data={data}
      loading={true}
      // WidgetContent={RiskBurndown}
      // activeFilters={activeFilters}
      // missingConfigurations={[]}
      lineColor={lineColor || defaultLineColor}
      customLabelX="Days"
      customLabelY="Risk"
    />
  );
};

export default RiskBurndown;
