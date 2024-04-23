/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @deprecated
 * 
 * Not in use. `scope` is part of useObeya hook
 */

import fetch from "core/api/fetch";
import { StringUnitLength } from "luxon";
import useSWR from "swr";
import { ObeyaWorkflowItem } from "../views/GovernanceObeyaHome/views/Workflow/interfaces/ObeyaWorkflowItem";

type WorkflowItem = {
  boardName: string;
  contextId: string;
  proposed: ObeyaWorkflowItem[];
  completed: ObeyaWorkflowItem[];
  inProgress: ObeyaWorkflowItem[];
};

const MUTATE_OBEYA_KEY = "obeya/scope";
const defaultResources = {
  getAll: MUTATE_OBEYA_KEY,
};
function useObeyaWorkflow() {
  const { data: response, error, isValidating, mutate } = useSWR(
    () => `${MUTATE_OBEYA_KEY}`,
    (url: StringUnitLength) => fetch.get(url),
    { revalidateOnFocus: false }
  );

  const scopeData = response?.data || [];

  return {
    scopeData,
    mutate,
    isValidating,
    loading: !response?.data,
    error,
  };
}