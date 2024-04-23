import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { nanoid as uuid } from 'nanoid';
import {
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { getRandomHex, HexColor } from 'utils/colors';
import { FormData } from 'views/SetupWizard/views/Normalization/interfaces/FormData';
import NormalizationTableRowFragment from './components/NormalizationTableRowFragment/NormalizationTableRowFragment';
import RestoreDefaultsButton from './components/RestoreDefaultsButton/RestoreDefaultsButton';
import StyledTableCell from '../StyledTableCell';
import useStyles from './NormalizationTableSection.styles';
import MUIFormInput from 'components/UI/MUIFormInput/MUIFormInput';
import { useEffect, useState } from 'react';
import { normalizationFormDefaultData } from 'views/SetupWizard/views/Normalization/utils/normalizationFormDefaultData';
import { fixedNormalizationCategoriesDisplayNameRecord } from 'views/SetupWizard/views/Normalization/interfaces/NormalizationCategories';

interface Props {
  displayName: string;
  categoryIndex: number;
  allowDisplayNameEdit: boolean;
  showRestoreButton: boolean;
  validateDisplayName?: (value: string) => any;
};

const cellSpaces = 5;

const NormalizationTableSection = ({
  displayName,
  categoryIndex,
  allowDisplayNameEdit,
  validateDisplayName,
  showRestoreButton,
}: Props) => {
  const { trigger, register } = useFormContext();

  const sendTelemetry = useSendTelemetry();
  const { fields, append, remove } = useFieldArray<
    FormData,
    'dataset.0.fields'
  >({
    name: `dataset.${categoryIndex}.fields` as 'dataset.0.fields',
  });

  const [defaultDataLoaded, setDefaultDataLoaded] = useState(false);

  /*
    This function checks whether the `categoryIndex` is within valid bounds of the fields array (means there is no existing data). 
    If the condition is true, retrieve the default data from the default dataset and append it to the fields array. 
    Lastly, mark the `defaultDataLoaded` = true to prevent other reloads
  */
  const loadDefaultData = () => {
    if (
      categoryIndex >= 0 &&
      categoryIndex < normalizationFormDefaultData.dataset.length
    ) {
      const categoryKey =
        normalizationFormDefaultData.dataset[categoryIndex].key;
      if (fields.length === 0 && fixedNormalizationCategoriesDisplayNameRecord[categoryKey]) {
        const defaultData = normalizationFormDefaultData.dataset[
          categoryIndex
        ].fields.map((field) => {
          // extract `flomatikaQuery` so it will not load with the other props
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { flomatikaQuery, ...fieldWithoutQuery } = field;
          return fieldWithoutQuery;
        });
        append(defaultData);
        setDefaultDataLoaded(true); // Mark default data as loaded
      }
    }
  };

  /* 
    Ensures that the default data is only loaded 
    once per category and avoids unnecessary reloads 
  */
  useEffect(() => {
    if (!defaultDataLoaded) {
      loadDefaultData();
    }
  }, [defaultDataLoaded]);

  const appendField = () => {
    if (fields.length === 0) {
      loadDefaultData();
    }
    append({
      id: uuid(),
      displayName: '',
      flomatikaQuery: '',
      SLE: 0,
      target: 0,
      colorHex: ('#' + getRandomHex()) as HexColor,
    });
    sendTelemetry(
      'ConfiguredNormalization',
      'User append normalization',
      {
        page: 'settings-wizard', widget: 'normalization'
      }
    );
  };

  const removeField = (index: number, field: typeof fields[0]) => {
    remove(index);
    trigger(`dataset.${categoryIndex}.fields.0.target`);
    sendTelemetry(
      'ConfiguredNormalization',
      `User removed normalization ${JSON.stringify(field)}`,
      {
        page: 'settings-wizard', widget: 'normalization'
      }
    );
  };

  const classes = useStyles();
  const tableRows = fields.map((field, i) => ({
    key: field.id + field.flomatikaQuery + field.displayName + i,
    node: (
      <NormalizationTableRowFragment
        field={field}
        rowIndex={i}
        categoryIndex={categoryIndex}
        remove={() => removeField(i, field)}
      />
    ),
  }));
  tableRows.push({
    key: '0',
    node: (
      <>
        {new Array(cellSpaces).fill(null).map((_, i) => (
          <StyledTableCell key={i} />
        ))}
        <StyledTableCell className={classes.addButtonContainer}>
          <IconButton
            className={classes.addButton}
            aria-label="add"
            size="small"
            onClick={appendField}
          >
            <AddCircleIcon />
          </IconButton>
        </StyledTableCell>
      </>
    ),
  });

  const displayNameElement = allowDisplayNameEdit ? <MUIFormInput registrationProps={register(
    `dataset.${categoryIndex}.displayName`,
    {
      required: 'Category name is required',
      validate: validateDisplayName
    }
  )}
  /> : (displayName ? displayName : 'Custom Normalisation');

  return (
    <TableBody className={classes.container}>
      {tableRows.map((row, i, { length }) => (
        <TableRow key={row.key}>
          <StyledTableCell className={classes.sectionLabel}>
            {
              i === 0 ? displayNameElement : null
            }
            {i === length - 1 && showRestoreButton && (
              <RestoreDefaultsButton
                categoryIndex={categoryIndex}
                append={append}
                removeAll={remove}
              />
            )}
          </StyledTableCell>
          {tableRows[i].node}
        </TableRow>
      ))}
    </TableBody>
  );
}

export default NormalizationTableSection;
