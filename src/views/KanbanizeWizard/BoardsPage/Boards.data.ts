import fetch from 'core/api/fetch';
import Boards from './Boards';
import { ImportedProject, Project } from './interfaces/Project';
import withWizardFetcher, { WizardEndpoints } from 'views/SetupWizard/components/withWizardFetcher';

const fetcher = (key: string) => {
  const importFetcher = fetch.get<ImportedProject[]>(`${key}/import`);
  const initialFetcher = fetch.get<Project[]>(key);
  return Promise.all([importFetcher, initialFetcher]).then(
    ([importedValues, initialValues]) => ({
      importedValues: importedValues.data,
      initialValues: initialValues.data,
    }),
  );
};

const BoardsWithData = withWizardFetcher(
  Boards,
  fetcher,
  WizardEndpoints.projects,
  {
    importedValues: [],
    initialValues: [],
  },
);

export default BoardsWithData;
