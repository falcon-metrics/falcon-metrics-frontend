import { ProfileOfWorkData } from '../../interfaces/profileOfWork';

export const parseProfileOfWorkData = (data: unknown): ProfileOfWorkData => {
  if (typeof data !== 'object' || data === null || data === undefined) {
    return {
      systemFields: {
        assignedTo: [],
        workItemType: [],
        stageOfWorkflow: [],
        startStatus: []
      },
      customFields: {},
      normalisationFields: {},
    };
  }

  return data as ProfileOfWorkData;
};
