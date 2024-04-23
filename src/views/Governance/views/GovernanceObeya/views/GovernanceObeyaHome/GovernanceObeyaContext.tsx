// src/GovernanceObeyaContext.js
import { ObeyaRoom } from 'core/api/ApiClient/ObeyaGoalsClient';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useObeyaRoom } from '../../hooks/useObeyaRoom';
import { ObeyaResponse, emptyObeyaResponse, useObeya } from '../../hooks/useObeya';
import { useObeyaGoals } from '../../hooks/useObeyaGoals';
import { OKRObjective } from '../../utils';
type Props = {
  children: React.ReactNode;
};

type ContextType = {
  // obeyaRoomData: ObeyaRoom[];
  activeRoom: ObeyaRoom | undefined;
  selectedTab: number;
  setSelectedTab: (value: number) => void;
  activeObeyaRoomId: string;
  roomTitle: string;
  // isInitiativesLoading: boolean;
  // isInitiativesValidating: boolean;
  obeyaData: ObeyaResponse;
  objectives: OKRObjective[];
  isLoadingObeyaData: boolean;
  isValidating: boolean;
  // isLoadingObeyaRooms: boolean;
};

const defaultContextValue: ContextType = {
  // obeyaRoomData: [],
  activeRoom: undefined,
  activeObeyaRoomId: "",
  selectedTab: 0,
  setSelectedTab: (value: number) => { return value; },
  roomTitle: "",
  objectives: [],
  obeyaData: emptyObeyaResponse,
  isLoadingObeyaData: false,
  isValidating: false,
};

const GovernanceObeyaContext = createContext(defaultContextValue);

export const useGovernanceObeyaContext = () => {
  return useContext(GovernanceObeyaContext);
};

export const ObeyaRoomProvider = ({ children }: Props) => {
  const {
    data,
    activeRoom,
    isLoadingObeyaData,
    activeObeyaRoomId,
    isValidating
  } = useObeyaRoom();

  const { data: obeyaData } = useObeya(activeObeyaRoomId);

  const {
    data: objectives,
  } = useObeyaGoals(activeObeyaRoomId);


  const [selectedTab, setSelectedTab] = useState(0);

  const roomTitle = activeRoom.roomName;

  const contextValues: ContextType = useMemo(() => {
    console.log("In use memo of context");
    return {
      data,
      activeObeyaRoomId: activeObeyaRoomId || '',
      selectedTab,
      setSelectedTab,
      roomTitle,
      activeRoom,
      obeyaData,
      objectives,
      isLoadingObeyaData,
      isValidating,
    };
  }, [
    data,
    activeObeyaRoomId,
    selectedTab,
    setSelectedTab,
    roomTitle,
    activeRoom,
    obeyaData,
    objectives,
    isLoadingObeyaData,
    isValidating,
  ]);

  return (
    <GovernanceObeyaContext.Provider value={contextValues}>
      {children}
    </GovernanceObeyaContext.Provider>
  );
};
