import { memo, useState } from 'react';
import Progress from './Progress';
import { sortByString } from 'utils/string';

interface Props {
  individualContributors: any;
  progressBoards: any;
  isLoadingObeyaData: boolean;
}

export enum TABS {
  PEOPLE = 'individualContributors',
  PROGRESS = 'progressBoards',
}

const ProgressContainer = memo(({
  individualContributors,
  progressBoards,
  isLoadingObeyaData
}: Props) => {
  const [activeTab, setTab] = useState<TABS>(TABS.PROGRESS);


  const formattedData: any =
    activeTab === TABS.PROGRESS
      ? sortByString(
        progressBoards,
        'boardName',
      )
      : sortByString(
        individualContributors,
        'assignedTo',
      );

  return (
    <Progress
      loading={isLoadingObeyaData}
      boards={formattedData}
      onChangeTab={setTab}
      activeTab={activeTab}
    />
  );
});
export default ProgressContainer;
