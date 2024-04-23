
export const issueDetails = [
  {
    field: "workItemId",
    text: "Flow Item Id",
  },
  {
    field: "flomatikaWorkItemType",
    text: "Flow Item Type",
    getValue: (row) =>
      `${row.flomatikaWorkItemTypeName} (${row.flomatikaWorkItemTypeLevel} Level)`,
  },
  {
    field: "assignedTo",
    text: "Assigned To",
    getValue: (row) => `${row.assignedTo ? row.assignedTo : "Unassigned"}`,
  },
  {
    field: "state", // State ?
    text: "Workflow Step",
  },
  {
    field: "projectName",
    text: "Project",
  },
  {
    field: "isDelayed",
    text: "Delayed",
    getValue: (row) => `${row.isDelayed ? "Yes" : "No"}`,
  },
  {
    field: "isStale",
    text: "Stale",
    getValue: (row) => `${row.isStale ? "Yes" : "No"}`,
  },
];

export const customFields = (row) => {
  const customFieldsData = Object.entries(row.customFields)
    .map(([key]) => {
      return {
        field: key,
        text: key,
        getValue: (row) => row.customFields[key],
      };
    })
    .sort((a, b) => a.field.localeCompare(b.field));

  return customFieldsData;
};
