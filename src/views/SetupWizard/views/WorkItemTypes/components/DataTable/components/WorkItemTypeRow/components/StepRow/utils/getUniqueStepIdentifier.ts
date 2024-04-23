import {
  ImportedStep,
  TransformedDatabaseWorkItemTypeStep,
} from 'views/SetupWizard/views/WorkItemTypes/interfaces/interfaces';
import { v4 as uuid } from 'uuid';

const separator = uuid();

export const getUniqueStepIdentifier = (
  step: TransformedDatabaseWorkItemTypeStep | ImportedStep,
) => step.id + separator + step.name;
