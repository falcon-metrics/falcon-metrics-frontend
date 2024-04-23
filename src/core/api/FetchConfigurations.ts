import {
  CustomFieldClient,
  CustomFields,
} from 'core/api/ApiClient/CustomFieldClient';
import { ClassOfServiceClient } from './ApiClient/ClassOfServiceClient';
import { LinkTypeClient } from './ApiClient/LinkTypeClient';
import { ObjectiveLinkTypeClient } from './ApiClient/ObjectiveLinkType';
import { PortfolioLevelsClient } from './ApiClient/PortfolioLevelsClient';
import {
  WorkItemTypesClient,
  WorkItemType,
} from './ApiClient/WorkItemTypesClient';

export interface PortfolioLevel {
  id: number;
  name: string;
  workItemTypes?: Array<WorkItemType>;
}

export interface ClassOfService {
  id: string;
  name: string;
}

export interface Context {
  id: string;
  name: string;
  level: string;
}

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

let developmentCacheForCustomFields: any = null;
export async function getCustomFields(): Promise<CustomFields> {
  if (isDevelopmentEnv) {
    // Early exit with cache to avoid sending a lot of requests to api while developing
    // console.log(`[${developmentCacheForCustomFields ? 'cached' : 'uncached'}] FetchConfiguration.ts: CustomFields requested`);
    if (developmentCacheForCustomFields) {
      return developmentCacheForCustomFields;
    }
  }
  const customFieldClient = new CustomFieldClient();
  const customFields = await customFieldClient.get();

  if (isDevelopmentEnv && customFields) {
    developmentCacheForCustomFields = customFields;
  }

  return customFields;
}

let developmentCacheForWorkItemTypes: any = null;
export async function getWorkItemTypes(): Promise<Array<WorkItemType>> {
  if (isDevelopmentEnv) {
    // Early exit with cache to avoid sending a lot of requests to api while developing
    if (developmentCacheForWorkItemTypes) {
      return developmentCacheForWorkItemTypes;
    }
  }
  const workItemTypesClient = new WorkItemTypesClient();
  const workItemTypes: Array<WorkItemType> = await workItemTypesClient.get();

  if (isDevelopmentEnv && workItemTypes) {
    developmentCacheForWorkItemTypes = workItemTypes;
  }

  return workItemTypes;
}

let developmentCacheForPortfolioLevels: any = null;
export async function getPortfolioLevels(): Promise<Array<PortfolioLevel>> {
  if (isDevelopmentEnv) {
    // Early exit with cache to avoid sending a lot of requests to api while developing
    // console.log(`[${developmentCacheForPortfolioLevels ? 'cached' : 'uncached'}] FetchConfiguration.ts: PortfolioLevels requested`);
    if (developmentCacheForPortfolioLevels) {
      return developmentCacheForPortfolioLevels;
    }
  }
  const portfolioLevelsClient = new PortfolioLevelsClient();
  const portfolioLevels: Array<PortfolioLevel> = await portfolioLevelsClient.get();

  if (isDevelopmentEnv && portfolioLevels) {
    developmentCacheForPortfolioLevels = portfolioLevels;
  }

  return portfolioLevels;
}

let developmentCacheForClassOfServices: any = null;
export async function getClassOfServices(): Promise<Array<ClassOfService>> {
  if (isDevelopmentEnv) {
    // Early exit with cache to avoid sending a lot of requests to api while developing
    // console.log(`[${developmentCacheForClassOfServices ? 'cached' : 'uncached'}] FetchConfiguration.ts: ClassOfServices requested`);
    if (developmentCacheForClassOfServices) {
      return developmentCacheForClassOfServices;
    }
  }
  const classOfServicesClient = new ClassOfServiceClient();
  const classOfServices: Array<ClassOfService> = await classOfServicesClient.get();

  if (isDevelopmentEnv && classOfServices) {
    // Populate cache to avoid sending a lot of requests to api while developing
    developmentCacheForClassOfServices = classOfServices;
  }

  return classOfServices;
}

let developmentCacheForLinkTypes: any = null;
export async function getLinkTypes(): Promise<string[]> {
  if (isDevelopmentEnv) {
    // Early exit with cache to avoid sending a lot of requests to api while developing
    // console.log(`[${developmentCacheForPortfolioLevels ? 'cached' : 'uncached'}] FetchConfiguration.ts: PortfolioLevels requested`);
    if (developmentCacheForLinkTypes) {
      return developmentCacheForLinkTypes;
    }
  }
  const linkTypeClient = new LinkTypeClient();
  const linkTypes: string[] = await linkTypeClient.get();

  if (isDevelopmentEnv && linkTypes) {
    developmentCacheForLinkTypes = linkTypes;
  }

  return linkTypes;
}

export async function getObjectiveLinkTypes(): Promise<string[]> {
  if (isDevelopmentEnv) {
    // Early exit with cache to avoid sending a lot of requests to api while developing
    // console.log(`[${developmentCacheForPortfolioLevels ? 'cached' : 'uncached'}] FetchConfiguration.ts: PortfolioLevels requested`);
    if (developmentCacheForLinkTypes) {
      return developmentCacheForLinkTypes;
    }
  }
  const objLinkTypeClient = new ObjectiveLinkTypeClient();
  const linkTypes: string[] = await objLinkTypeClient.get();

  if (isDevelopmentEnv && linkTypes) {
    developmentCacheForLinkTypes = linkTypes;
  }

  return linkTypes;
}
