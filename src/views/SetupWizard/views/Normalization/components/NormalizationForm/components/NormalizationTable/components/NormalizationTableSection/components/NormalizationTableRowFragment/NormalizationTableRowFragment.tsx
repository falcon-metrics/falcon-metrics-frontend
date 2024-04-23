import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Children, Fragment, useCallback, useEffect, useState } from 'react';
import { DeepMap, FieldValues, useFormContext } from 'react-hook-form';
import NormalizationCategories from 'views/SetupWizard/views/Normalization/interfaces/NormalizationCategories';
import { FormRow } from 'views/SetupWizard/views/Normalization/interfaces/FormData';
import { normalizationFormDefaultData } from 'views/SetupWizard/views/Normalization/utils/normalizationFormDefaultData';
import MUIFormInput from 'components/UI/MUIFormInput';
import FormColorPicker from 'components/UI/FormColorPicker/ColorPicker';
import FQLInput from 'components/FQLInput/FQLInput';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';
import StyledTableCell from '../../../StyledTableCell';

type Props = {
  field: FormRow;
  categoryIndex: number;
  rowIndex: number;
  remove: () => any;
};

function NormalizationTableRowFragment({
  field,
  categoryIndex,
  rowIndex,
  remove,
}: Props) {
  const { namespace, provider } = useWizardContext();
  const formMethods = useFormContext();
  const { register, getValues, setValue } = formMethods;
  const groupNameInForm = `dataset.${categoryIndex}.fields`;
  const getFields = (formDataStructure: DeepMap<FieldValues, any>): FormRow[] =>
    formDataStructure?.dataset?.[categoryIndex]?.fields ?? [];
  const defaultFields = getFields(normalizationFormDefaultData);
  const getFieldName = useCallback(
    (key: keyof FormRow) => `${groupNameInForm}.${rowIndex}.${key}`,
    [groupNameInForm, rowIndex],
  );

  const minSLE = 1;
  const isOfDemandCategory = normalizationFormDefaultData.dataset[categoryIndex] && normalizationFormDefaultData.dataset[categoryIndex].key === NormalizationCategories.DEMAND;

  const [color, setColor] = useState(field.colorHex);
  useEffect(() => {
    setValue(getFieldName('colorHex'), color, { shouldDirty: true });
  }, [color, setValue, getFieldName]);

  const {
    props: { children: ownChildren },
  } = (
      <>
        <FormColorPicker value={color} setValue={setColor} />
        <MUIFormInput
          registrationProps={register(getFieldName('displayName'), {
            required: 'Display Name is required',
          })}
          defaultValue={field['displayName']}
          placeholder={(defaultFields[rowIndex]?.['displayName'] ?? defaultFields[0]?.displayName ?? '').toString()}
        />
        <FQLInput
          displayName={getValues(getFieldName('flomatikaQuery'))}
          fieldNameInForm={getFieldName('flomatikaQuery')}
          registerOptions={{ required: 'Filter Expression is Required' }}
          namespace={namespace}
          provider={provider}
          defaultValue={field['flomatikaQuery']}
          defaultValueForAlsoIncludeChildren={field.alsoIncludeChildren}
          defaultValueForOnlyIncludeChildren={field.onlyIncludeChildren}
          fieldNameForAlsoIncludeChildren={getFieldName('alsoIncludeChildren')}
          fieldNameForOnlyIncludeChildren={getFieldName('onlyIncludeChildren')}
          placeholder={(defaultFields[rowIndex]?.['flomatikaQuery'] ?? defaultFields[0]?.flomatikaQuery ?? '').toString()}
        />
        {isOfDemandCategory && (
          <MUIFormInput
            registrationProps={register(getFieldName('SLE'), {
              required: 'Service Level Expectation is required',
              min: {
                value: minSLE,
                message: `SLE must be greater than ${minSLE}`,
              },
            })}
            min={minSLE}
            defaultValue={field['SLE']}
            placeholder={(defaultFields[rowIndex]?.['SLE'] ?? defaultFields[0]['SLE'] ?? '').toString()}
          />
        )}
        <IconButton aria-label="remove" size="small" onClick={remove}>
          <DeleteIcon />
        </IconButton>
      </>
    );

  return (
    <Fragment>
      {Children.map(ownChildren, (inputNode, i) => (
        <StyledTableCell key={i}>{inputNode}</StyledTableCell>
      ))}
    </Fragment>
  );
}

export default NormalizationTableRowFragment;
