import { useEffect, useState } from 'react';

import ListWithBasicFilter from 'components/ListWithBasicFilter/ListWithBasicFilter';
import Container from 'components/PageContainer/PageContainer';
import xor from 'lodash/xor';
import WizardSubmitWrapper from 'views/SetupWizard/components/WizardSubmitWrapper/WizardSubmitWrapper';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';

import { GridColDef, GridRowId } from '@mui/x-data-grid-pro';

import { useDismissDependenciesWarning } from '../../components/CantDeleteWarning';
import useConfirmDelete from './ConfirmDelete';
import { CustomField, Payload } from './interfaces/CustomField';
import { UserGuideContent, UserGuideKey } from "components/UserGuide/UserGuideContent";

const columns: GridColDef[] = [
  {
    field: 'displayName',
    headerName: 'Field',
    width: 798,
    renderHeader: () => <b>{'Field'}</b>,
  },
];

const entityDisplayName = 'custom fields';

export type Props = {
  fullList: CustomField[];
  initialSelection: string[];
  submit: (payload: Payload) => Promise<any>;
};

const CustomFields = ({ fullList, initialSelection, submit }: Props) => {
  const dataGridData = fullList.map((d) => ({
    id: d.id,
    displayName: d.displayName,
  }));
  const { setIsSubmitting, setIsDirty, isSubmitting } = useWizardContext();
  const warnDismissDependencies = useDismissDependenciesWarning(
    entityDisplayName,
  );
  const confirmDeleteCustomFields = useConfirmDelete(
    fullList.filter(({ id }) => initialSelection.includes(id)),
    entityDisplayName,
  );

  const [selectionModel, setSelectionModel] = useState<GridRowId[]>(
    initialSelection,
  );

  useEffect(() => {
    const differentIds = xor(selectionModel, initialSelection);
    const differentIdsIncludedOnFullList = differentIds.filter((id) =>
      fullList.map(({ id }) => id).includes(String(id)),
    );
    const isDifferent = !!differentIdsIncludedOnFullList.length;
    setIsDirty(isDifferent);
  }, [selectionModel, initialSelection, fullList, setIsDirty]);

  const onSubmit = () => {
    setIsSubmitting(true);
    const currentlySelected = fullList.filter((data) =>
      selectionModel.includes(data.id),
    );

    const currentlySelectedIds = currentlySelected.map((s) => s.id);
    const removedIds = initialSelection.filter(
      (id) => !currentlySelectedIds.includes(id),
    );

    const submitData = () => {
      const payload: Payload = {
        selectedCustomFields: currentlySelected,
        removedCustomFields: removedIds,
      };
      return submit(payload).then(({ data }) => {
        if (data.dependencies) {
          warnDismissDependencies(data.dependencies);
          Promise.reject(
            'Custom fields could not be deleted because of dependency tree.',
          );
        } else {
          return { data };
        }
      });
    };

    return confirmDeleteCustomFields(currentlySelectedIds)
      .then(submitData)
      .catch(() => Promise.reject('User chose not to delete custom fields.'));
  };

  return (
    <Container.Wizard
      title={UserGuideContent[UserGuideKey.CUSTOMFIELDS].title}
      userGuideId={UserGuideKey.CUSTOMFIELDS}
      isCustomDescription
      maxWidth="md">
      <WizardSubmitWrapper onSubmit={onSubmit}>
        <ListWithBasicFilter
          loading={!fullList}
          rows={dataGridData}
          selectionModel={selectionModel}
          setSelectionModel={setSelectionModel}
          columns={columns}
          queryFieldName="displayName"
          style={{ pointerEvents: isSubmitting ? 'none' : 'initial' }}
        />
      </WizardSubmitWrapper>
    </Container.Wizard>
  );
};

export default CustomFields;
