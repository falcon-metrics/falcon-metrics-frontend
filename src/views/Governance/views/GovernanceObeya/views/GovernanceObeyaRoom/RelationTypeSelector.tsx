import { Checkbox, ListItemText, makeStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";

type Props = {
  disabled: boolean;
  linkType: string[];
  handleChange?: (value: string) => void;
  customWidth: number;
  name: string;
  values: string[];
};

export function RelationTypeSelector({
  disabled,
  handleChange,
  linkType,
  customWidth,
  name,
  values
}: Props) {
  const useStyles = makeStyles({
    formControl: {
      width: customWidth,
    },
  });

  const classes = useStyles();

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

  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    handleChange?.(event.target.value);
    setSelectedValue(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    if (!linkType) return;
    if (disabled || linkType.length === 0) {
      setSelectedValue([]);
      return;
    }
    setSelectedValue(linkType);
  }, [disabled, linkType]);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <span style={{ fontSize: "12px", color: "#C0C0C0" }}>Link Type</span>
        <Select
          disabled={disabled}
          multiple
          onChange={onChange}
          value={selectedValue}
          renderValue={(selected: any) => selected.join(", ")}
          name={name}
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
                  checked={selectedValue.indexOf(item) > -1}
                  color="default"
                />
                <ListItemText primary={item} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
