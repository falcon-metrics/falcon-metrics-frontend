import { TransformedDatabaseWorkItemType } from "../interfaces/interfaces";

export const sortOptions = [
  {
    order: 0,
    value: "level",
    name: "Level",
  },
  {
    order: 1,
    value: "project",
    name: "Project",
  },
  {
    order: 2,
    value: "sle",
    name: "SLE (days)",
  },
  {
    order: 3,
    value: "work-item-type",
    name: "Work Item Type",
  },
];

export function sortWorkItemType(
  option: string,
  workItemTypes: TransformedDatabaseWorkItemType[]
) {
  let result;
  switch (option) {
    case "level":
      result = workItemTypes.sort((a: any, b: any) => {
        return a.level === undefined
          ? 1
          : b.level === undefined
          ? -1
          : a.level !== b.level
          ? a.level.localeCompare(b.level)
          : -a.name.localeCompare(b.name);
      });
      break;

    case "project":
      result = workItemTypes.sort((a, b) =>
        a.projects[0].name.localeCompare(b.projects[0].name)
      );
      break;

    case "sle":
      result = workItemTypes.sort((a, b) =>
        a.serviceLevelExpectationInDays === 0
          ? 1
          : b.serviceLevelExpectationInDays === 0
          ? -1
          : a.serviceLevelExpectationInDays !== b.serviceLevelExpectationInDays
          ? a.serviceLevelExpectationInDays - b.serviceLevelExpectationInDays
          : a.name.localeCompare(b.name)
      );
      break;

    case "work-item-type":
      result = workItemTypes.sort((a, b) => a.name.localeCompare(b.name));
      break;

    default:
      break;
  }

  return result;
}
