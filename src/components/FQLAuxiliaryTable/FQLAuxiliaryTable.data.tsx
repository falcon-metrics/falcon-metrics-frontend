import useCustomFields from 'hooks/fetch/useCustomFields';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';
import FQLAuxiliaryTable, {
  SystemFieldWithType,
  FieldTypes,
} from './FQLAuxiliaryTable';
import systemFields, { SystemField } from './interfaces/SystemFields';
import useCardTypes from 'hooks/useCardTypes';
import { startCase } from 'lodash';

function FQLAuxiliaryTableWithData() {
  const { provider, namespace } = useWizardContext();
  const { customFields = [], isValidating } = useCustomFields(
    provider,
    namespace,
  );
  if (!(customFields instanceof Array)) {
    console.warn('Unexpected custom field object type from the server:');
    console.log(customFields);
    console.log('It is supposed to be an array. This is request reply error. An empty array will be used.');
  }

  // This is just a workaround 'coz displayName is not showing in Kanbanize
  function reverseSlugify(slug: string): string {
    if (!slug) return '';
    const [, name] = slug.split('.').map((item) => startCase(item));
    if (!slug) return '';
    return `${name.replaceAll('-', ' ')}`;
  }

  const { data } = useCardTypes(
    provider,
    namespace,
  );

  const filteredCustomFields = (!(customFields instanceof Array)) ? [] : customFields
    .filter(({ enabled }) => enabled)
    .map(
      (customField) =>
      ({
        description: '',
        inputTypeOrAcceptedValues: '',
        ...customField,
      } as SystemField),
    );

  // For "workItemType", show actual database fields
  const modifiedSystemFields = (fields) =>
    fields.map((field) => {
      if (field.datasourceFieldName === "workItemType") {
        const values = data && data.length > 0 ? data.map((item) => `"${reverseSlugify(item.workItemTypeId)}"`) : ["Text"];
        const lastIndex = values.length - 1;

        return {
          ...field,
          // concat 'or' before the last index/field value
          inputTypeOrAcceptedValues: values.length > 1 ? `${values.slice(0, lastIndex).join(", ")} or ${values[lastIndex]}` : values[0],
        };
      }
      return field;
    });

  const addTypeToFields = (
    array: SystemField[],
    type: FieldTypes,
  ): SystemFieldWithType[] =>
    array.map((field) => ({ ...field, type, id: field.datasourceFieldName }));
  const fields = [
    addTypeToFields(modifiedSystemFields(systemFields), 'Falcon Metrics'),
    addTypeToFields(filteredCustomFields, 'Custom'),
  ].flat();

  return <FQLAuxiliaryTable fields={fields} isValidating={isValidating} />;
}

export default FQLAuxiliaryTableWithData;
