import { useState } from 'react';
import Box from '@material-ui/core/Box';
import { ProgressBars } from './ProgressBars';
import ZeroState from 'components/ZeroState';
import { BoardItem } from 'hooks/fetch/useProgress';
import { styled } from '@material-ui/styles';

enum TABS {
  PEOPLE = 'individualContributors',
  PROGRESS = 'progressBoards',
};

export type FormValues = {
  search: string;
};

const Wrapper = styled(Box)({
  width: '100%',
  minHeight: 150,
  maxHeight: 240,
  overflowY: 'auto',
  "&::-webkit-scrollbar": {
    width: "0.7em",
    backgroundColor: "#f0f0f0",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d1d2d3",
    borderRadius: "10px",
  },
});

interface Props {
  modalOpen?: boolean;
  boards?: BoardItem[];
  onChangeTab?: (boardType) => void;
  activeTab?: TABS;
  loading?: boolean;
};

const Progress = ({
  boards = [],
  activeTab,
  loading,
}: Props) => {
  const [isModalOpen] = useState<boolean>(false);

  const boardKey = activeTab === TABS.PROGRESS ? 'boardName' : 'assignedTo';

  return (
    <Wrapper>
      {!boards?.length && !loading ? (
        <ZeroState message="No boards" />
      ) : (
        <ProgressBars
          boards={boards || []}
          activeTab={TABS.PROGRESS}
          loading={loading}
          boardKey={boardKey}
          isModalOpen={isModalOpen}
        />
      )}
    </Wrapper>
  );
};

export default Progress;
