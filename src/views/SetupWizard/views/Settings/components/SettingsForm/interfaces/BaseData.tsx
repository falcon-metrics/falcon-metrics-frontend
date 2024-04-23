type CustomField = {
  datasourceFieldName: string;
  displayName: string;
  tags: string;
  enabled: boolean;
};
type BaseData<T> = {
  initialDate: T;
  excludeExpression: string;
  blockersExpression: string;
  discardedExpression: string;
  alsoIncludeChildrenExclude: boolean;
  onlyIncludeChildrenExclude: boolean;
  alsoIncludeChildrenBlockers: boolean;
  onlyIncludeChildrenBlockers: boolean;
  alsoIncludeChildrenDiscarded: boolean;
  onlyIncludeChildrenDiscarded: boolean;
  blockedReasonFieldId: string;
  discardedReasonFieldId: string;
  desiredDeliveryDateFieldId: string;
  customFieldsDb: CustomField[];
  classOfServiceFieldId: string;
};
export type FetchedData = BaseData<string>;
export type TransformedData = BaseData<Date>;
