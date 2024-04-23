import { Strategy } from "views/Strategies/hooks/useStrategies";

export type StrategicDriver = {
  description: string;
  name: string;
  uuid?: string;
  icon_name?: string;
  oneLineSummary?: string;
  colour?: string;

  strategy?: Strategy;
};

export type VisionItem = {
  id?: number | string;
  visionStatement: string;
  missionStatement: string;
  strategyStatement?: string;
  orgId: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
  strategicDrivers: StrategicDriver[];
};

export type HorizonItem = {
  id?: number | string;
  startDate: string;
  endDate: string;
  title: string;
  orgId?: Date | string;
  visionId?: Date | string;
  contextId?: Date | string;
  createdAt: Date | string;
  deletedAt: Date;
  updatedAt: Date;
};
