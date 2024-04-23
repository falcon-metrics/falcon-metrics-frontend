import ContextData from '../JsonData/ContextResponse.json';
import { Context } from 'views/Dashboard/views/AnalyticsDashboard/interfaces/Context';
import { MockDataClient } from './MockDataClient';
import { SummaryResponse } from 'core/api/ApiClient/SummaryClient';

interface IMockData {
  getMockContextData(): any;
  getMockDataByKey(): any;
}

export const mockDataEmails = [
  // emails that can ONLY view mock data,
  // other contexts wont show up even if
  // returned by the API
  'info+trial@example.com',
];

export const showSummaryDataEmail = [
  ...mockDataEmails,
  'info@example.com',
  'info@example.com',
];
export const MockContextId = [
  'parent-context-1',
  'child-context-1',
  'grand-child-context-1',
  'grand-child-context-2',
  'child-context-2',
  'grand-child-context-3',
  'grand-child-context-4',
];
export type DataKey =
  | 'FlowEfficiencyData'
  | 'ThroughputData'
  | 'SummaryData'
  | 'WipData'
  | 'InventoryData'
  | 'LeadTimeData'
  | 'ContextData';

export class MockData implements IMockData {
  private mockDataClient = new MockDataClient();
  public getMockContextData = () => ContextData as Context[];

  public getStaticSummaryData = async (contextId?: string) => {
    const context = this.getContext(contextId);
    const key = `${context}/summary_response.json`;
    const summary: SummaryResponse = await this.mockDataClient.getDataByKey(
      key,
    );
    return summary;
  };

  public getMockDataByKey = async (contextId?: string, keyName?: DataKey) => {
    const context = this.getContext(contextId);
    const contextData = await this.mockDataClient.getMockData(context);
    return keyName ? contextData[keyName] : undefined;
  };

  private getContext(contextId: string | undefined) {
    let context = contextId || 'child-context-1';
    if (context === 'parent-context-1') {
      context = 'child-context-1';
    }
    return context;
  }
}
