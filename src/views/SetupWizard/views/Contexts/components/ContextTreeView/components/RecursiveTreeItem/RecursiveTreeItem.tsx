import { useFieldArray, UseFieldArrayProps } from "react-hook-form";
import { v4 as uuid } from "uuid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  ContextInput,
  CurrencyTextField,
  ContextSelect,
  ContextTreeItem,
} from "./RecursiveTreeItem.styles";
import { TreeLevel, Option, RouteParams } from "../../../../Contexts.data";
import { FormValues } from "../../ContextTreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Box, Tooltip } from "@material-ui/core";
import _ from "lodash";
import { useParams } from "react-router-dom";
import Providers from "views/SetupWizard/interfaces/Providers";

const leftOffset = 30;

type RenderTreeProps = {
  field: TreeLevel<any>;
  options: Option[];
  path: string;
  onRemove: () => void;
  depth?: number;
};

const RecursiveTreeItem = ({
  field,
  options,
  path,
  onRemove,
  depth = 0,
}: RenderTreeProps) => {
  const { fields, append, remove } = useFieldArray<FormValues>({
    name: `${path}.children` as UseFieldArrayProps<FormValues>["name"],
  });

  const { provider } = useParams<RouteParams>();

  const isAzure = () => {
    return provider === Providers.AZURE;
  };

  const renderContextSelect = () => {
    return isAzure() ? (
      <ContextSelect
        name={`${path}.address`}
        defaultValue={field.address || ""}
        options={options}
        depth={depth}
      />
    ) : (
      <ContextInput
        select
        name={`${path}.address`}
        defaultValue={field.address || ""}
        SelectProps={{ displayEmpty: true }}
      >
        {depth < 2 && <MenuItem value="">Aggregation</MenuItem>}
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            /* Uncommenting this line will block contexts with more than 1 project
               * We are allowing again multiple projects given that we have put the 'project' filter in the blacklist 
              
                 disabled={option.projects[0] === "multiple"} 
              */
            onClick={() => console.log(option.id)}
          >
            <Tooltip title={option.name}>
              <div>
                {_.truncate(option.name, {
                  length: 75,
                  omission: "...",
                })}
              </div>
            </Tooltip>
          </MenuItem>
        ))}
      </ContextInput>
    );
  };

  return (
    <div style={{ marginLeft: `${depth * leftOffset}px` }}>
      <ContextTreeItem>
        {depth < 2 && <ExpandMoreIcon style={{ fontSize: "20px" }} />}
        <ContextInput name={`${path}.name`} defaultValue={field.name} />
        {depth === 0 ? <></> : renderContextSelect()}
        <Box display={"flex"} justifyContent="flex-end">
          {depth === 0 && <div style={{ width: 457 }}>&nbsp;</div>}
          <CurrencyTextField
            name={`${path}.cost`}
            defaultValue={field.cost}
            style={{ marginLeft: depth === 1 ? 50 : 10, width: 230 }}
          />
        </Box>
        <IconButton size="small" onClick={() => onRemove()}>
          <DeleteIcon fontSize="small" />
        </IconButton>
        {depth < 2 && (
          <IconButton
            size="small"
            onClick={() => {
              append({ contextId: uuid(), name: "" });
            }}
          >
            <AddCircleIcon fontSize="small" />
          </IconButton>
        )}
      </ContextTreeItem>
      {Array.isArray(field.children) &&
        fields.map((node, index) => (
          <RecursiveTreeItem
            key={node.positionInHierarchy}
            field={node}
            options={options}
            path={`${path}.children.${index}`}
            onRemove={() => remove(index)}
            depth={depth + 1}
          />
        ))}
    </div>
  );
};

export default RecursiveTreeItem;
