import fetch from 'core/api/fetch';
import { parseISO } from 'date-fns/esm';
import withWizardFetcher, {
  WizardEndpoints,
} from 'views/SetupWizard/components/withWizardFetcher';

import {
  FetchedData,
  TransformedData,
} from './interfaces/BaseData';
import SettingsForm from './SettingsForm';


export const fetcher = (url: string): Promise<TransformedData> => {
  return fetch.get<FetchedData>(url).then(({ data }) => {
    const initialDate = data?.initialDate
      ? parseISO(data?.initialDate)
      : new Date();

    return {
      ...data,
      initialDate,
    };
  });
};

const DatasourceSettingsFormWithData = withWizardFetcher(
  SettingsForm,
  fetcher,
  WizardEndpoints.settings,
  {
    initialDate: new Date(),
    excludeExpression: '',
    blockersExpression: '',
    discardedExpression: '',
    alsoIncludeChildrenExclude: false,
    onlyIncludeChildrenExclude: false,
    alsoIncludeChildrenBlockers: false,
    onlyIncludeChildrenBlockers: false,
    alsoIncludeChildrenDiscarded: false,
    onlyIncludeChildrenDiscarded: false,
    customFieldsDb: [],
    blockedReasonFieldId: '',
    discardedReasonFieldId: '',
    desiredDeliveryDateFieldId: '',
    classOfServiceFieldId: ''
  },
  true,
);

export default DatasourceSettingsFormWithData;
