import fetch from 'core/api/fetch';
import find from 'lodash/find';

import SummaryPage from './Summary';
import withWizardFetcher, { WizardEndpoints } from 'views/SetupWizard/components/withWizardFetcher';

export type SummaryData = Record<'datasource' | WizardEndpoints, any>;

const summaryDataEndpoints: WizardEndpoints[] = [
  WizardEndpoints.projects,
  WizardEndpoints.workitemtypes,
  WizardEndpoints.contexts,
  WizardEndpoints.customfields,
  WizardEndpoints.settings,
  WizardEndpoints.normalization,
];

const fetcher = (url: string) => {
  const [, , datasourceType, namespace] = url.split('/');
  const datasourceFetcher = fetch
    .get<any[]>('/datasources')
    .then(({ data }) => {
      return find(data, { datasourceType, namespace });
    });

  const workflowFetcher = fetch
    .get<unknown[]>(`/datasources/${datasourceType}/${namespace}/${WizardEndpoints.workflows}/kanbanize-workflows`)
    .then(({ data }) => data);

  const fetchers = summaryDataEndpoints.map((endpoint) =>
    fetch
      .get<unknown[]>(`/datasources/${datasourceType}/${namespace}/${endpoint}`)
      .then(({ data }) => data),
  );

  return Promise.all([datasourceFetcher, workflowFetcher, ...fetchers]).then(
    ([datasource, workflows, ...values]): { data: SummaryData } => {
      const data: Partial<SummaryData> = { datasource, workflows };
      summaryDataEndpoints.forEach((key, i) => (data[key] = values[i]));
      return { data: data as SummaryData };
    },
  );
};

const defaultValues = summaryDataEndpoints.reduce((result, key) => {
  result[key] = [];
  return result;
}, {} as Omit<SummaryData, 'datasource'>);

const SummaryPageWithData = withWizardFetcher(
  SummaryPage,
  fetcher,
  WizardEndpoints.summary,
  {
    data: {
      datasource: '',
      ...defaultValues,
    },
  },
);

export default SummaryPageWithData;
