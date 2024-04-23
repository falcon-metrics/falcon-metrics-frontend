import Grid from '@material-ui/core/Grid';
import SaveButton, { Props as SaveButtonProps } from './components/SaveButton';
import NavigateButton, {
  ButtonTypes,
  NavigateButtonProps,
} from './components/NavigateButton';

export interface Props {
  isSubmitting: boolean;
  isDirty?: boolean;
  backPath?: string;
  nextPath?: string;
  shouldShowSingleButtonForSaveAndNext?: boolean;
  backButtonProps?: Partial<NavigateButtonProps>;
  saveButtonProps?: Partial<SaveButtonProps>;
  nextButtonProps?: Partial<NavigateButtonProps>;
}

const NavigationButtons = ({
  backPath,
  nextPath,
  isSubmitting,
  isDirty,
  shouldShowSingleButtonForSaveAndNext,
  backButtonProps,
  saveButtonProps,
  nextButtonProps,
}: Props) => {
  const buttonWidth = shouldShowSingleButtonForSaveAndNext ? 5 : 3;

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item xs={buttonWidth}>
        {backPath && (
          <NavigateButton
            fullWidth
            disabled={isSubmitting}
            buttonType={ButtonTypes.back}
            path={backPath}
            shouldRequestConfirmation={isDirty}
            {...backButtonProps}
          />
        )}
      </Grid>
      <Grid
        item
        xs={buttonWidth}
        container
        direction="row"
        // justifyContent="flex-end"
      >
        <SaveButton
          fullWidth
          isSubmitting={isSubmitting}
          defaultText={
            shouldShowSingleButtonForSaveAndNext ? 'Next' : undefined
          }
          {...saveButtonProps}
        />
      </Grid>
      {!shouldShowSingleButtonForSaveAndNext && (
        <Grid item xs={buttonWidth}>
          {nextPath && (
            <NavigateButton
              fullWidth
              buttonType={ButtonTypes.next}
              disabled={isSubmitting}
              path={nextPath}
              shouldRequestConfirmation={isDirty}
              {...nextButtonProps}
            />
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default NavigationButtons;
