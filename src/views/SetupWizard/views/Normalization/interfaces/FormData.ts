import { HexColor } from 'utils/colors';
import NormalizationCategories from './NormalizationCategories';

export interface FormRow {
  id: number | string;
  displayName: string;
  flomatikaQuery: string;
  parsedQuery?: string;
  contextId?: string;
  datasourceId?: string;
  orgId?: string;
  target?: number;
  SLE?: number;
  tags?: string;
  colorHex: HexColor;
  alsoIncludeChildren: boolean;
  onlyIncludeChildren: boolean;
  deletedAt?: null | string;
  isFavorite?: boolean;
}

export interface ApiRow extends FormRow {
  category: NormalizationCategories;
}

export type Category = {
  key: string;
  displayName: string;
  fields: FormRow[];
};

export type FormData = {
  dataset: Category[];
};
