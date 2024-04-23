import fetch from 'core/api/fetch';
import postAndMutate from 'core/api/postAndMutate';
import withWizardFetcher, {
  getWizardApiUrl,
  WizardEndpoints,
} from 'views/SetupWizard/components/withWizardFetcher';
import Providers from 'views/SetupWizard/interfaces/Providers';

import {
  DatabaseWorkItemType,
  ImportedWorkItemType,
  SubmitResponseData,
} from './interfaces/interfaces';
import WorkflowsPage from './CardTypePage';
import { sortBy } from 'lodash';

export interface CardTypesEntityOrStepsEntity {
  id: string;
  name: string;
}

export interface ImportResponseItem {
  id: string;
  name: string;
  workspaceId: number;
  workspace: string;
  cardTypes: (CardTypesEntityOrStepsEntity)[];
  projects: (string)[];
  projectNames: (string)[];
  steps: (CardTypesEntityOrStepsEntity)[];
}

export interface BoardsList {
  boards: {
    [key: string]: {
      boardName: string;
      boardId: string;
      workspaceId: string;
      workspaceName: string;
      cardTypes: {
        [key: string]: {
          cardTypeId: string;
          cardTypeName: string;
          checked: boolean;
          // TODO: Refactor. Should be a number. Easier to deal with strings every for now. 
          sle: string;
          level: string;
        };
      };
    };
  };
}

const fetcher = (
  key: string,
): Promise<{ databaseData: DatabaseWorkItemType[], datasourceData: ImportedWorkItemType[]; }> => {
  // Fetch the saved config from the database
  const databaseFetcher = fetch.get<Required<DatabaseWorkItemType>[]>(key);
  // Fetch config for all projects from /statuses Jira API
  const datasourceFetcher = fetch.get<ImportedWorkItemType[]>(`${key}/import`);
  return Promise.all([datasourceFetcher, databaseFetcher]).then(
    ([datasourceValues, databaseValues]) => {
      return { databaseData: databaseValues.data, datasourceData: datasourceValues.data };
    },
  );
};

const WorkItemTypesPageWithData = withWizardFetcher(
  WorkflowsPage,
  fetcher,
  WizardEndpoints.workitemtypes,
  {
    databaseData: [],
    datasourceData: [],
  },
  false,
  (provider: Providers, namespace: string, data: any) => {
    return postAndMutate<SubmitResponseData>(
      getWizardApiUrl(provider, namespace, `${WizardEndpoints.workitemtypes}`),
      data,
    );
  },
);

export default WorkItemTypesPageWithData;

// Use this for debugging form validation
// const useYupValidationResolver = (validationSchema: any) =>
//   useCallback(
//     async (data: any) => {
//       console.log("🚀 ~ file: CardTypePage.tsx:174 ~ data:", data);
//       try {
//         const values = await validationSchema.validate(data, {
//           abortEarly: false,

//         });
//         console.log("🚀 ~ file: CardTypePage.tsx:180 ~ values:", values);

//         return {
//           values,
//           errors: {},
//         };
//       } catch (errors: any) {
//         console.log("🚀 ~ file: CardTypePage.tsx:185 ~ errors:", errors.errors);
//         return {
//           values: {},
//           errors: errors.inner.reduce(
//             (allErrors: any, currentError: any) => ({
//               ...allErrors,
//               [currentError.path]: {
//                 type: currentError.type ?? "validation",
//                 message: currentError.message,
//               },
//             }),
//             {}
//           ),
//         };
//       }
//     },
//     [validationSchema]
//   );

export const transformImportResponse = (response: ImportResponseItem[], savedData: DatabaseWorkItemType[]): BoardsList => {
  const boards: BoardsList['boards'] = {};
  
  if (!Array.isArray(response)) {
    return { boards };
  }

  try {
    for (const board of response) {
      const boardId = board.id.toString();
      boards[`boardId-${boardId}`] = {
        boardId,
        boardName: board.name.toString(),
        workspaceId: board.workspaceId.toString(),
        workspaceName: board.workspace,
        cardTypes: board.cardTypes
          ? board.cardTypes
            .map(ct => {
              // TODO: Add logic to get the saved data here

              let checked = false; let sle = ''; let level = '';
              const cardTypeId = ct.id.toString();
              const savedWitm = savedData.find(sd => sd.datasourceWorkItemId === cardTypeId && sd.projectId === boardId);
              if (savedWitm) {
                checked = true;
                sle = savedWitm.serviceLevelExpectationInDays.toString();
                // eslint-disable-next-line
                level = savedWitm.level!;
                // console.log("🚀 ~ file: CardTypePage.tsx:79 ~ transformImportResponse ~ savedWitm:", savedWitm);
              }
              return {
                cardTypeId,
                cardTypeName: ct.name.toString(),
                checked,
                sle,
                level
              };
            })
            .reduce((accum, current) => {
              accum[`cardTypeId-${current.cardTypeId}`] = current;
              return accum;
            }, {} as Record<any, any>)
          : {}
      };
    }
  } catch (e: any) {
    console.error(e.message);
    return { boards: {} }; // Return an empty object or handle it as needed.
  }

  // Default sorting by 'workspacename'
  const sortedBoards = sortBy(boards, "workspaceName");

  return {
    boards: sortedBoards.reduce((accum, current) => {
      accum[`boardId-${current.boardId}`] = current;
      return accum;
    }, {} as Record<any, any>)
  };
};
