import { useFieldArray } from "react-hook-form";
import { v4 as uuid } from "uuid";

import IconButton from "@material-ui/core/IconButton";
import { styled } from "@material-ui/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useCallback } from "react";
import RecursiveTreeItem from "./components/RecursiveTreeItem";
import { Tree, Option } from "../../Contexts.data";
import { Box } from "@material-ui/core";

export type FormValues = {
  contexts: Tree;
};

const TreeViewContainer = styled("div")({
  minHeight: "400px",
});

type Props = {
  options: Option[];
};

const ContextTreeView = ({ options }: Props) => {
  const { fields, append, remove } = useFieldArray<FormValues>({
    name: "contexts",
  });

  const _append = useCallback(() => {
    append({ contextId: uuid(), name: "" });
  }, [append]);

  return (
    <TreeViewContainer>
      <Box
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
        display="flex"
      >
        <IconButton size="small" onClick={_append}>
          <AddCircleIcon fontSize="small" />
        </IconButton>
      </Box>
      {
        // Do not show the "All" context here in the wizard
        fields.map((field, index) => {
          if (field.positionInHierarchy === '0') return <></>;
          return <RecursiveTreeItem
          key={field.positionInHierarchy}
          field={field}
          options={options}
          path={`contexts.${index}`}
          onRemove={() => remove(index)}
          />;
        })
      }
    </TreeViewContainer>
  );
};

export default ContextTreeView;
