export interface FieldCountGroup {
  columnName: string;
  data: FieldCount[];
};

export interface FieldCount {
  type: string;
  count: number;
};

export interface FieldData {
  workItemKey: string;
  displayName: string
};
