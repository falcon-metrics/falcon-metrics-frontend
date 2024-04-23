import Box from '@material-ui/core/Box';
import SpinnerFullSize from 'components/SpinnerFullSize/SpinnerFullSize';
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from 'office-ui-fabric-react/lib/ChoiceGroup';
import { useCallback } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel } from '@material-ui/core';

type Props = {
  workflowOptions: IChoiceGroupOption[];
  startingFlowItemType: undefined | string;
  selectFlowItemType: (workflowOption: string) => any;
  onCompletedCheckboxChange: (event: any) => any;
  includeCompleted: boolean;
};

export const useStyles = makeStyles({
  checked: {
    color: '#757575',
    '&$checked': {
      color: 'rgb(0, 120, 212)',
    },
  },
  checkboxItem: {
    fontSize: 16,
    fontFamily: 'Open Sans',
    fontWeight: 400,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export const FlowItemTypeSelector = ({
  workflowOptions,
  startingFlowItemType,
  selectFlowItemType,
  onCompletedCheckboxChange,
  includeCompleted,
}: Props) => {
  const classes = useStyles();

  const onWorkflowChange = useCallback(
    (_, option?: IChoiceGroupOption) => option && selectFlowItemType(option.key),
    [selectFlowItemType]
  );

  const emptyWorkflowOptions = !workflowOptions || workflowOptions.length === 0;
  
  return (
    <>
      <Box fontFamily="Open Sans" fontSize="14px" fontWeight="bold">
        Select flow item type
      </Box>
      <Box marginTop="15px" marginLeft="15px" overflow="auto">
        {emptyWorkflowOptions ? (
          <SpinnerFullSize style={{ width: '100%', height: '243px' }} />
        ) : (
          <ChoiceGroup
            label="Flow item type"
            defaultSelectedKey={
              startingFlowItemType ? startingFlowItemType : (
                workflowOptions.length > 0 ? workflowOptions[0].key : undefined
              )
            }
            options={workflowOptions}
            onChange={onWorkflowChange}
          ></ChoiceGroup>
        )}
      </Box>
      <Box borderTop="1px solid #bbb" marginTop="8px" marginRight="10px" marginLeft="15px" marginBottom="-2px"></Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={includeCompleted}
            color="secondary"
            onChange={onCompletedCheckboxChange}
            className={classes.checked}
          />
        }
        label="Include Completed Workflow Steps"
        className={classes.checkboxItem}
      />
    </>
  );
};
