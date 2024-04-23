import { sortBy } from 'lodash';
import isArray from 'lodash/isArray';
import { DateTime } from 'luxon';
import { isIsoDate as getIsIsoDate } from 'utils/dateTime';
import { getClearedFilters } from 'views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/utils';

import { ApiQueryParameters } from '../../../views/Dashboard/views/Platform/views/FilterPanel/contexts/FilterPanelContext/interfaces';
import { DataKey, MockContextId, MockData } from './MockData/MockData';
import { Connection } from './utils/connection';
import { getTimezone } from 'utils/utils';

export type { ApiQueryParameters };

const arraySeparator = ',';

export interface APIClient<T = never> {
  getData(demoDataIsSelected: boolean, queryParameters?: ApiQueryParameters): T;
}
export abstract class APIClient {
  private resourcePath = '';
  private mockData: MockData;
  constructor(resourcePath: string) {
    if (!resourcePath || resourcePath.length < 1) {
      throw new Error(
        'APIClient instance endpointURL property has not been defined',
      );
    }
    this.resourcePath = resourcePath;
    this.mockData = new MockData();
  }

  async authHeaders() {
    return {
      Authorization: `Bearer ${window.token}`,
    };
  }

  static getMappedQueryParams(queryParameters?: Record<string, unknown>) {
    const mappedQueryParams = new Map<string, string>();

    if (queryParameters) {
      const keys = sortBy(Object.keys(queryParameters));
      keys.forEach((key) => {
        const value = queryParameters[key];
        if (
          value === undefined ||
          value === null ||
          (isArray(value) && !value.length)
        ) {
          return;
        }
        const parsedValue: string = isArray(value)
          ? value.join(arraySeparator)
          : value instanceof Date
          ? DateTime.fromJSDate(value).toISODate()
          : String(value);
        mappedQueryParams.set(key, parsedValue);
      });
    }

    return Object.fromEntries(mappedQueryParams);
  }

  static urlQueryToFilterPanelObject(urlSearchParams: URLSearchParams) {
    const initialFilters = getClearedFilters();
    const obj = Object.fromEntries(urlSearchParams);
    const keys = Object.keys(obj) as Array<keyof Partial<ApiQueryParameters>>;
    const urlQuery = keys.reduce<Partial<ApiQueryParameters>>((result, key) => {
      const encodedValue = obj[key];
      let value: ApiQueryParameters[keyof ApiQueryParameters];
      if (getIsIsoDate(encodedValue)) {
        value = DateTime.fromISO(encodedValue).toJSDate();
      } else if (isArray(initialFilters[key])) {
        value = encodedValue.split(arraySeparator);
      } else {
        value = encodedValue;
      }
      Object.assign(result, { [key]: value });
      return result;
    }, {});
    return {
      ...initialFilters,
      ...urlQuery,
    };
  }

  async get(args?: {
    queryParameters?: ApiQueryParameters;
    dataKey?: DataKey;
    demoDataIsSelected?: boolean;
  }): Promise<any> {
    const defaultArgs = {
      queryParameters: undefined,
      dataKey: undefined,
      demoDataIsSelected: undefined,
    };
    const { queryParameters, dataKey, demoDataIsSelected } =
      args ?? defaultArgs;
    const connection = Connection.getConnection();
    const mappedQueryParams = APIClient.getMappedQueryParams(queryParameters);
    const headers = await this.authHeaders();
    const { contextId } = mappedQueryParams;

    if (
      (dataKey && MockContextId.includes(contextId)) ||
      demoDataIsSelected //if there is no live datasource, default to mock data
    ) {
      return this.mockData.getMockDataByKey(
        contextId || 'parent-context-1',
        dataKey,
      );
    } else {
      const urlParameters = new URLSearchParams(window.location.search);
      const localizationParams = {
        tz: urlParameters.get('timezone') ?? getTimezone(),
        lang: urlParameters.get('lang') ?? navigator.language,
      };
      return connection.getJson(
        this.resourcePath,
        {
          ...localizationParams,
          ...mappedQueryParams,
        },
        headers,
      );
    }
  }
}
