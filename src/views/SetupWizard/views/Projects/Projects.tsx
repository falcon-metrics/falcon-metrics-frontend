import { memo, useEffect, useMemo, useState } from 'react';

import ListWithBasicFilter from 'components/ListWithBasicFilter/ListWithBasicFilter';
import Container from 'components/PageContainer/PageContainer';
import uniq from 'lodash/uniq';
import xor from 'lodash/xor';
import { useSnackbar } from 'notistack';
import WizardSubmitWrapper from 'views/SetupWizard/components/WizardSubmitWrapper/WizardSubmitWrapper';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';

import { GridColDef, GridRowId } from '@mui/x-data-grid-pro';

import { useDismissDependenciesWarning } from '../../components/CantDeleteWarning';
import useConfirmDelete from '../CustomFields/ConfirmDelete';
import { ImportedProject, Project } from './interfaces/Project';
import { useSeedData } from 'views/SetupWizard/utils/utils';
import { UserGuideContent, UserGuideKey } from "components/UserGuide/UserGuideContent";

const entityDisplayName = 'projects';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 250,
    renderHeader: () => <b>{'ID'}</b>,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 500,
    renderHeader: () => <b>{'Name'}</b>,
  },
];

export type Props = {
  initialValues: Project[];
  importedValues: ImportedProject[];
  isValidating: boolean;
  submit: (
    payload: Array<ImportedProject & { projectId: string }>,
  ) => Promise<any>;
};

const ProjectsPage = ({
  initialValues,
  importedValues,
  isValidating,
  submit,
}: Props) => {
  useSeedData();
  const confirmDelete = useConfirmDelete(
    initialValues.map((project) => ({
      id: project.projectId,
      displayName: project.name,
    })),
    entityDisplayName,
  );
  const warnDismissDependencies = useDismissDependenciesWarning(
    entityDisplayName,
  );

  const { enqueueSnackbar } = useSnackbar();
  const {
    setIsSubmitting,
    setIsDirty,
    isSubmitting,
    isEditMode,
    goToNext,
  } = useWizardContext();
  const initialSelection = useMemo(
    () => initialValues.map(({ projectId }) => projectId),
    [initialValues],
  );
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>(
    initialSelection,
  );
  const loading = !importedValues.length && isValidating;

  useEffect(() => {
    const differentIds = xor(selectionModel, initialSelection);
    const differentIdsIncludedOnFullList = differentIds.filter((id) =>
      importedValues.map(({ id }) => id).includes(String(id)),
    );
    const isDifferent = !!differentIdsIncludedOnFullList.length;
    setIsDirty(isDifferent);
  }, [selectionModel, initialSelection, importedValues, setIsDirty]);

  const onSubmit = async () => {
    if (!selectionModel.length) {
      enqueueSnackbar('At least one project must be selected.', {
        variant: 'error',
      });
      return Promise.reject();
    }
    setIsSubmitting(true);
    const selectedIds = uniq([...selectionModel]);
    const selectedData = importedValues
      .filter((data) => selectedIds.includes(data.id))
      .map((data) => ({ ...data, projectId: data.id }));

    const handleSubmit = () => {
      return submit(selectedData)
        .catch(() =>
          Promise.reject('Error when saving, please try again later'),
        )
        .then(({ data }) => {
          if (data.dependencies) {
            warnDismissDependencies(data.dependencies);
            Promise.reject(
              'Projects could not be deleted because of dependency tree.',
            );
          } else {
            if (isEditMode) {
              enqueueSnackbar(
                'You have edited your selected projects after having setup Work Item Types,\nplease go to the Work Item Types page to review your settings.',
                {
                  variant: 'warning',
                  autoHideDuration: 20000,
                  onClick: goToNext,
                },
              );
            }
            return data;
          }
        });
    };

    return confirmDelete(selectedIds.map(String)).then(handleSubmit);
  };

  return (
    <Container.Wizard
      title={UserGuideContent[UserGuideKey.PROJECTS].title}
      userGuideId={UserGuideKey.PROJECTS}
      maxWidth="md">
      <WizardSubmitWrapper onSubmit={onSubmit}>
        <ListWithBasicFilter
          loading={loading}
          rows={importedValues}
          columns={columns}
          selectionModel={selectionModel}
          setSelectionModel={setSelectionModel}
          queryFieldName={'name'}
          style={{ pointerEvents: isSubmitting ? 'none' : 'initial' }}
        />
      </WizardSubmitWrapper>
    </Container.Wizard>
  );
};

export default memo(ProjectsPage);
