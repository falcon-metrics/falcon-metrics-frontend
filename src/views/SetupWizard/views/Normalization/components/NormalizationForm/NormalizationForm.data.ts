import fetch from 'core/api/fetch';
import NormalizationForm from './NormalizationForm';
import postAndMutate from 'core/api/postAndMutate';
import { FormData, ApiRow, Category } from '../../interfaces/FormData';
import { getDefaultCategoriesWithoutQueries } from '../../utils/normalizationFormDefaultData';
import withWizardFetcher, {
  WizardEndpoints,
} from 'views/SetupWizard/components/withWizardFetcher';
import slugify from 'slugify';
import NormalizationCategories, { fixedNormalizationCategoriesDisplayNameRecord } from '../../interfaces/NormalizationCategories';

const getFormDataFromFlatList = (list: ApiRow[]) => {
  const categories = getDefaultCategoriesWithoutQueries();
  categories.forEach((category) => {
    category.fields = [];
  });
  for (const field of list) {
    const key = field.tags?.split(', ')[1];
    if (!key) {
      continue;
    }
    
    const category = categories.find(category => category.key === key);
    if (category) {
      category.fields.push(field);
    } else {
      categories.push({
        key,
        displayName: key.split('-').join(' '),
        fields: [field]
      });
    }
  }
  return categories;
};

const normalizationCache: {[url: string]: FormData} = {};

export const fetcher = async (url: string): Promise<FormData> => {
  
  if (process.env.NODE_ENV === 'development') {
    // Early exit with cache to avoid sending a lot of requests to api while developing
    // console.log(`[${normalizationCache[url] ? 'cached' : 'uncached'}] NormalizationForm.data.ts fetcher: Normalization FormData requested at "${url}"`);
    if (normalizationCache[url]) {
      return normalizationCache[url];
    }
  }

  const dataset: Category[] = await fetch.get<any[]>(url).then(({ data }) => {
    if (!data.length) {
      return [];
    }
    return getFormDataFromFlatList(data);
  });

  const formData: FormData = { dataset };

  // Populate cache to avoid sending a lot of requests to api while developing
  if (process.env.NODE_ENV === 'development') {
    normalizationCache[url] = formData;
  }

  return formData;
};

const parseSubmissionDataToFlatList = (dataset: Category[]) => {
  const result: ApiRow[] = [];
  
  for (const category of dataset) {
    for (const field of category.fields) {
      // const categoryName = fixedNormalizationCategoriesDisplayNameRecord[category.key] ? category.key : slugify(category.key)
      let key;
      if (field.tags && field.tags.includes(',')) {
          key = field.tags.split(',')[1].trim();
      } else if (field.tags && !field.tags.includes(',')) {
          key = field.tags.trim();
      } else {
        key = category.key.trim();
      }
      if (!fixedNormalizationCategoriesDisplayNameRecord[key]) {
        // Handle custom categories differently
        key = slugify(category.displayName);
      }
      const obj: ApiRow = {
        id: field.id,
        displayName: field.displayName,
        flomatikaQuery: field.flomatikaQuery,
        parsedQuery: field.parsedQuery,
        contextId: field.contextId,
        datasourceId: field.datasourceId,
        orgId: field.orgId,
        target: field.target,
        SLE: field.SLE,
        tags: 'normalisation, ' + key,
        colorHex: field.colorHex,
        alsoIncludeChildren: field.alsoIncludeChildren,
        onlyIncludeChildren: field.onlyIncludeChildren,
        category: key as NormalizationCategories,
      }

      result.push(obj);
    }
  }

  return result;
};

const endpoint = WizardEndpoints.normalization;

const submit = async (
  provider: string,
  namespace: string,
  dataset: Category[],
) => {
  const dataForPost = parseSubmissionDataToFlatList(dataset);
  return postAndMutate(
    `/datasources/${provider}/${namespace}/${endpoint}`,
    dataForPost,
  );
};

const NormalizationFormWithData = withWizardFetcher(
  NormalizationForm,
  fetcher,
  endpoint,
  {
    dataset: getDefaultCategoriesWithoutQueries(),
  },
  true,
  submit,
);

export default NormalizationFormWithData;
