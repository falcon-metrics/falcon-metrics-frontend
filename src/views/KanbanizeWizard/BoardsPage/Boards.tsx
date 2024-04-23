import { memo, useEffect, useMemo, useState } from 'react';

import ListWithBasicFilter from 'components/ListWithBasicFilter/ListWithBasicFilter';
import Container from 'components/PageContainer/PageContainer';
import uniq from 'lodash/uniq';
import xor from 'lodash/xor';
import { useSnackbar } from 'notistack';
import WizardSubmitWrapper from 'views/SetupWizard/components/WizardSubmitWrapper/WizardSubmitWrapper';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';

import { GridColDef, GridRowId } from '@mui/x-data-grid-pro';

import { ImportedProject, Project, TransformedImportedProject } from './interfaces/Project';
import { useSeedData } from 'views/SetupWizard/utils/utils';
import useConfirmDelete from 'views/SetupWizard/views/CustomFields/ConfirmDelete';
import { useDismissDependenciesWarning } from 'views/SetupWizard/components/CantDeleteWarning';
import { UserGuideContent, UserGuideKey } from 'components/UserGuide/UserGuideContent';

const entityDisplayName = 'projects';

export type Props = {
  initialValues: Project[];
  importedValues: ImportedProject[];
  isValidating: boolean;
  submit: (
    payload: Array<ImportedProject & { projectId: string }>,
  ) => Promise<any>;
};

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    width: 100,
    renderHeader: () => <b>{'Id'}</b>,
  },
  {
    field: 'workspace',
    headerName: 'Workspace',
    width: 300,
    renderHeader: () => <b>{'Workspace'}</b>,
  },
  {
    field: 'name',
    headerName: 'Board',
    width: 600,
    renderHeader: () => <b>{'Board'}</b>,
  },
];

const BoardsPage = ({
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

  const transformedData: TransformedImportedProject[] = importedValues.map((value) => ({
    id: value.board_id.toString(),
    ...value
  }));

  useEffect(() => {
    const differentIds = xor(selectionModel, initialSelection);
    const differentIdsIncludedOnFullList = differentIds.filter((id) =>
      transformedData.map(({ id }) => id).includes(String(id)),
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
    const selectedData = transformedData
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
                `Modifying Boards may impact Workflows and Boards & Aggregations configurations.\n Please review them accordingly.`,
                {
                  variant: 'warning',
                  autoHideDuration: 20000,
                  onClick: goToNext,
                  // https://github.com/iamhosseindhv/notistack/issues/32#issuecomment-510992746
                  style: { whiteSpace: 'pre-line' }
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
      title={UserGuideContent[UserGuideKey.WORKSPACES].title}
      userGuideId={UserGuideKey.WORKSPACES}
      maxWidth="md">
      <WizardSubmitWrapper onSubmit={onSubmit}>
        <ListWithBasicFilter
          loading={loading}
          rows={transformedData}
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

export default memo(BoardsPage);
