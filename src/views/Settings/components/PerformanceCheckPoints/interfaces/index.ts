export interface CheckpointItem {
  id?: number;
  name?: string;
  start_date?: Date | string;
  end_date?: Date | string;
  rowIndex?: number;
}

export interface CheckpointItemForm {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
}

export type CheckpointItemFormRow = CheckpointItem & {
  shouldUpdate?: boolean;
  shouldCreate?: boolean;
};
