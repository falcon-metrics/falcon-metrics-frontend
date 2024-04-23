import useSWR from 'swr';
import fetch from 'core/api/fetch';

export type BoardItem = {
  boardName: string;
  proposed: number;
  completed: number;
  inProgress: number;
};

export type IndividualContributor = {
  assignedTo: string;
  proposed: number;
  completed: number;
  inProgress: number;
};

const fetchProgress = (url: string) => {
  return fetch.get(`${url}`);
};

export function useProgress(resource = 'obeya/progress-boards', obeyaRoomId) {
  const { data: response, error } = useSWR(
    () => (obeyaRoomId ? `${resource}?obeyaRoomId=${obeyaRoomId}` : null),
    fetchProgress,
    { revalidateOnFocus: false },
  );

  return {
    data: response?.data,
    loading: !response?.data,
    error,
  };
}
