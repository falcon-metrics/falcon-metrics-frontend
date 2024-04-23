export type BoardItem = {
    boardName: string;
    proposed: number;
    completed: number;
    inProgress: number;
    contextId: string;
};

export type RiskItem = {
  riskId: string;
  name: string;
  description: string;
  owner?: string;
  ownerName?: string;
  likelihood?: number;
  impactOnCost?: number;
  impactOnSchedule?: number;
  riskExposureDays: number;
  riskExposureAmount: number;
  status: string;
  createdAt?: string,
  modifiedAt?: string,
  deletedAt?: string,
  roomId?: string;
  orgId?: string;
  createdBy?: string;
};

