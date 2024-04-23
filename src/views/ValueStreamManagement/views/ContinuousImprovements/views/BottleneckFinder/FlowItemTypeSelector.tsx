import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { useState } from "react";

type Props = {
  workItemTypeList: Array<{ key: string; text: string }>;
  selectedFlowItemType: string;
  setSelectedFlowItemType: (selectedType: string) => void;
};

const FlowItemTypeSelector = ({
  workItemTypeList,
  selectedFlowItemType,
  setSelectedFlowItemType,
}: Props) => {
  const [selectedItems, setSelectedItems] = useState([selectedFlowItemType]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;

    if (event.target.checked) {
      setSelectedItems([id]);
      setSelectedFlowItemType(id);
    } else {
      setSelectedItems([]);
      setSelectedFlowItemType("");
    }
  };

  return (
    <Box display="column" m={2} maxHeight={500}>
      <FormGroup>
        {workItemTypeList.map((item) => (
          <FormControlLabel
            key={item.key}
            control={
              <Checkbox
                size="small"
                checked={selectedItems.includes(item.key)}
                onChange={handleCheckboxChange}
                value={item.key}
                color="primary"
              />
            }
            label={item.text}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default FlowItemTypeSelector;
