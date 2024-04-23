import React, { useState, useEffect } from 'react';
import {
  SelectProps,
  Select as SelectBase,
  Checkbox,
  ListItemText,
  styled,
  Tooltip,
  MenuItem,
} from '@material-ui/core';
import { useFormContext, useController } from 'react-hook-form';
import { CustomMenuItem } from 'views/KanbanizeWizard/ContextPage/components/ContextTreeView/components/RecursiveTreeItem/RecursiveTreeItem.styles';
import _ from 'lodash';
import { useSnackbar } from 'notistack';

type Option = {
  id: string;
  name: string;
  projects: string[];
  projectNames: string[];
};

type SelectWithOptionProps = SelectProps & {
  options: Option[];
  depth: any;
};

const StyledSubheader = styled(MenuItem)({
  color: "#0078D4",
  fontFamily: "Open Sans",
  fontWeight: 600,
  fontSize: 14,
  pointerEvents: "none"
});

const ITEM_HEIGHT = 160;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5,
      width: 580,
    },
  },
};

const Select = ({ name = '', defaultValue, options, depth, ...props }: SelectWithOptionProps) => {
  const { control } = useFormContext();
  const { enqueueSnackbar } = useSnackbar();

  const {
    field: { ref, ...input },
    fieldState: { invalid },
  } = useController({ name, defaultValue: defaultValue || [], control });

  const [selectedArray, setSelectedArray] = useState<string[]>(() => {
    if (input.value === null) return [];
    if (Array.isArray(input.value)) return input.value;
    return input.value.split(',').map((item) => parseInt(item.trim(), 10));
  });

  useEffect(() => {
    setSelectedArray((prevSelectedArray: any) =>
      prevSelectedArray.length === 0 ? defaultValue || [] : prevSelectedArray
    );
  }, [defaultValue]);

  // Group the options based on project
  const groupedOptions: { [key: string]: Option[]; } = {};
  options.forEach((option) => {
    if (!groupedOptions[option.projectNames[0]]) {
      groupedOptions[option.projectNames[0]] = [];
    }
    groupedOptions[option.projectNames[0]].push(option);
  });

  // const [selectedGroupName, setSelectedGroupName] = useState<string | null>(null);

  const handleOptionSelect = (value: string) => {
    value = value.toString();

    // Check if selection belongs to the same project/group. If not, prevent further selection
    const option = options.find((opt) => opt.id.toString() === value);
    if (option) {
      const selectedGroupName = option.projectNames[0];
      const isDiffGroup = selectedArray.some((val) => {
        const selectedOption = options.find((opt) => opt.id.toString() === val);
        return selectedOption && selectedOption.projectNames[0] !== selectedGroupName;
      });

      if (isDiffGroup) {
        enqueueSnackbar(
          'You can only select a board from the same project.',
          { variant: 'error' },
        );
        return;
      }
    }

    if (!selectedArray.includes(value)) {
      // Append the new value if not already selected
      const updatedValues = [...selectedArray].filter(val => val !== "");
      updatedValues.push(value);
      setSelectedArray(updatedValues);
      // setSelectedGroupName(project);
      input.onChange(updatedValues);
    } else {
      const updatedValues = selectedArray.filter((val) => val !== value);
      if (updatedValues.length === 0) {
        updatedValues.push("");
        // setSelectedGroupName(null);
      }
      setSelectedArray(updatedValues);
      input.onChange(updatedValues);
    }
  };

  const handleSelectAggregation = () => {
    const updatedValues = selectedArray.filter(val => val === "");
    updatedValues.push("");
    setSelectedArray(updatedValues);
    input.onChange(updatedValues);
  };

  const renderValue = () => {
    if (input.value === null || (input.value.length === 1 && input.value.includes(""))) {
      return 'Aggregation';
    } else {
      return selectedArray
        .map((value) => {
          const option = options.find((option) => option.id.toString() === value.toString());
          return option ? option.name : '';
        })
        .join(', ');
    }
  };

  return (
    <SelectBase
      {...input}
      {...props}
      inputRef={ref}
      multiple
      error={invalid}
      value={selectedArray || []}
      renderValue={renderValue}
      MenuProps={MenuProps}
    >
      <React.Fragment>
        {depth < 2 && <CustomMenuItem dense value="" onClick={() => handleSelectAggregation()}>
          Aggregation
        </CustomMenuItem>}
      </React.Fragment>
      {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
        <React.Fragment key={groupName}>
          <StyledSubheader>{groupName}</StyledSubheader>
          {groupOptions.map((option) => (
            <CustomMenuItem
              key={option.id}
              value={option.id}
              onClick={() => handleOptionSelect(option.id)}
            // disabled={selectedGroupName !== null && option.projectNames[0] !== selectedGroupName}
            >
              <Checkbox checked={selectedArray.includes(option.id.toString()) || false} />
              <ListItemText primary={
                option.name.length > 65 ? (
                  <Tooltip title={option.name}>
                    <div>
                      {_.truncate(option.name, { length: 65, omission: '...' })}
                    </div>
                  </Tooltip>) : option.name
              } />
            </CustomMenuItem>
          ))}
        </React.Fragment>
      ))}
    </SelectBase>
  );
};

export default Select;