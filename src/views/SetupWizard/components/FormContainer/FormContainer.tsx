import { ReactNode } from 'react';

import HelpButton from 'components/HelpButton';
import NavigationButtons from 'components/NavigationButtons';
import useScroll from 'hooks/useScroll';

import Grid from '@material-ui/core/Grid';

import { Container } from './FormContainer.styles';
import useAuthentication, { Roles } from 'hooks/useAuthentication';

export type Props = {
  children: ReactNode;
  formId?: string;
  isDirty?: boolean;
  isSubmitting?: boolean;
  nextPath?: string;
  previousPath?: string;
  shouldHideNextButton?: boolean;
  shouldShowNavigationButtons?: boolean;
  userGuide?: React.ReactNode;
};

const FormContainer = ({
  children,
  formId,
  isDirty = false,
  isSubmitting = false,
  nextPath,
  previousPath,
  shouldHideNextButton = false,
  shouldShowNavigationButtons = true,
  userGuide
}: Props) => {
  const { scrollToUserGuide } = useScroll();
  const auth = useAuthentication();
  const nextAndSaveAreSingleButton = shouldHideNextButton && nextPath;
  const hasNoNext = shouldHideNextButton && !nextPath;

  let saveButtonIsDisabled = (!isDirty && !nextAndSaveAreSingleButton) || isSubmitting;
  // If a user is a demo user, the user has to be a Falcon Metrics Admin
  // to be able to save
  // If the demo user is NOT a Administrator, the user should NOT be able to save
  if (auth.isDemoUser && !auth.isInRole(Roles.Administrator)) {
    saveButtonIsDisabled = true;
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Container data-cy="form-container">
          {children}
          { userGuide && <HelpButton right={-100} top={-32} onClick={scrollToUserGuide} /> }
        </Container>
      </Grid>
      {shouldShowNavigationButtons && (
        <NavigationButtons
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          saveButtonProps={{
            form: formId,
            disabled: saveButtonIsDisabled,
            defaultText: hasNoNext ? 'Save' : undefined,
          }}
          nextPath={nextPath}
          backPath={previousPath}
          shouldShowSingleButtonForSaveAndNext={shouldHideNextButton}
        />
      )}
    </Grid>
  );
};

export default FormContainer;
