import CheckBoxCompleted from "views/Governance/views/GovernanceObeya/views/GovernanceObeyaHome/views/ManageObjectives/components/CheckBoxCompleted";
import Box from "@material-ui/core/Box";
import { useStyles } from "./styles";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useLinkTypes } from "hooks/fetch/useLinkTypes";
import Spinner from "components/UI/MUIFormInput/components/MUIFormInputSpinner/MUIFormInputSpinner";

type Props = {
  register: any;
  control: any;
  defaultLinkTypes?: any;
  defaultIncludeRelated?: boolean;
  defaultIncludeChildrenOfRelated?: boolean;
  setValue: any;
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

export const LinkTypesSelector = ({
  register,
  control,
  defaultLinkTypes,
  defaultIncludeRelated,
  defaultIncludeChildrenOfRelated,
  setValue
}: Props) => {
  const classes = useStyles();

  const { data: linkTypesData, isLoading } = useLinkTypes();

  const [selectedLinkTypes, setSelectedLinkTypes] = useState<string[]>([]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    // handleChange?.(event.target.value);
    setSelectedLinkTypes(typeof value === "string" ? value.split(",") : value);
  };

  const [isIncludeRelated, setIsIncludeRelated] = useState(
    defaultIncludeRelated
  );

  const [isIncludeChildrenOfRelated, setIsIncludeChildrenOfRelated] = useState(
    false
  );

  useEffect(() => {
    if (defaultLinkTypes !== undefined)
      setSelectedLinkTypes(defaultLinkTypes);
    else setSelectedLinkTypes([]);
  }, [defaultLinkTypes]);

  useEffect(() => {
    if (defaultIncludeChildrenOfRelated)
      setIsIncludeChildrenOfRelated(true);
    else setIsIncludeChildrenOfRelated(false);
  }, [defaultIncludeChildrenOfRelated]);

  useEffect(() => {
    if (defaultIncludeRelated)
      setIsIncludeRelated(true);
    else setIsIncludeRelated(false);
  }, [defaultIncludeRelated]);

  return (
    <FormControl
      style={{
        display: "flex",
        marginLeft: 5,
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box display="flex" flexDirection="row" mt={2} mb={2}>
        <label className={classes.includeChildren}>
          <CheckBoxCompleted
            {...register("includeRelated")}
            control={control}
            className={classes.checkboxIncludeChildren}
            color="default"
            defaultChecked={defaultIncludeRelated}
            afterChange={(value) => {
              setIsIncludeRelated(value);
              if (value === false) {
                setSelectedLinkTypes([]);
                setIsIncludeChildrenOfRelated(false);
                setValue("includeChildrenOfRelated", false);
              }
            }}
            size="small"
          />
          <span className={classes.includeCheckboxLabel}>
            Include linked items
          </span>
        </label>

        <Box display="flex" flexDirection="column" ml={5}>
          <FormHelperText>Link Types</FormHelperText>
          <Select
            {...register("linkTypes")}
            control={control}
            disabled={!isIncludeRelated}
            multiple
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
            {linkTypesData.map((item) => {
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
        </Box>
        <Box style={{ margin: "15px 20px 0 35px" }}>
          <Spinner isVisible={isLoading} />
        </Box>
      </Box>
      <label className={classes.includeChildren}>
        <CheckBoxCompleted
          {...register("includeChildrenOfRelated")}
          control={control}
          className={classes.checkboxIncludeChildren}
          color="default"
          defaultChecked={isIncludeRelated ? isIncludeChildrenOfRelated : false}
          afterChange={(value) => {
            setIsIncludeChildrenOfRelated(value);
          }}
          value={isIncludeChildrenOfRelated}
          size="small"
          disabled={!isIncludeRelated}
        />
        <span className={classes.includeCheckboxLabel}>
          Include level 1 child items of linked items
        </span>
      </label>
    </FormControl>
  );
};
