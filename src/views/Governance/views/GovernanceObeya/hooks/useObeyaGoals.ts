import fetch from 'core/api/fetch';
import { useObeya } from 'views/Governance/views/GovernanceObeya/hooks/useObeya';
import { OKRObjective } from "views/Governance/views/GovernanceObeya/utils";

const postRequest = (url: string, data) => fetch.post(`${url}`, data);
const patchRequest = (url: string, data) => fetch.patch(`${url}`, data);

const resource = '/obeya/objectives';

export function useObeyaGoals(obeyaRoomId) {
  const {
    data,
    data: {
      objectives,
    },
    isValidating,
    error,
    mutateObeyaData,
  } = useObeya(obeyaRoomId, false, resource);

  const postAndMutateGoals = async (formData) => {
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
      newItems = { data: { ...data, objectives: [...newOkrs] } };
    }

    mutateObeyaData({ data: { ...data, OKRs: newItems.objectives, } }, false);

    if (formData.objectiveId && formData.objectiveId !== '') {
      await patchRequest(resource, formData);
    } else {
      await postRequest(resource, formData);
    }
    mutateObeyaData({ data: { ...data, OKRs: newItems.objectives } }, true);
  };

  const deleteAndMutateGoals = async (okr) => {
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
    deleteAndMutateGoals,
    postAndMutateGoals,
    data: objectives || [] as OKRObjective,
    loading: !objectives,
    error,
  };
}

