import { useConfirm } from 'material-ui-confirm';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AcceptButton,
  DeclineButton,
  DefaultDescription,
} from '../components/WizardConfirm';

type ConfirmProps = {
  onAccept?(): void;
  onDecline?(): void;
  title?: string;
  description?: string;
  declineText?: string;
  acceptText?: string;
};

export default function useEditConfirm() {
  const confirm = useConfirm();
  const history = useHistory();

  const promptConfirmation = useCallback(
    ({ title, description, declineText, acceptText }: ConfirmProps) =>
      confirm({
        title: title ?? 'Are you sure you want to leave this page?',
        description: <DefaultDescription description={description} />,
        cancellationText: <DeclineButton text={declineText} />,
        confirmationText: <AcceptButton text={acceptText} />,
      }),
    [confirm],
  );

  const confirmLeave = useCallback(
    (isDirty?: boolean) => {
      if (isDirty) {
        return promptConfirmation({});
      }
      return Promise.resolve();
    },
    [promptConfirmation],
  );

  const navigate = (path: string, shouldRequestConfirmation?: boolean) => {
    confirmLeave(shouldRequestConfirmation).then(() => history.push(path));
  };

  return {
    confirmLeave,
    navigate,
  };
}
