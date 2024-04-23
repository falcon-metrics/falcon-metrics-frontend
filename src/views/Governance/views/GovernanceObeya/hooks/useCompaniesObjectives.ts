/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @deprecated
 * 
 * Not in use
 */

import fetch from 'core/api/fetch';
import { useObeya } from 'views/Governance/views/GovernanceObeya/hooks/useObeya';

const postRequest = (url: string, data) => fetch.post(`${url}`, data);
const patchRequest = (url: string, data) => fetch.patch(`${url}`, data);

const resource = '/obeya/objectives';

const useCompaniesObjectives = (obeyaRoomId): any => {
  const {
    data,
    data: {
      objectives,
    },
    isLoadingObeyaData,
    isValidating,
    error,
    mutateObeyaData,
  } = useObeya(obeyaRoomId, false, resource);

  const postCompaniesObjectives = async (formData) => {
    const indexOkr = objectives.findIndex(
      (okr) => okr.objectiveId === formData.objectiveId,
    );

    let newItems: any = {};

    if (indexOkr === -1) {
      const newOkrs = objectives.filter(
        (objective) => objective.objectiveId !== formData?.objectiveId,
      );
      newItems = { ...data, objectives: [...newOkrs, formData], };
    } else {
      const newOkrs = objectives || [];
      newOkrs[indexOkr] = {
        ...formData,
        createdAt: newOkrs[indexOkr]?.createdAt,
      };
      newItems = { ...data, objectives: [...newOkrs] };
    }

    mutateObeyaData({ data: { objectives: newItems.objectives } }, false);

    if (formData.objectiveId && formData.objectiveId !== '') {
      await patchRequest(resource, formData);
    } else {
      await postRequest(resource, formData);
    }
    mutateObeyaData({ data: { objectives: newItems.objectives } }, true);
  };

  const deleteAndMutateObjectives = async (okr) => {
    const newOkrs = objectives.filter(
      (objective) => objective.objectiveId !== okr.objectiveId,
    );
    const newData = { data: { ...data, OKRs: newOkrs } };
    mutateObeyaData(newData, false);

    try {
      await postRequest('/obeya/objectives-delete', okr);
      mutateObeyaData(newData, true);
    } catch (e) {
      return e;
    }
  };

  return {
    isValidating,
    deleteAndMutateObjectives,
    postCompaniesObjectives,
    data: objectives || [],
    mutateObeyaData,
    loading: isLoadingObeyaData && isValidating,
    error,
  };
};
