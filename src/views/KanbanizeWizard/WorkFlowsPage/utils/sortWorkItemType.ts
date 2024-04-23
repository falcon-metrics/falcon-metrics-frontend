import { TransformedDatabaseWorkItemType } from "../interfaces/interfaces";

export const sortOptions = [
  {
    order: 0,
    value: "workspaces",
    name: "Workspaces",
  },
  {
    order: 1,
    value: "boards",
    name: "Boards",
  },
  {
    order: 2,
    value: "workflows",
    name: "Workflows",
  },
];

export function sortWorkItemType(
  option: string,
  workItemTypes: TransformedDatabaseWorkItemType[]
) {

  let result;
  switch (option) {
    case "workspaces":
      result = workItemTypes.sort((a: any, b: any) => {
        return a.workspace === undefined
          ? 1
          : b.workspace === undefined
            ? -1
            : a.workspace !== b.workspace
              ? a.workspace.localeCompare(b.workspace)
              : -a.name.localeCompare(b.name);
      });
      break;

    case "boards":
      result = workItemTypes.sort((a, b) =>
        a.projects[0].name.localeCompare(b.projects[0].name)
      );
      break;

    case "workflows":
      result = workItemTypes.sort((a: any, b: any) => {
        return a.name === undefined
          ? 1
          : b.name === undefined
            ? -1
            : a.name !== b.name
              ? a.name.localeCompare(b.name)
              : -a.name.localeCompare(b.name);
      });
      break;


    default:
      break;
  }

  return result;
}
