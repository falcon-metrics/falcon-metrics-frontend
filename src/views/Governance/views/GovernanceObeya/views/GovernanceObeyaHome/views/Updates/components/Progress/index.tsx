import Progress from './Progress';
import { sortByString } from 'utils/string';
import { useObeya } from 'views/Governance/views/GovernanceObeya/hooks/useObeya';

interface Props {
  obeyaRoomId?: string;
}

export enum TABS {
  PEOPLE = 'individualContributors',
  PROGRESS = 'progressBoards',
}

const ProgressContainer = ({ obeyaRoomId }: Props) => {
  const {
    data: {
      progressBoards,
    },
    isLoadingObeyaData,
  } = useObeya(obeyaRoomId);

  const formattedData = sortByString(
    progressBoards,
    'boardName',
  );

  return (
    <Progress
      loading={isLoadingObeyaData}
      boards={formattedData}
    />
  );
};

export default ProgressContainer;
