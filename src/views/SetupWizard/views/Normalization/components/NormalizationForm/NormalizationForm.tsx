import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { NormalizationTable } from './components/NormalizationTable/NormalizationTable';
import { FormData, Category } from '../../interfaces/FormData';
import { useSnackbar } from 'notistack';
import WizardFormProvider from 'views/SetupWizard/components/WizardFormProvider';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';
import {
  getDefaultEmptyCategories,
  getDefaultCategoriesWithoutQueries,
} from '../../utils/normalizationFormDefaultData';
import { useSeedData } from 'views/SetupWizard/utils/utils';

export type Props = FormData & {
  submit: (payload: Category[]) => Promise<any>;
};

const NormalizationForm = ({ dataset, submit }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { isEditMode } = useWizardContext();
  const fallbackDataset = isEditMode
    ? getDefaultEmptyCategories()
    : getDefaultCategoriesWithoutQueries();
  const startingFormData = {
    dataset: dataset.length ? dataset : fallbackDataset,
  };

  const methods = useForm<FormData>({
    defaultValues: startingFormData,
    mode: 'onChange',
  });

  const { handleSubmit } = methods;

  const onValid: SubmitHandler<FormData> = async ({ dataset }) => {
    try {
      const result = await submit(dataset);
      if (!result || typeof result !== 'object' || typeof result.status !== 'number') {
        throw new Error('Submit function did not return a valid object');
      } else if (result && result.data && result.data.error) {
        if (typeof result.data.error.message === 'string') {
          throw new Error(`Normalization save failed with error message: ${result.data.error.message}`);
        } else {
          throw new Error(`Normalization save failed with error object: ${JSON.stringify(result.data.error)}`);
        }
      } else if (result.status < 200 || result.status > 304) {
        throw new Error(`Submit endpoint returned status code ${result.status}`)
      }
    } catch (err) {
      if (err instanceof Error) {
        err.message = `Save failed: ${err.message}`;
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      }
      throw err;
    }
  };

  const onInvalid: SubmitErrorHandler<FormData> = (errors) => {
    const errorMessage = 'Some fields were not filled out correctly';
    if (errors.dataset?.length) {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    }
    return Promise.reject(errorMessage);
  };

  useSeedData();

  return (
    <WizardFormProvider
      hookFormMethods={{ ...methods }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onValid, onInvalid)}
    >
      <NormalizationTable />
    </WizardFormProvider>
  );
}

export default NormalizationForm;
