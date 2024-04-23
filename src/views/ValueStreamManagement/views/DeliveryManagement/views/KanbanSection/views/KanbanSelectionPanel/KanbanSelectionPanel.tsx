import { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Divider,
} from '@material-ui/core';

import { ItemSelectionOptions } from '../../KanbanSection';
import OperatorSelection from './components/OperatorSelection';
import CheckboxSelection from './components/CheckboxSelection';

import { useStyles } from './KanbanSelectionPanel.styles';

export interface Props {
  selectionOperator: string;
  selectionOptions: ItemSelectionOptions;
  setSelectionOperator: Dispatch<SetStateAction<string>>;
  setSelectionOptions: Dispatch<SetStateAction<ItemSelectionOptions>>;
  isValidating: boolean;
}

const KanbanSelectionPanel = ({
  selectionOperator,
  selectionOptions,
  setSelectionOperator,
  setSelectionOptions,
  isValidating,
}: Props) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.selectionContainer}>
        <OperatorSelection
          selectionOperator={selectionOperator}
          setSelectionOperator={setSelectionOperator}
          isValidating={isValidating}
        />
        <Divider orientation="vertical" flexItem />
        <CheckboxSelection
          selectionOptions={selectionOptions}
          setSelectionOptions={setSelectionOptions}
          isValidating={isValidating}
        />
      </Box>
    </Box>
  );
};

export default KanbanSelectionPanel;
