import fetch from "core/api/fetch";
import { useObeya } from "./useObeya";

export function useObeyaRoom() {
  const queryParams = new URLSearchParams(window.location.search);
  const obeyaRoomId = queryParams.get("roomId");
  const { data, isValidating, isLoadingObeyaData, mutateObeyaData, response, params } = useObeya(obeyaRoomId);

  const updateObeyaRoom = (data: any) => {
    return fetch.patch(`/obeya/room/edit`, data);
  };

  return {
    data,
    isValidating,
    isLoadingObeyaData,
    mutateObeyaData,
    response,
    params,
    updateObeyaRoom,
    activeObeyaRoomId: obeyaRoomId,
    activeRoom: data.obeyaRoom,
  };
}
