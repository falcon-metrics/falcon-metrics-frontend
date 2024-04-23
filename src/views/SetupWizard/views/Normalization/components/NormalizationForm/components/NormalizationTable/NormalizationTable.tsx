import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NormalizationTableSection from './components/NormalizationTableSection/NormalizationTableSection';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormData, Category } from '../../../../interfaces/FormData';
import { useStyles } from './useStyles';
import StyledTableCell from './components/StyledTableCell';
import { nanoid as uuid } from 'nanoid';
import { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { fixedNormalizationCategoriesDisplayNameRecord } from 'views/SetupWizard/views/Normalization/interfaces/NormalizationCategories';

export const NormalizationTable = () => {
  const classes = useStyles();
  const { fields: categories, append } = useFieldArray<FormData, 'dataset'>({
    name: 'dataset',
  });

  const { setError, clearErrors, getValues } = useFormContext();

  const headerClasses = [classes.tableHeader, classes.headerWithBorder].join(' ');

  const addNormalisationGroup = useCallback(() => {
    const category: Category = {
      key: uuid(),
      displayName: 'Custom Category',
      fields: [],
    };
    append(category);
  }, []);

  const validateDisplayName = useCallback((categoryIndex: number, value: string) => {
    const onlyLettersDigitsOrSpace = (text) => (new RegExp(/^[a-z0-9 ]+$/i)).test(text);
    let errorMessage;
    if (value.length <= 0) {
      errorMessage = 'Display name cannot be empty';
    } else if (value.length >= 64) {
      errorMessage = 'Display name is too large (expected at most 64 characters, got ' + value.length + ')';
    } else if (value.includes('-')) {
      errorMessage = 'Display name cannot contain dashes (-)';
    } else if (value.includes('/')) {
      errorMessage = 'Display name cannot contain slashes (/)';
    } else if (value.includes('_')) {
      errorMessage = 'Display name cannot contain underline (_)';
    } else if (value.includes(',')) {
      errorMessage = 'Display name cannot contain comma (,)';
    } else if (!onlyLettersDigitsOrSpace(value)) {
      errorMessage = 'Display name can only contain alphanumeric characters (letters, numbers) or spaces';
    }
    if (!errorMessage) {
      for (let index = 0; index < Math.max(categoryIndex, categories.length); index++) {
        if (index === categoryIndex) {
          continue;
        }
        const otherDisplayName = getValues(`dataset.${index}.displayName`);
        if (otherDisplayName === value) {
          errorMessage = 'There can\'t be duplicated normalisation category names';
        }
      }
    }
    const fieldName = `dataset.${categoryIndex}.displayName`;
    if (errorMessage) {
      setError(fieldName, {
        message: errorMessage
      });
    } else {
      clearErrors(fieldName);
    }
    
    return errorMessage ? errorMessage : true;
  }, [setError, clearErrors]);


  return (
    <>
      <Table aria-label="normalisation">
        <TableHead>
          <TableRow>
            <StyledTableCell className={headerClasses} width={150}>
              Category
            </StyledTableCell>
            <StyledTableCell className={headerClasses} width={70}>
              Colour
            </StyledTableCell>
            <StyledTableCell className={headerClasses} width={300}>
              Display Name
            </StyledTableCell>
            <StyledTableCell className={headerClasses} width={800}>
              Filter Expression
            </StyledTableCell>
            <StyledTableCell className={classes.tableHeader} width={120}>
              SLE <br /><span className={classes.notBold}>(in days)</span>
            </StyledTableCell>
            <StyledTableCell width={70} />
          </TableRow>
        </TableHead>
        {categories.map((category, i) => (
          <NormalizationTableSection
            key={category.id}
            displayName={category.displayName}
            categoryIndex={i}
            allowDisplayNameEdit={fixedNormalizationCategoriesDisplayNameRecord[category.key] ? false : true}
            showRestoreButton={fixedNormalizationCategoriesDisplayNameRecord[category.key] ? true : false}
            validateDisplayName={validateDisplayName.bind(null, i)}
          />
        ))}
      </Table>
      <Box display="flex" justifyContent="center" marginTop="14px">
        <Button onClick={addNormalisationGroup} color="primary">
          <Box display="flex" justifyContent="center" alignItems="center">
            <AddIcon viewBox="-1 -1 26 26" />
            <Box marginLeft="6px" fontSize="1rem" sx={{ textTransform: 'none' } as any}>Add Custom View</Box>
          </Box>
        </Button>
      </Box>
    </>
  );
};
