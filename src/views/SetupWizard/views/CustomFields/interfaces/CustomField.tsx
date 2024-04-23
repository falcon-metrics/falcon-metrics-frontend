export interface CustomField {
  datasourceFieldName: string;
  displayName: string;
  id: string;
}

export type Payload = {
  selectedCustomFields: CustomField[];
  removedCustomFields: string[];
};
export type FetcherResult = {
  fullList: CustomField[];
  initialSelection: string[];
};
