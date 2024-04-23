import { createContext, ReactNode, useState, useContext } from 'react';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import Box from '@material-ui/core/Box';
import { errorDispatch } from 'contexts/contextApi';
import PeriodSelector from './components/PeriodSelector';

export enum SummaryPeriods {
  PAST = 'past',
  PRESENT = 'present',
  FUTURE = 'future',
}

export const defaultPeriod = SummaryPeriods.PAST;
export type PeriodContextType = {
  currentPeriodType: SummaryPeriods;
  setSelectedPeriod: (selectedKey: SummaryPeriods) => void;
};

const PeriodContext = createContext<PeriodContextType>({
  currentPeriodType: defaultPeriod,
  setSelectedPeriod: errorDispatch,
});

interface Props {
  selectorIsVisible?: boolean;
  children: ReactNode;
}

function PeriodSelectorProvider({ selectorIsVisible = true, children }: Props) {
  const [selectedPeriod, _setSelectedPeriod] = useState(defaultPeriod);
  const sendTelemetry = useSendTelemetry();
  const setSelectedPeriod = (period: SummaryPeriods) => {
    const originalPeriod = selectedPeriod;
    _setSelectedPeriod(period);
    sendTelemetry('SummaryPageNavigation', `${originalPeriod} -> ${period}`);
  };

  return (
    <PeriodContext.Provider
      value={{ currentPeriodType: selectedPeriod, setSelectedPeriod }}
    >
      {selectorIsVisible && (
        <Box
          className="context-navigation-filter"
          data-tour="context-navigation-filter"
        >
          <PeriodSelector
            setSelectedPeriod={setSelectedPeriod}
            selectedPeriod={selectedPeriod}
          />
        </Box>
      )}
      {children}
    </PeriodContext.Provider>
  );
}

export const useSelectedPeriod = () => useContext(PeriodContext);

export default PeriodSelectorProvider;
