import { ChangeEvent } from 'react';

import { TransformedDatabaseWorkItemType } from 'views/SetupWizard/views/WorkItemTypes/interfaces/interfaces';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import WorkItemTypeLevels from '../../../../interfaces/WorkItemTypeLevels';

type Props = {
  errors: string[];
  workItemType: TransformedDatabaseWorkItemType;
  disabled: boolean;
  handleWITChange: (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => void;
  workItemTypeLevelKeys: string[];
};

export function LevelSelector({
  errors,
  workItemType: row,
  disabled,
  handleWITChange,
  workItemTypeLevelKeys,
}: Props) {
  return (
    <Select
      fullWidth
      displayEmpty
      name="level"
      error={errors.includes('level')}
      margin="dense"
      disabled={disabled}
      value={row.level ?? ''}
      onChange={handleWITChange}
    >
      <MenuItem dense value="" disabled>
        Level
      </MenuItem>
      {workItemTypeLevelKeys.map((k) => {
        const level = WorkItemTypeLevels[k];
        return (
          <MenuItem key={k} dense value={level}>
            {level}
          </MenuItem>
        );
      })}
    </Select>
  );
}
