import { useState } from 'react';

import { useLocation } from 'react-router-dom';
import CheckBoxCompleted
  from 'views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/ManageObjectives/components/CheckBoxCompleted';

import Box from '@material-ui/core/Box';

import { useStyles } from './styles';
import { ChildItemsSelector } from './ChildItemsSelector';
import { ChildItemsLevels } from '../../interfaces';

type Props = {
 control: any;
 handleChange: (value: number) => void;
 defaultValue?: any;
};

const childKey = 'includeChildren';
 
export const ChildItemsAndChildrenOfChild = ({
  control,
  handleChange,
  defaultValue
}: Props) => {
  const location = useLocation() as { pathname: string; state: any };
  const classes = useStyles();
  
  const childItemsLevelKeys = Object.keys(ChildItemsLevels);
  const [selected, setSelected] = useState(location.state?.obeyaRoom?.includeChildren ?? false)

  // const [defaultValue, setDefaultValue] = useState(location.state?.obeyaRoom?.hierarchyLevel ?? 1);

  const handleCheckChange = (value : any) => {
    setSelected(value)
  //   if (value === false) setDefaultValue(1)
  }

  return(
    <>
      <Box display="flex" alignItems="center" ml={1}>
        <label className={classes.includeChildren}>
          <CheckBoxCompleted
            color="default"
            className={classes.checkboxIncludeChildren}
            name={childKey}
            defaultValue={defaultValue?.includeChildren }
            afterChange={(value) => handleCheckChange(value)}
            control={control}
          />
          <span className={classes.includeCheckboxLabel}>
            Include child items
          </span>
        </label>
        <span className={classes.selector}>
          <ChildItemsSelector
            disabled={!selected}
            handleChange={handleChange}
            childItemsLevelKeys={childItemsLevelKeys}
            hierarchyLevel={defaultValue?.hierarchyLevel} 
          />
        </span>
      </Box>
    </>
  );
};