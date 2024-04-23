import { OKRObjective } from "views/Governance/views/GovernanceObeya/utils";

export type OKRsResponse = {
  OKRs?: Array<OKRObjective>;
};

export type ObeyaRoomsResponse = {
  obeyaRooms?: Array<ObeyaRoom>;
};

export type ObeyaRoom = {
  path: string;
  displayName: string;
  orgId?: string;
  filterId?: string;
  roomId: string;
  roomName: string;
  beginDate?: string;
  endDate?: string;
  datasourceId?: string;
  columnId?: string;
  contextId?: string;
  order?: number;
  isFinished?: boolean;
  isArchived?: boolean;
  workItems?: any[];
  initiativeId?: string;
  initiativeTitle?: string;
  relationshipCount?: string | number;
  baselines?: any;
  ratingId?: string;
  dependencies?: any;
  // constraintType?: string;
  // constraintDate?: string;
};

export type ObeyaRooms = Array<ObeyaRoom>;
