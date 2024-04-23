import fetch from 'core/api/fetch';
import useSWR from 'swr';
import NormalizationCategories from 'views/SetupWizard/views/Normalization/interfaces/NormalizationCategories';

const resource = '/normalization/configured-categories';

export const getMissingNormalizationCategories = (
  categories?: NormalizationCategories[],
) => {
  if (!categories) {
    return;
  }
  const missingCategories: NormalizationCategories[] = [];
  for (const k in NormalizationCategories) {
    if (!categories.includes(NormalizationCategories[k])) {
      missingCategories.push(NormalizationCategories[k]);
    }
  }
  return Array.from(missingCategories.values());
};

export default function useConfiguredCategories(enableDemoData?: boolean) {
  const { data: configuredCatories, ...SWRProperties } = useSWR(
    enableDemoData ? null : resource,
    () =>
      fetch.get<NormalizationCategories[]>(resource).then(({ data }) => data),
  );
  console.log(`configuredCatories ==>`, configuredCatories);

  return {
    configuredCatories,
    missingCategories: enableDemoData
      ? []
      : getMissingNormalizationCategories(configuredCatories),
    ...SWRProperties,
  };
}
