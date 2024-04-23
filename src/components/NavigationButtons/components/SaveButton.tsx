import Button, { ButtonProps } from '@material-ui/core/Button';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

export type Props = {
  isSubmitting: boolean;
  defaultText?: string;
  submittingText?: string;
} & ButtonProps;

const SaveButton = ({
  isSubmitting,
  defaultText = 'Save',
  submittingText = 'Saving...',
  ...props
}: Props) => {
  return (
    <Button
      size="large"
      variant="contained"
      color="primary"
      type={props.onClick ? 'button' : 'submit'}
      data-cy="navigation-button-save"
      startIcon={isSubmitting && <HourglassEmptyIcon />}
      disabled={isSubmitting}
      {...props}
    >
      {!isSubmitting ? defaultText : submittingText}
    </Button>
  );
};

export default SaveButton;
