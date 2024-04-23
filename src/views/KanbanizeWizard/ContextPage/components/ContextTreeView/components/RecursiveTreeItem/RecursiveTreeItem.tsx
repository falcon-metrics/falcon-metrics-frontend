import { useFieldArray, UseFieldArrayProps } from "react-hook-form";
import { v4 as uuid } from "uuid";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  ContextInput,
  CurrencyTextField,
  ContextSelect,
  ContextTreeItem,
} from "./RecursiveTreeItem.styles";
import { TreeLevel, Option } from "../../../../Contexts.data";
import { FormValues } from "../../ContextTreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Box } from "@material-ui/core";

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

  return (
    <div style={{ marginLeft: `${depth * leftOffset}px` }}>
      <ContextTreeItem>
        {depth < 2 && <ExpandMoreIcon style={{ fontSize: "20px" }} />}
        <ContextInput name={`${path}.name`} defaultValue={field.name} />
        {depth > 0 && (
          <ContextSelect
            name={`${path}.address`}
            defaultValue={field.address || []}
            options={options}
            depth={depth}
          />
        )}
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
        fields.map((node: any, index) => (
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
