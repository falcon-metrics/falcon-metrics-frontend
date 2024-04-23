import { TransformedDatabaseWorkItemType } from 'views/SetupWizard/views/WorkItemTypes/interfaces/interfaces';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

type Props = {
  workItemType: TransformedDatabaseWorkItemType;
  disabled: boolean;
  onDisplayNameChange: (value: string) => void;
  workItemTypeOptions: string[];
};

export function DisplayNameSelector({
  workItemType,
  disabled,
  workItemTypeOptions: uniqueWorkItemTypeOptions,
  onDisplayNameChange,
}: Props) {
  return (
    <Select
      fullWidth
      name="display"
      margin="dense"
      disabled={disabled}
      value={workItemType.displayName || workItemType.name}
      onChange={(event) => {
        const { value } = event.target;
        if (typeof value === 'string') {
          onDisplayNameChange(value);
        }
      }}
    >
      {uniqueWorkItemTypeOptions &&
        uniqueWorkItemTypeOptions.map((option, index) => (
          <MenuItem dense key={index} value={option}>
            {option}
          </MenuItem>
        ))}
    </Select>
  );
}
