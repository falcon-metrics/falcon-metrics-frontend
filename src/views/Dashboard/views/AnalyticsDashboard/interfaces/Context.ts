export type Context = {
  id: string;
  displayName: string;
  children?: Context[];
  obeyaId?: string;
};
