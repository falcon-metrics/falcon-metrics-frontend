import { FlowItemsEntry } from '../../interfaces/flowItems';

export const isFlowItemsDataEmpty = (data: FlowItemsEntry[]): boolean =>
  data.length === 0;
