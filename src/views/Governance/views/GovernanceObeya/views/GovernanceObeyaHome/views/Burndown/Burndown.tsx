import { useState, useEffect } from 'react';
import ZingChart from 'zingchart-react';

import ZeroState from 'components/ZeroState';
import SpinnerFullSize from 'components/SpinnerFullSize';
import isEmptyBurndownChart from './utils/isEmptyBurndownChart';

import { setupConfig } from './utils/setupConfig';
import { ObeyaBurndownSeries } from 'views/Governance/views/GovernanceObeya/hooks/useObeya';
interface Props {
  data: ObeyaBurndownSeries;
  // isDemo?: boolean;
  // modalOpen?: boolean;
  // chartTitle?: string;
  loading: boolean;
  activeFilters?: boolean;
  // missingConfigurations: NormalizationCategories[];
  // customProps?: any;
  customLabelX?: string;
  customLabelY?: string;
  lineColor?: string;
  //WidgetContent?: any;
}

const Burndown = ({
  data,
  loading,
  activeFilters,
  customLabelX,
  customLabelY,
  lineColor,
}: Props) => {
  // Chart Configurations
  const defaultConfig = setupConfig(
    data,
    customLabelX,
    customLabelY,
    lineColor,
  );
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    const newConfig = setupConfig(data, customLabelX, customLabelY, lineColor);
    setConfig(newConfig);
  }, [data, customLabelX, customLabelY, lineColor]);

  return (
    <div>
      { loading ? (
        <>
          <SpinnerFullSize />
        </>
      ) : (
          activeFilters && isEmptyBurndownChart(data) ? (
            <ZeroState
              message="No data available for the selected criteria"
              minHeight={480}
            />
          ) : (
          <>
            <ZingChart data={config} activeFilters={activeFilters}/>
          </>
          )
      )
      }
    </div>
  );
};

export default Burndown;
