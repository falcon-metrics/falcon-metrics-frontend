import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useStyles from './WizardConfirm.styles';

export const DefaultDescription = ({
  description,
}: {
  description?: string;
}) => {
  const styles = useStyles();
  return (
    <Typography
      paragraph
      variant="body1"
      align="left"
      className={styles.description}
    >
      {description || 'You will lose the changes you have made.'}
    </Typography>
  );
};

export const DeclineButton = ({ text }: { text?: string }) => (
  <Button color="primary" autoFocus>
    {text || 'Cancel'}
  </Button>
);

export const AcceptButton = ({ text }: { text?: string }) => (
  <Button color="primary" variant="contained">
    {text || 'Continue without Saving'}
  </Button>
);
