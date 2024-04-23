import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { DropdownMenuItemType } from "@fluentui/react";
import { Checkbox, Typography } from "@material-ui/core";

export interface IdropdownItems {
  key: string;
  text: string;
  itemType?: DropdownMenuItemType;
}

interface Props {
  label: string;
  options: any[];
  onSelectionChange(selectedKeys: Array<string>): void;
  multiSelect?: boolean;
  selectedKeys?: Array<string> | string;
  defaultSelectedKeys?: Array<string>;
  placeholder?: string;
  style?: any;
  disabled?: boolean;
  className?: string;
  onRenderOption?: any;
  minWidth?: any;
  "data-cy"?: string;
}

export const BaseDropdown: React.FC<Props> = ({
  label,
  options,
  onSelectionChange,
  multiSelect = false,
  selectedKeys = [],
  placeholder,
  style,
  disabled,
  minWidth = 225,
  ...rest
}: Props) => {
  let typeSafeSelectedKeys: Array<string> = [];

  if (!Array.isArray(selectedKeys)) {
    const selectedKey = selectedKeys;
    selectedKeys = [];
    if (selectedKey !== undefined) {
      selectedKeys.push(selectedKey);
    }
  } else {
    typeSafeSelectedKeys = selectedKeys;
  }

  const onChangeMultiSelect = (
    _: React.ChangeEvent<{}>,
    selectedItems: any[]
  ) => {
    if (selectedItems) {
      const keys = selectedItems.map((item) => item.key);
      onSelectionChange(keys);
    }
  };

  const onChangeSingleSelect = (
    _: React.ChangeEvent<{}>,
    selectedItem: any
  ) => {
    if (selectedItem) {
      onSelectionChange([selectedItem.key]);
    }
  };

  const renderOption = (option, { selected }) => {
    if (option.itemType === 2) {
      // Exclude groups from the options list
      return (
        <Typography
          color="primary"
          style={{ fontFamily: "Open Sans", fontSize: 14, fontWeight: 600 }}
        >
          {option.text}
        </Typography>
      );
    }

    // Render checkbox for other itemTypes
    return (
      <React.Fragment key={option.key}>
        {multiSelect && (
          <Checkbox
            size="small"
            style={{ marginRight: 8 }}
            checked={selected}
            color="primary"
          />
        )}
        {option.text}
      </React.Fragment>
    );
  };
  return (
    <Autocomplete
      disabled={disabled}
      multiple={multiSelect}
      options={options}
      // groupBy={(option) => option?.itemType === 2 && option?.text}
      getOptionDisabled={(option) => option?.itemType === 2}
      getOptionLabel={(option) => option?.text || ""}
      onChange={multiSelect ? onChangeMultiSelect : onChangeSingleSelect}
      size="small"
      style={{
        zIndex: 1000,
        minWidth: minWidth,
        marginRight: 5,
        marginTop: 5,
        color: "#2B353B",
        backgroundColor: "#fff",
        ...style,
      }}
      placeholder={placeholder ?? "All"}
      value={
        multiSelect
          ? options.filter((option) =>
              typeSafeSelectedKeys.includes(option.key)
            )
          : options.find((option) => option.key === typeSafeSelectedKeys[0])
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          placeholder={placeholder ?? label}
        />
      )}
      renderOption={renderOption}
      {...rest}
    />
  );
};
