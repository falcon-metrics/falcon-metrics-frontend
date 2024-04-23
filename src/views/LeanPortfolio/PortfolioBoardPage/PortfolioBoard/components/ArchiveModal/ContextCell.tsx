import { Typography } from "@material-ui/core";
import useDashboardContexts from "views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts";
import { Context } from "views/Dashboard/views/AnalyticsDashboard/interfaces/Context";

const findDisplayName = (
  data: Context[] | Context | undefined,
  contextId: string
): string | undefined => {
  if (!data) return undefined;

  if (Array.isArray(data)) {
    for (const obj of data) {
      const result = findDisplayName(obj, contextId);
      if (result) {
        return result;
      }
    }
  } else {
    if (data.id === contextId) {
      return data.displayName;
    }

    if (data.children) {
      const result = findDisplayName(data.children, contextId);
      if (result) {
        return result;
      }
    }
  }

  return undefined;
};

const ContextCell = (row) => {
  const { contexts } = useDashboardContexts();

  const contextName = findDisplayName(contexts, row.contextId) || "";

  return <Typography>{contextName || ""}</Typography>;
};

export default ContextCell;
