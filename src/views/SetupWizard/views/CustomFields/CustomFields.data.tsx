import fetch from 'core/api/fetch';
import CustomFields from './CustomFields';
import withWizardFetcher, {
  WizardEndpoints,
} from '../../components/withWizardFetcher';
import { FetcherResult } from './interfaces/CustomField';

const getCustomFields = (url: string): Promise<FetcherResult> => {
  const importFromDatasourceAPI = fetch.get(`${url}/import`);
  const getFromDatabase = fetch.get(url);
  return Promise.all([importFromDatasourceAPI, getFromDatabase]).then(
    ([importedValues, databaseValues]) => {
      const initialSelection = databaseValues.data
        .filter(({ enabled }) => enabled)
        .map(({ datasourceFieldName }) => datasourceFieldName);
      return {
        fullList: importedValues.data,
        initialSelection,
      };
    },
  );
};

const CustomFieldWithData = withWizardFetcher(
  CustomFields,
  getCustomFields,
  WizardEndpoints.customfields,
  {
    fullList: [],
    initialSelection: [],
  },
);

export default CustomFieldWithData;
