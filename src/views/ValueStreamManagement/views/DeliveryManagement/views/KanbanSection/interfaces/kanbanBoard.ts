import { DateTime } from 'luxon';

export interface KanbanBoardItem {
  workItemId: string;
  title: string;
  workItemType: string;
  state: string;
  changedDate: Date | undefined;
  arrivalDate: Date | undefined;
  arrivalDateTime: DateTime | undefined;
  commitmentDate: Date | undefined;
  commitmentDateTime: DateTime | undefined;
  departureDate: Date | undefined;
  departureDateTime: DateTime | undefined;
  isBlocked: boolean | undefined;
  isStale: boolean | undefined;
  isDelayed: boolean | undefined;
  isAboveSle: boolean | undefined;
  isExpedited: boolean | undefined;
  isUnassigned: boolean | undefined;
  flagged?: boolean;
};

export interface KanbanBoardGroup {
  groupName: string;
  workItems: KanbanBoardItem[];
}

export type KanbanBoardData = {
  proposed: KanbanBoardGroup[];
  inProgress: KanbanBoardGroup[];
  completed: KanbanBoardGroup[];
}
