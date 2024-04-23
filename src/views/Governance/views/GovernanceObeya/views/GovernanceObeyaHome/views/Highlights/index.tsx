import { useMemo } from 'react';

import { ObeyaRatingColors } from 'views/Governance/utils/constants';
import {
  OKRObjective,
  ratingConfig,
} from 'views/Governance/views/GovernanceObeya/utils';

import Highlights from './Highlights';

export const defaultRatingSeriesValues: {
  backgroundColor: string;
  name: string;
  text: string;
  values: any[];
  color?: string;
}[] = [
    {
      backgroundColor: ObeyaRatingColors.ON_TRACK,
      name: 'onTrack',
      text: 'OnTrack',
      values: [0],
    },
    {
      backgroundColor: ObeyaRatingColors.BEHIND,
      color: ObeyaRatingColors.BEHIND,
      name: 'behind',
      text: 'Behind',
      values: [0],
    },
    {
      backgroundColor: ObeyaRatingColors.AT_RISK,
      text: 'At Risk',
      name: 'atrisk',
      values: [0],
    },
    {
      backgroundColor: '#efefef',
      color: ObeyaRatingColors.NOT_RATED,
      text: 'Not Rated',
      name: 'notRated',
      values: [0],
    },
  ];

export const getRatingSeriesAndKeyResultsCount = (obeyaOKRs: any = []) => {
  return obeyaOKRs.reduce(
    (
      acc: { ratingSeries: RatingSeries; keyResultsCount: number; },
      okr: OKRObjective,
    ) => {
      const { ratingId } = okr;
      if (ratingId && !acc.ratingSeries?.[ratingId]?.values?.length) {
        acc.ratingSeries[ratingId].values = [1];
      } else if (ratingId && acc.ratingSeries?.[ratingId]?.values?.length) {
        acc.ratingSeries[ratingId].values = [
          acc.ratingSeries[ratingId].values[0] + 1,
        ];
      } else if (
        ratingId &&
        acc.ratingSeries?.[ratingId]?.values.length === 0
      ) {
        acc.ratingSeries[ratingId].values = [0];
      }
      acc.keyResultsCount =
        acc?.keyResultsCount + (okr.keyResults?.length || 0);
      return acc;
    },
    {
      ratingSeries: {
        '1': {
          ...ratingConfig['1'],
          backgroundColor: ratingConfig['1'].color,
          values: [0],
        },
        '2': {
          values: [0],
          ...ratingConfig['2'],
          backgroundColor: ratingConfig['2'].color,
        },
        '3': {
          values: [0],
          ...ratingConfig['3'],
          backgroundColor: ratingConfig['3'].color,
        },
        '4': {
          values: [0],
          ...ratingConfig['4'],
          backgroundColor: ratingConfig['4'].color,
        },
      },
      keyResultsCount: 0,
    },
  );
};

interface Props {
  obeyaRoomId?: string;
  activeRoom?: any;
  highlights: any;
  objectives: any;
  progressBoards: any;
}

export type RatingSeries = {
  [ratingId: string]: {
    text: string;
    color?: string;
    backgroundColor?: string;
    values: number[] | [];
  };
};

const HighlightsContainer = ({
  highlights,
  objectives,
  progressBoards,
  activeRoom }: Props) => {
  const progressValues =
    progressBoards && progressBoards?.[0]
      ? progressBoards[0]
      : { completed: 0, inProgress: 0, proposed: 0 };

  const { ratingSeries, keyResultsCount } = useMemo(
    () => getRatingSeriesAndKeyResultsCount(objectives),
    [objectives],
  );

  return (
    <Highlights
      scopeData={highlights}
      activeRoom={activeRoom}
      ratingSeries={ratingSeries}
      objectivesCount={objectives?.length}
      keyResultsCount={keyResultsCount}
      completedCount={progressValues.completed}
      remainingCount={progressValues.inProgress + progressValues.proposed}
      progressValues={{
        completed: progressValues.completed,
        inProgress: progressValues.inProgress,
        proposed: progressValues.proposed,
      }}
    />
  );
};

export default HighlightsContainer;
