import { toPairs } from 'lodash';
import { DateTime } from 'luxon';

type ParamKeyValuePair = [string, unknown];

const isValidParamValue = ([_key, value]: ParamKeyValuePair): boolean => {
  const isUndefinedOrNull: boolean =
    value === undefined || value === null;
  const isEmptyArray: boolean =
    Array.isArray(value) && value.length === 0;
  
  return !isUndefinedOrNull && !isEmptyArray;
}

const stringifyParamValue= (value: unknown): string => {
  if (Array.isArray(value)) {
    const arraySeparator = ',';
    return value.join(arraySeparator);
  }

  if (value instanceof Date) {
    return DateTime.fromJSDate(value).toISODate();
  }

  return String(value);
}

const convertPairToQueryString = ([key, value]: ParamKeyValuePair): string => {
  const valueString: string = stringifyParamValue(value);
  const queryString = `&${key}=${valueString}` 

  return queryString;
}

export const getUrlQueryParamsString = (
  queryParameters: Record<string, unknown>
): string => {
  const params: Array<ParamKeyValuePair> = toPairs(queryParameters);
  const querySnippets: string[] = params
    .filter(isValidParamValue)
    .map(convertPairToQueryString);

  const fullQuery: string = querySnippets.join('');
  
  const encodedParams: string = new URLSearchParams(fullQuery).toString();

  return encodedParams;
};

