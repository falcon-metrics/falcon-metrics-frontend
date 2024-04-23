export type Project = {
  datasourceId: string;
  datasourceType: string;
  deletedAt: string;
  name: string;
  orgId: string;
  projectId: string;
  workspace: string;
};

export type ImportedProject = {
  board_id: number;
  workspace_id: number;
  name: string;
};

export type TransformedImportedProject = {
  id: string;
} & ImportedProject;