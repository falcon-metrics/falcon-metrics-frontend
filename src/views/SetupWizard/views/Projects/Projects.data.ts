import fetch from 'core/api/fetch';
import ProjectsPage from './Projects';
import withWizardFetcher, {
  WizardEndpoints,
} from '../../components/withWizardFetcher';
import { ImportedProject, Project } from './interfaces/Project';

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

const ProjectsPageWithData = withWizardFetcher(
  ProjectsPage,
  fetcher,
  WizardEndpoints.projects,
  {
    importedValues: [],
    initialValues: [],
  },
);

export default ProjectsPageWithData;
