import { Box } from "@material-ui/core";
import { HorizonItem } from '../../../../hooks/useHorizons';
import { BaseDropdown } from 'components/UI/FluentUI/BaseDropdown/BaseDropdown';
import OptionWithSampleDataLabel from 'views/Dashboard/views/Platform/views/Header/views/ContextNavigation/components/ContextDropdown/components/OptionWithSampleDataLabel.tsx/OptionWithSampleDataLabel';

export const labelKey = "analytics-context-labels";
export type LevelsData = {
  portfolio: string;
  initiative: string;
  team: string;
};

interface Props {
  options: HorizonItem[],
  setHorizon: (string) => void;
  selectedHorizon?: any;
  isLoading?: boolean;
}

const HorizonSelector = ({
  setHorizon,
  selectedHorizon,
  options = [],
  isLoading = false
}: Props) => {
  const allOptions = options.map(o => {
    return {
      key: o?.id,
      text: o?.title
    };
  });

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      style={{
        display: 'flex',
        alignSelf: 'flex-end',
        position: 'relative',
        width: 260,
      }}
    >
      <Box display="flex" flexDirection="row">
        <Box style={{ width: 240, marginTop: 17 }}>
          <BaseDropdown
            disabled={isLoading}
            label="Strategy Horizon"
            placeholder={isLoading ? 'Loading...' : '-'}
            // If isLoading, set options to an empty array
            // if you dont do this, the dropdown displays a '-' instead 
            // of the Loading... as the placeholder
            options={isLoading ? [] : allOptions}
            selectedKeys={selectedHorizon ? [selectedHorizon] : ''}
            onSelectionChange={(newValue) => {
              setHorizon(newValue[0]);
            }}
            multiSelect={false}
            // style={{ width: 270, height: 32, backgroundColor: '#fff' }}
            onRenderOption={OptionWithSampleDataLabel}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HorizonSelector;
