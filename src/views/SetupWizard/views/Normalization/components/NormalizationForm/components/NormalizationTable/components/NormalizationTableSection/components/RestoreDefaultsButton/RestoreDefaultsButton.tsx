import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import cloneDeep from 'lodash/cloneDeep';
import { useConfirm } from 'material-ui-confirm';
import { FormRow } from 'views/SetupWizard/views/Normalization/interfaces/FormData';
import { fixedNormalizationCategoriesDisplayNameRecord } from 'views/SetupWizard/views/Normalization/interfaces/NormalizationCategories';
import { getDefaultCategoriesWithoutQueries } from 'views/SetupWizard/views/Normalization/utils/normalizationFormDefaultData';

export const useStyles = makeStyles(() =>
  createStyles({
    label: {
      textTransform: 'initial',
    },
    root: {
      marginTop: 6,
      width: 138,
    },
  }),
);

interface Props {
  categoryIndex: number;
  append: (value: Partial<FormRow>) => void;
  removeAll: () => void;
}

function RestoreDefaultsButton({ categoryIndex, removeAll, append }: Props) {
  const confirm = useConfirm();
  const category = getDefaultCategoriesWithoutQueries()[categoryIndex];
  const classes = useStyles();

  const restoreDefaults = () => {
    removeAll();
    category.fields.forEach((defaultRow) => append(cloneDeep(defaultRow)));
  };

  const onClick = () =>
    confirm({
      title: 'Warning: This action cannot be undone!',
      description: (
        <>
          <Typography>
            Are you sure you want to replace the current fields with the default
            values? (All custom values for category{' '}
            {category ? fixedNormalizationCategoriesDisplayNameRecord[category.key] : 'normalisation'} will be lost.)
          </Typography>
        </>
      ),
      cancellationText: 'No',
      confirmationText: 'Yes',
    })
      .then(restoreDefaults)
      .catch(() => {
        console.debug('cancel');
      });

  return (
    <Button onClick={onClick} color="primary" classes={classes}>
      Restore Defaults
    </Button>
  );
}

export default RestoreDefaultsButton;
