import { useState, useEffect } from 'react';
import ZingChart from 'zingchart-react';

import ZeroState from 'components/ZeroState';
import SpinnerFullSize from 'components/SpinnerFullSize';

import { ObeyaBurnupSeries } from 'views/Governance/views/GovernanceObeya/hooks/useObeya';
import { setupBurnupConfig } from './utils/setupBurnupConfig';
import isEmptyBurnupChart from './utils/isEmptyBurnupChart';

interface BurnupProps {
  data: ObeyaBurnupSeries;
  loading: boolean;
  activeFilters?: boolean;
  customLabelX?: string;
  customLabelY?: string;
}

const Burnup = ({
  data,
  loading,
  activeFilters,
  customLabelX,
  customLabelY,
}: BurnupProps) => {
  const defaultConfigs = setupBurnupConfig(
    data,
    customLabelX,
    customLabelY,
  );

  const [config, setConfig] = useState(defaultConfigs);

  useEffect(() => {
    const newConfig = setupBurnupConfig(
      data,
      customLabelX,
      customLabelY,
    );
    setConfig(newConfig);
  }, [data]);

  return(
    <div>
      { loading ? (
        <>
          <SpinnerFullSize />
        </>
      ) : (
          activeFilters && isEmptyBurnupChart(data) ? (
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
}

export default Burnup;