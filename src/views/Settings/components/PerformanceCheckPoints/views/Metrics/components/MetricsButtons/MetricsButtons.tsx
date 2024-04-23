import NavigateButton, {
  ButtonTypes,
  NavigateButtonProps,
} from 'components/NavigationButtons/components/NavigateButton';
import SaveButton, {
  Props as SaveButtonProps,
} from 'components/NavigationButtons/components/SaveButton';

import Grid from '@material-ui/core/Grid';

export interface Props {
  isSubmitting: boolean;
  isDirty?: boolean;
  backPath?: string;
  shouldShowSingleButtonForSaveAndNext?: boolean;
  backButtonProps?: Partial<NavigateButtonProps>;
  saveButtonProps?: Partial<SaveButtonProps>;
  onClick: () => void;
}

const MetricsButtons = ({
  onClick,
  backPath,
  isSubmitting,
  isDirty,
  backButtonProps,
  saveButtonProps,
}: Props) => {
  const buttonWidth = 5;

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
        justifyContent="flex-end"
      >
        <SaveButton
          onClick={onClick}
          isSubmitting={isSubmitting}
          defaultText="Save"
          {...saveButtonProps}
        />
      </Grid>
    </Grid>
  );
};

export default MetricsButtons;
