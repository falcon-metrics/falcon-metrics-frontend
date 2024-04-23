import fetch from 'core/api/fetch';
import find from 'lodash/find';

import withWizardFetcher, {
  WizardEndpoints,
} from '../../components/withWizardFetcher';
import SummaryPage from './Summary';

export type SummaryData = Record<'datasource' | WizardEndpoints, any>;

const summaryDataEndpoints: WizardEndpoints[] = [
  WizardEndpoints.projects,
  WizardEndpoints.workflows,
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

  const fetchers = summaryDataEndpoints.map((endpoint) =>
    fetch
      .get<unknown[]>(`/datasources/${datasourceType}/${namespace}/${endpoint}`)
      .then(({ data }) => data),
  );

  return Promise.all([datasourceFetcher, ...fetchers]).then(
    ([datasource, ...values]): { data: SummaryData } => {
      const data: Partial<SummaryData> = { datasource };
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
