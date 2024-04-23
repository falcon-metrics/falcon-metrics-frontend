/**
 * @deprecated
 * 
 * Not in use. See Manage Initiatives
 */

import { useState, useMemo, useCallback, useEffect } from "react";
import fetch, { useCustomSWR } from "core/api/fetch";
import { ObeyaRoom, ObeyaRooms } from "core/api/ApiClient/ObeyaGoalsClient";
import { getDefaultURLParams, sortByString } from "utils/string";
import { useStorage } from "hooks/useStorage";

const fetchAll = (url: string) => {
  return fetch.get(`${url}?${getDefaultURLParams()}`);
};

const fetchIterationById = (url: string) => {
  return fetch.get(`${url}`);
};

const findObeyaRooms = (obeyaRoomId, obeyaRooms) =>
  obeyaRooms.find(
    (obeyaRoom: { path: string; }) => obeyaRoom.path === obeyaRoomId
  );

function transformRemoteObeyaRoomToLocalType(object: any): ObeyaRoom {
  return {
    path: object.path || object.roomId,
    displayName: object.displayName || object.roomName,
    orgId: object.orgId,
    filterId: object.filterId,
    roomId: object.roomId,
    roomName: object.roomName,
    beginDate: object.beginDate,
    endDate: object.endDate,
    datasourceId: object.datasourceId,
    columnId: object.columnId,
    contextId: object.contextId,
    order: object.order,
    isFinished: object.isFinished,
    isArchived: object.isArchived,
    baselines: object.baselines,
    dependencies: object.dependencies,
    // constraintType: object.constraintType,
    // constraintDate: object.constraintDate,
  };
}
function useObeyaRooms(resource = "/obeya/rooms/all") {
  const storage = useStorage<string | undefined>("activeObeyaRoom");
  const { data: response, error, mutate } = useCustomSWR<any>(
    resource,
    fetchAll.bind(fetch, resource)
  );

  const queryParams = new URLSearchParams(window.location.search);
  const selectedObeyaRoomId =
    queryParams.get("roomId") ?? storage.get("activeObeyaRoom");

  const obeyaRooms: ObeyaRooms = useMemo(
    () =>
      response?.data?.obeyaRooms?.length
        ? sortByString(
          response.data.obeyaRooms.map(transformRemoteObeyaRoomToLocalType),
          "roomName"
        )
        : [],
    [response?.data?.obeyaRooms]
  );

  const [obeyaRoomId, setObeyaRoomId] = useState<string | null>(
    selectedObeyaRoomId
  );

  const onSelectObeyaRoom = useCallback(
    async (selectedObeyaRoomId?: string) => {
      if (selectedObeyaRoomId === undefined || selectedObeyaRoomId === null) {
        setObeyaRoomId(null);
        return;
      }
      if (
        obeyaRooms.length === 0 ||
        !findObeyaRooms(selectedObeyaRoomId, obeyaRooms)
      ) {
        console.warn(
          `Could not set obeya room id to ${selectedObeyaRoomId} because it is missing from the list of available obeya rooms (${obeyaRooms.length})`,
          response
        );
        const result = await mutate();
        if (result?.data?.obeyaRooms?.length) {
          const obeyaRoom = findObeyaRooms(
            selectedObeyaRoomId,
            result.data.obeyaRooms
          );
          if (!obeyaRoom) {
            console.log(
              "Cache update returned " +
              result.data.obeyaRooms.length +
              " values but we couldnt find the obeya id"
            );
            setObeyaRoomId(null);
            return;
          }
        } else {
          console.log("Could not load obeya rooms, got", result);
          return;
        }
      }
      setObeyaRoomId(selectedObeyaRoomId);
      storage.set(selectedObeyaRoomId);
    },
    [obeyaRooms, setObeyaRoomId, mutate]
  );

  useEffect(() => {
    if (selectedObeyaRoomId !== obeyaRoomId) {
      onSelectObeyaRoom(selectedObeyaRoomId);
    }
  }, [selectedObeyaRoomId, onSelectObeyaRoom]);

  return {
    mutate,
    onSelectObeyaRoom,
    findObeyaRooms: useCallback(findObeyaRooms, []),
    obeyaRooms,
    isLoadingObeyaRooms: !response?.data?.obeyaRooms,
    error,
    obeyaRoomId,
  };
}
