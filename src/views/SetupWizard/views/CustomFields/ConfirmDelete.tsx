import { useConfirm } from 'material-ui-confirm';

import Typography from '@material-ui/core/Typography';

function useConfirmDelete(
  fullList: { id: string; displayName: string }[],
  entityDisplayName,
) {
  const confirm = useConfirm();
  return async (newListOfSelectedIds: string[]) => {
    const removedIds = fullList
      .filter(({ id }) => !newListOfSelectedIds.includes(id))
      .map(({ id }) => id);
    if (!removedIds.length) {
      return true;
    }
    return confirm({
      title: 'Warning: This action cannot be undone!',
      description: (
        <>
          <Typography>
            This action will remove all data belonging to the following{' '}
            {entityDisplayName}:
          </Typography>
          <u>
            {fullList
              .filter((i) => removedIds.includes(i.id))
              .map(({ id, displayName }) => (
                <li key={id}>{displayName}</li>
              ))}
          </u>
        </>
      ),
      cancellationText: `No, keep ${entityDisplayName}`,
      confirmationText: `Yes, delete ${entityDisplayName}`,
    });
  };
}

export default useConfirmDelete;
