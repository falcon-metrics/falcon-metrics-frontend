import React, { useEffect, useState } from "react";

import CheckBoxCompleted from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/ManageObjectives/components/CheckBoxCompleted";

import Box from "@material-ui/core/Box";

import { useStyles } from "./styles";
import { RelationTypeSelector } from "./RelationTypeSelector";
import { Checkbox, ListItemText, MenuItem, Select } from "@material-ui/core";

type Props = {
  control: any;
  setValue: any;
  defaultRelatedValue?: boolean;
  defaultChildrenOfRelatedValue?: boolean;
  inputRelatedName: string;
  inputChildrenOfRelatedName: string;
  defaultLinkTypeValue: string[];
  multiselectLinkTypeName: string;
  labelClassName?: string;
  checkBoxLabelClassName?: string;
  checkBoxClassName?: string;
  wrapperRelated?: (children: React.ReactNode) => React.ReactNode;
  relatedLabel?: string;
  childrenOfRelatedLabel?: string;
  shouldReset?: boolean;
  disabled?: boolean;
  handleChange?: (value: string) => void;
  customWidth: number;
  customMargin?: number;
  hidden?: boolean;
  defaultValue?: any;
  name: string;
  values: string[];
  register?: any;
};

export const RelatedAndChildrenOfRelated = ({
  control,
  setValue,
  defaultRelatedValue = false,
  defaultChildrenOfRelatedValue = false,
  inputRelatedName,
  inputChildrenOfRelatedName,
  defaultLinkTypeValue,
  multiselectLinkTypeName,
  labelClassName,
  checkBoxLabelClassName,
  checkBoxClassName,
  wrapperRelated,
  relatedLabel = "Include linked items",
  childrenOfRelatedLabel = "Include level 1 child items of linked items",
  shouldReset = false,
  disabled = false,
  handleChange,
  customWidth,
  customMargin = 0,
  hidden = false,
  defaultValue,
  values,
  register
}: Props) => {
  const [relatedItem, setRelatedItem] = useState(defaultRelatedValue);
  const [relatedChildrenItem, setRelatedChildrenItem] = useState(
    defaultChildrenOfRelatedValue
  );

  const classes = useStyles();

  useEffect(() => {
    if (shouldReset) {
      setValue?.(inputChildrenOfRelatedName, false);
    }
  }, [shouldReset]);

  useEffect(() => {
    if (disabled) {
      setRelatedItem(false);
    }
  }, [disabled]);

  useEffect(() => {
    // If relatedItems checkbox is unchecked, uncheck the related child items too
    if (relatedItem === false) {
      setRelatedChildrenItem(false);
    }
  }, [relatedItem]);

  const [selected, setSelected] = useState(
    defaultRelatedValue ?? false
  );

  const handleCheckChange = (value: any) => {
    setRelatedItem(value);
    setSelected(value);
    setValue?.(inputRelatedName, value);
    if (!value) {
      setValue?.(inputChildrenOfRelatedName, false);
      setValue(multiselectLinkTypeName, [])
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
    getContentAnchorEl: null,
  };

  const [selectedLinkTypes, setSelectedLinkTypes] = useState<string[]>([]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedLinkTypes(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (defaultValue !== undefined && defaultRelatedValue)
      setSelectedLinkTypes(defaultValue);
    else setSelectedLinkTypes([]);
  }, [defaultValue]);

  const relatedCheckBox = (
    <>
      <Box>
        <label className={labelClassName || classes.includeChildren}>
          <CheckBoxCompleted
            className={checkBoxClassName || classes.checkboxIncludeChildren}
            color="default"
            name={inputRelatedName}
            defaultValue={defaultRelatedValue}
            value={relatedItem}
            afterChange={(value) => {
              setSelectedLinkTypes([]);
              handleCheckChange(value)}
            }
            control={control}
            disabled={disabled}
          />
          <span
            className={checkBoxLabelClassName || classes.includeCheckboxLabel}
          >
            {relatedLabel}
          </span>
        </label>
      </Box>
      <Box alignItems="center">
        <Box mb={2} ml={5}>
          {hidden ? (
            <span style={{ fontSize: "12px", color: "#C0C0C0" }}>
              Link Type
            </span>
          ) : (
            <></>
          )}
          {!hidden ? (
            <RelationTypeSelector
              disabled={!selected}
              handleChange={(e) => handleChange?.(e)}
              linkType={defaultLinkTypeValue}
              customWidth={customWidth}
              name={multiselectLinkTypeName}
              values={values}
            />
          ) : (
            <div style={{ flexDirection: "column" }}>
              {/* <Controller
                render={({ field }) => {
                  return (
                    <> */}
                      <Select
                        {...register(multiselectLinkTypeName)}
                        control={control}
                        disabled={!selected}
                        multiple
                        required={selected}
                        // {...field}
                        onChange={onChange}
                        value={selectedLinkTypes}
                        renderValue={(selected: any) => selected.join(", ")}
                        style={{ width: 250 }}
                        // input={<OutlinedInput />}
                        MenuProps={MenuProps}
                        margin="dense"
                      >
                        <MenuItem dense value="" disabled>
                          Link Type
                        </MenuItem>
                        {values.map((item) => {
                          return (
                            <MenuItem dense key={item} value={item}>
                              <Checkbox
                                checked={selectedLinkTypes.indexOf(item) > -1}
                                color="default"
                              />
                              <ListItemText primary={item} />
                            </MenuItem>
                          );
                        })}
                      </Select>
                    {/* </>
                  );
                }}
                name={multiselectLinkTypeName}
                control={control}
                defaultValue={defaultValue || []}
              /> */}
            </div>
          )}
        </Box>
      </Box>
    </>
  );

  return (
    <Box style={{ flexDirection: "column" }}>
      {wrapperRelated ? wrapperRelated(relatedCheckBox) : relatedCheckBox}
      <Box ml={customMargin} className={classes.includeRelatedChild}>
        <label className={classes.includeChildren}>
          <CheckBoxCompleted
            color="default"
            disabled={disabled || !relatedItem}
            className={
              checkBoxClassName ||
              `${classes.checkboxIncludeChildren} includeChildren`
            }
            name={inputChildrenOfRelatedName}
            defaultValue={!relatedItem ? false : defaultChildrenOfRelatedValue}
            afterChange={(value) => {
              setRelatedChildrenItem(value);
            }}
            value={relatedChildrenItem}
            control={control}
          />
          &nbsp;{childrenOfRelatedLabel}
        </label>
      </Box>
    </Box>
  );
};
