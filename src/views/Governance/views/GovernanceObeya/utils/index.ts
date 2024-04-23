import { DateTime } from 'luxon';
import sum from 'lodash/sum';
import { BoardItem } from 'hooks/fetch/useProgress';
import { ObeyaRatingColors } from 'views/Governance/utils/constants';

export const getPercentValuesForBoads = (
  completed = 0,
  inProgress = 0,
  proposed = 0,
) => {
  const total = sum([completed, inProgress, proposed]);
  const completedPercent =
    completed && total ? Math.round((completed / total) * 100) : 0;
  const inProgressPercent =
    inProgress && total ? Math.round((inProgress / total) * 100) : 0;
  const proposedPercent =
    proposed && total ? Math.round((proposed / total) * 100) : 0;
  return {
    completedPercent,
    inProgressPercent,
    proposedPercent,
    total,
  };
};

export const formatBoardWithTotal = (fieldKey) => ({
  completed,
  inProgress,
  proposed,
  ...rest
}: BoardItem) => {
  const currentFieldValue = rest[fieldKey];
  return {
    [fieldKey]: currentFieldValue,
    completed,
    inProgress,
    proposed,
    completedCount: completed,
    total: completed + inProgress + proposed,
  };
};

export const defaultHorizontalBarConfig = {
  plot: {
    valueBox: {
      text: '%vt%',
      rules: [
        {
          rule: '%v === 0',
          text: '',
        },
        {
          rule: '%v === 100',
          text: '100%',
        },
      ],
      placement: 'middle',
      color: '#fff',
      fontWeight: 'normal',
      shadow: 10,
      fontSize: 13,
      fontFamily: 'Open Sans',
    },
  },
};

export const ratingConfig: {
  [ratingId: string]: {
    text: string;
    color?: string;
    name?: string;
  };
} = {
  '1': {
    text: 'On Track',
    color: ObeyaRatingColors.ON_TRACK,
    name: 'ontrack',
  },
  '2': {
    text: 'Behind',
    color: ObeyaRatingColors.BEHIND,
    name: 'behind',
  },
  '3': {
    text: 'At Risk',
    color: ObeyaRatingColors.AT_RISK,
    name: 'atrisk',
  },
  '4': {
    text: 'Not Rated',
    color: ObeyaRatingColors.NOT_RATED,
    name: 'notrated',
  },
};

export type OKRObjective = {
  orgId?: string;
  roomId?: string;
  objectiveId?: string;
  objectiveDescription?: string;
  ratingId?: string;
  ratingDescription?: string;
  createdAt?: Date;
  keyResults?: Array<OKRKeyResult>;
  achieved?: boolean;
  contextId?: string;
  initiativeId?: string;
  relationshipCount?: string | number;
};

export type OKRKeyResult = {
  achieved?: boolean;
  //orgId?: string;
  //obeyaRoomId?: string;
  objectiveId?: string;
  keyResultId?: string;
  keyResultDescription?: string;
  completed?: boolean;
  parentWorkItemId?: string;
  parentWorkItemTitle?: string;
  datasourceId?: string;
  ratingId?: string;
  ratingDescription?: string;
  numberOfItemsCompleted?: number;
  numberOfItemsInProgress?: number;
  numberOfItemsProposed?: number;
  includeChildren?: boolean;
  includeRelated?: boolean;
  createdAt?: Date;
  childItemLevel?: number;
  linkTypes?: string[];
  initiativeId?: string;
  initiativeTitle?: string;
  relationshipCount?: string | number;
};

export type ObeyaRoom = {
  orgId?: string;
  filterId?: string;
  datasourceId?: string;
  obeyaRoomId?: string;
  contextId?: string;
  iterationName?: string;
  beginDate?: DateTime;
  endDate?: DateTime;
};