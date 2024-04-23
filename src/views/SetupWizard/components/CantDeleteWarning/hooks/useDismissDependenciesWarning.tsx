import { useConfirm } from 'material-ui-confirm';
import CantDeleteWarning, { Dependency } from '..';

export const useDismissDependenciesWarning = (entityDisplayName: string) => {
  const confirm = useConfirm();
  return (dependencies: Dependency[]) =>
    confirm({
      dialogProps: {
        maxWidth: 'lg',
      },
      cancellationButtonProps: { disabled: true },
      title: 'Cannot delete ' + entityDisplayName,
      description: (
        <CantDeleteWarning
          dependencies={dependencies}
          entityDisplayName={entityDisplayName}
        />
      ),
      confirmationText: 'Ok',
    });
};
