import { TransformedDatabaseWorkItemType } from '../interfaces/interfaces';

export const getRowKey = (d: TransformedDatabaseWorkItemType) =>
  d.name + d.id + d.projectId;
