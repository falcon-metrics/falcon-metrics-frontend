import { useCallback, useEffect, useMemo, useState } from "react";

import fetch from "core/api/fetch";
import useSWR from "swr";
import useDashboardContexts from "views/Dashboard/views/AnalyticsDashboard/hooks/useDashboardContexts";
import { Box, FormHelperText, MenuItem, Select } from "@material-ui/core";
import { getNestedContexts } from "views/Dashboard/views/Platform/views/Header/views/ContextNavigation/ContextNavigation";
import { find } from "lodash";

export const labelKey = "analytics-context-labels";
export type LevelsData = {
  portfolio: string;
  initiative: string;
  team: string;
};

interface Props {
  currentContextId: string | undefined;
  selectedKeys: string[];
  setSelectedKeys: (value: string[]) => void;
  register: any;
  control: any;
  errors: any;
}

const ContextSelector = ({
  currentContextId,
  selectedKeys,
  setSelectedKeys,
  register,
  control,
  errors,
}: Props) => {
  const { data: labels } = useSWR<LevelsData>(
    labelKey,
    () => fetch.get(labelKey).then(({ data }) => data),
    {
      revalidateOnMount: true,
    }
  );

  const levels = useMemo(
    () => [
      labels?.portfolio ?? "Portfolio",
      labels?.initiative ?? "Initiative",
      labels?.team ?? "Team",
    ],
    [labels]
  );

  const { contexts } = useDashboardContexts();

  const [contextId, setContextId] = useState<string | undefined>(
    currentContextId
  );

  useEffect(() => {
    // Do not update context ID if it already has a value
    if (contextId) {
      return;
    }

    // Initial context comes from URL if it is defined
    if (
      currentContextId &&
      typeof currentContextId === "string" &&
      !contextId
    ) {
      setContextId(currentContextId);
      return;
    }

    // Initial context comes from the first option if the options have loaded
    if (contexts && contexts.length) {
      setContextId(contexts[0].id);
    }
  }, [currentContextId]);

  // Initialize all selections to first option on mount
  useEffect(() => {
    try {
      const firstOption = getOptions(0, selectedKeys)[0].id;
      const secondOption = selectedKeys[1] === "" ? "all" : selectedKeys[1];
      const thirdOption = selectedKeys[2] === "" ? "all" : selectedKeys[2];
      setSelectedKeys([firstOption, secondOption, thirdOption]);
    } catch (error) {
      // Handle the error gracefully
      console.error("Error occurred during initialization:", error);
      // Set a fallback value or perform any other error handling actions
      setSelectedKeys([]);
    }
  }, []);

  const getOptions = useCallback(
    (levelIndex: number, selectedKeys: string[]) => {
      const previousSelected = selectedKeys.filter((_, i) => i < levelIndex);
      const options = previousSelected.reduce(
        (res, selectedKey) => {
          if (selectedKey) {
            const selectedMap = find(res, { id: selectedKey });
            return selectedMap?.children ?? [];
          }
          return getNestedContexts(res, 1);
        },
        contexts ? contexts?.filter((context) => !context.obeyaId) : []
      );
      return options;
    },
    [contexts]
  );

  // Inside the useEffect hook that checks if contextId and selectedKeys match
  useEffect(() => {
    if (contextId !== selectedKeys[0]) {
      // There exists a currently selected context id, and the top level is empty
      // The top level has to always be selected, so we must find a value for it here
      // So we will find the matching context and its top level and select both
      let newSelectedKeys: string[] | null = null;
      for (const context0 of contexts ?? []) {
        if (context0.id === contextId) {
          newSelectedKeys = [context0.id, "all", "all"];
        }
        for (const context1 of context0.children ?? []) {
          if (context1.id === contextId) {
            newSelectedKeys = [context0.id, context1.id, "all"];
          }
          for (const context2 of context1.children ?? []) {
            if (context2.id === contextId) {
              newSelectedKeys = [context0.id, context1.id, context2.id];
            }
          }
        }
      }
      if (newSelectedKeys) {
        setSelectedKeys(newSelectedKeys);
      }
    }
  }, [contextId, contexts, levels]);

  const onDropdownMenuOptionChanged = useCallback(
    (key: string, levelIndex: number) => {
      const newSelectedKeys = [...selectedKeys];

      if (levelIndex === 0) {
        // When the first context menu is selected, reset the second and third ones
        newSelectedKeys[1] = "all";
        newSelectedKeys[2] = "all";
      } else if (levelIndex === 1 && key === "all") {
        // When "All" is selected in the second context menu, reset the third one
        newSelectedKeys[2] = "all";
      }

      newSelectedKeys[levelIndex] = key;
      setSelectedKeys(newSelectedKeys);
    },
    [selectedKeys, setSelectedKeys]
  );

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
    >
      {levels.map((level, levelIndex) => {
        const subContextMap = getOptions(levelIndex, selectedKeys);

        const options = Array.from(subContextMap).map(
          ({ id, displayName }) => ({
            key: id,
            text: displayName,
          })
        );

        // Add "All" option to the 2nd and 3rd level
        const extendedOptions =
          levelIndex !== 0
            ? [{ key: "all", text: "All" }, ...options]
            : options;

        return (
          <Box key={level} display="flex" flexDirection="row" marginBottom={1} marginRight={1}>
            <Box>
              <FormHelperText style={{ paddingBottom: 3 }}>
                {level}
              </FormHelperText>
              <Select
                {...register("contextId")}
                control={control}
                errors={errors}
                value={selectedKeys[levelIndex]}
                onChange={(event) =>
                  onDropdownMenuOptionChanged(
                    event.target.value as string,
                    levelIndex
                  )
                }
                variant="outlined"
                style={{ width: 260, height: 40 }}
                fullWidth
              >
                {extendedOptions.map((option) => (
                  <MenuItem key={option.key} value={option.key}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ContextSelector;
