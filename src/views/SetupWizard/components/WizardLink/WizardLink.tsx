import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { useWizardContext } from 'views/SetupWizard/contexts/useWizardContext';
import useEditConfirm from 'views/SetupWizard/hooks/useEditConfirm';

type Props = {
  url: string;
  label?: string;
};

const WizardLink = ({ url, label }: Props) => {
  const { isSubmitting, isDirty } = useWizardContext();
  const { navigate } = useEditConfirm();

  return (
    <>
      {url && !isSubmitting ? (
        <Link
          component={Box}
          onClick={() => navigate(url, isDirty)}
          style={{ cursor: 'pointer' }}
        >
          {label}
        </Link>
      ) : (
        label
      )}
    </>
  );
};

export default WizardLink;
