import { ReactNode } from 'react';
import Providers from '../../../../interfaces/Providers';

export default interface ProviderConnection {
  providerSlug: Providers;
  tokenHelpPage: string;
  displayName: string;
  specificInstructionNode?: ReactNode;
  getUrlToAPITokenPage: (...args: any[]) => string;
  getNormalizedURL: (input: string) => string;
  getNameSpace: (url: string) => string;
  getWorkItemUrl: (
    workItemId: string,
    namespace: string,
    projectName: string,
  ) => string;
}
