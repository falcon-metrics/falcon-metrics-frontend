export type AssociateWorkItemDependency = {
  dependencyMapId?: string;
  blockerContextId: string;
  blockerWorkItemId?: string;
  blockerContextName?: string;
  blockerWorkItemTitle?: string;

  blockedContextId: string;
  blockedWorkItemId?: string;
  blockedContextName?: string;
  blockedWorkItemTitle?: string;
  shouldBeDeleted?: boolean;
};