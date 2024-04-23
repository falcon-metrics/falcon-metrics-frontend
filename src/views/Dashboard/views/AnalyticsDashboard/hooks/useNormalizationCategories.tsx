import { useState, useEffect } from 'react';
import { WizardEndpoints } from 'views/SetupWizard/components/withWizardFetcher';
import { Category } from 'views/SetupWizard/views/Normalization/interfaces/FormData';
import { fetcher as normalizationFetch } from 'views/SetupWizard/views/Normalization/components/NormalizationForm/NormalizationForm.data';
import { fetchForEachDatasource } from 'views/Dashboard/views/Platform/views/FilterPanel/utils/fetchFilterOptions';

export function useNormalizationCategories() {
  const [normalizationCategories, setNormalizationCategories] = useState<Category[]>([]);

  useEffect(() => {
    const endpoint = WizardEndpoints.normalization;
    const fetcher = (url: string) => normalizationFetch(url).then(({ dataset }) => dataset);

    fetchForEachDatasource(endpoint, fetcher).then(data => {
      setNormalizationCategories(data);
    });
  }, []);

  return normalizationCategories;
}
