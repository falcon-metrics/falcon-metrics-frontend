import { ObeyaRooms } from "core/api/ApiClient/ObeyaGoalsClient";

export type ColumnFormFields = {
  columnName: string;
  colour: `#${string}`;
  columnId: string;
  contextId?: string;
  order?: number;
};

export interface PortfolioInfo {
  contextId: string;
  createdAt?: string | null;
  deletedAt?: string | null;
  colour?: string;
  columnName: string;
  columnId: string;
  id: number;
  updatedAt?: string;
  order?: number;
}
export interface Column {
  columnId: string;
  columnName: string;
  order: number;
  roomIds: ObeyaRooms;
  colour: `#${string}`;
}

export interface PortfolioBoardData {
  initiatives: ObeyaRooms;
  columns: { [columnId: string]: Column };
  columnOrder: string[];
}