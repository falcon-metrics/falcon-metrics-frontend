export type FocusData = {
  boardName: string;
  contextId: string;
  totalWipItems: number;
  obeyaWipItems: number;
  totalProposedItems: number;
  obeyaProposedItems: number;
  focusMarker: number;
}

export type FormValues = {
  search: string;
  includeProposed: boolean;
};

export const defaultValues: FormValues = {
  search: '',
  includeProposed: false
};
