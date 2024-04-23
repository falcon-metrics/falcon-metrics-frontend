import { Box } from '@material-ui/core';
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from '@fluentui/react/lib/ChoiceGroup';

import { DateAnalysisOptions } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';
import { useStyles } from './DateAnalysisPanel.styles';

export interface DateAnalysisProps {
  dateAnalysisOption: DateAnalysisOptions | undefined;
  setDateAnalysisOption: (option: 
    DateAnalysisOptions | undefined
  ) => void;
}

const DateAnalysisPanel = ({
  dateAnalysisOption,
  setDateAnalysisOption,
}: DateAnalysisProps) => {
  const classes = useStyles();

  const defaultKey = !dateAnalysisOption ? DateAnalysisOptions.all : DateAnalysisOptions[dateAnalysisOption];

  const options: IChoiceGroupOption[] = [
    { key: 'all', text: 'All currently in state' },
    { key: 'became', text: 'Became in state during date period' },
    { key: 'was', text: 'Was in state during date period' },
  ];

  const handleDateAnalysisChange = (
    _ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption,
  ) => {
    if (option) {
      const newSetting: DateAnalysisOptions = DateAnalysisOptions[option.key];
      setDateAnalysisOption(newSetting);
    } else {
      setDateAnalysisOption(DateAnalysisOptions.all);
    }
  }

  return (
    <Box className={classes.container}>
      <ChoiceGroup
        label="Date Analysis"
        selectedKey={defaultKey}
        options={options}
        onChange={handleDateAnalysisChange}
      />
    </Box>
);
}

export default DateAnalysisPanel;
