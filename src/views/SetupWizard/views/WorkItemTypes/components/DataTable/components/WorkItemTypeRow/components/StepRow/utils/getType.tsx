import { QueueActive } from 'views/SetupWizard/views/WorkItemTypes/interfaces/interfaces';

export const getType = (checked: boolean) =>
  checked ? QueueActive.active : QueueActive.queue;
export const getChecked = (type: QueueActive) => type === QueueActive.active;
