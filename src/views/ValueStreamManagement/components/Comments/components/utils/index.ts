import { DateTime } from 'luxon';
import { CommentInfo } from '../../hooks/useComments';

export const sortCommentsByAsc = (comments: CommentInfo[]) => {
  return comments.sort((data1: CommentInfo, data2: CommentInfo): any => { 
    const dateA = DateTime.fromISO(data1.effective_date as string).toSeconds();
    const dateB = DateTime.fromISO(data2.effective_date as string).toSeconds();
    if (dateA === dateB) {
      return 0;
    }
    return dateA - dateB;
  });
};

export const sortCommentsByDesc = (comments) => {
  return comments.sort((data1, data2): any => {
    const dateA = DateTime.fromISO(data1.effective_date as string).toSeconds();
    const dateB = DateTime.fromISO(data2.effective_date as string).toSeconds();
    if (dateB === dateA) {
      return 0;
    }
    return dateB - dateA;
  });
};

