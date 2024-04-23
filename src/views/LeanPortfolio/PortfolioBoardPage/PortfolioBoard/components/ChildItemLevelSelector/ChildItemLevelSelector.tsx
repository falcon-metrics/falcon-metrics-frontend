import CheckBoxCompleted from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/ManageObjectives/components/CheckBoxCompleted";
import Box from "@material-ui/core/Box";
import { useStyles } from "./styles";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { ChildItemsLevels } from "views/Governance/views/GovernanceObeya/interfaces";
import { useEffect, useState } from "react";

type Props = {
  register: any;
  control: any;
  defaultIncludeChildren?: boolean;
  defaultHierarchyLevel?: any;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const ChildItemLevelSelector = ({
  register,
  control,
  defaultIncludeChildren,
  defaultHierarchyLevel
}: Props) => {
  const classes = useStyles();

  const childItemsLevelKeys = Object.keys(ChildItemsLevels);

  const [selectedLevel, setSelectedLevel] = useState(
    defaultHierarchyLevel
  );
  const [isIncludeChildren, setIsIncludeChildren] = useState(
    defaultIncludeChildren || false
  );

  useEffect(() => {
    if (defaultIncludeChildren)
      setIsIncludeChildren(true);
    else
      setIsIncludeChildren(false);
  }, [defaultIncludeChildren]);

  useEffect(() => {
    if (defaultIncludeChildren && defaultHierarchyLevel)
      setSelectedLevel(defaultHierarchyLevel);
    else
      setSelectedLevel(0);
  }, [defaultHierarchyLevel]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedLevel(value);
  };

  return (
    <FormControl
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: 5,
        width: "100%",
        flexDirection: "row",
      }}
    >
      <label className={classes.includeChildren}>
        <CheckBoxCompleted
          {...register("includeChildren")}
          control={control}
          className={classes.checkboxIncludeChildren}
          color="default"
          defaultChecked={defaultIncludeChildren}
          afterChange={(value) => {
            setIsIncludeChildren(value);
            if (value === false) setSelectedLevel(0);
          }}
          onChange={(value) => alert(`onChange : ${value}`)}
          size="small"
        />
        <span className={classes.includeCheckboxLabel}>
          Include child items
        </span>
      </label>

      <Box display="flex" flexDirection="column" ml={"50px"}>
        <FormHelperText>Level of hierarchy</FormHelperText>
        <Select
          {...register("hierarchyLevel")}
          margin="dense"
          MenuProps={MenuProps}
          value={selectedLevel}
          style={{ width: 250 }}
          disabled={!isIncludeChildren}
          onChange={onChange}
        >
          <MenuItem dense value="" disabled>
            Level
          </MenuItem>
          {childItemsLevelKeys.map((item, index) => {
            const level = ChildItemsLevels[item];
            const value = index + 1; // Set the index + 1 as the value for each option
            return (
              <MenuItem key={index} dense value={value}>
                {level}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
    </FormControl>
  );
};
