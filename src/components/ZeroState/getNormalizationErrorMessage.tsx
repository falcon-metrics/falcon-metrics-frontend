import ContactUsLink from 'components/ContactUsLink';
import { ErrorMessageInfo } from 'components/Charts/components/DashboardCard/views/Content/components/ErrorMessage';

import NormalizationCategories, { fixedNormalizationCategoriesDisplayNameRecord } from 'views/SetupWizard/views/Normalization/interfaces/NormalizationCategories';

import ZeroState from '.';

const getNormalizationErrorMessage = (
  relevantCategories: NormalizationCategories[],
  missingCategories?: NormalizationCategories[],
): ErrorMessageInfo => {
  if (!missingCategories) {
    return new ErrorMessageInfo(null, false);
  }
  const relevantMissing = missingCategories.filter((c) =>
    relevantCategories.includes(c),
  );

  const relevantMissingPresentationNames = relevantMissing.map(
    (c) => fixedNormalizationCategoriesDisplayNameRecord[c],
  );
  const missingCategoriesNode =
    relevantMissing.length > 1 ? (
      <>
        :{' '}
        {relevantMissingPresentationNames.map((c) => (
          <>
            <br />- {c}
          </>
        ))}
        <br />
      </>
    ) : (
      ` ${relevantMissingPresentationNames}.`
    );
  return new ErrorMessageInfo(
    (
      <ZeroState
        message={
          <>
            To enable this widget, please configure types of
            {missingCategoriesNode}
            <br />
            <ContactUsLink /> to find out how.
          </>
        }
      />
    ),
    !!relevantMissing.length,
  );
};

export default getNormalizationErrorMessage;
