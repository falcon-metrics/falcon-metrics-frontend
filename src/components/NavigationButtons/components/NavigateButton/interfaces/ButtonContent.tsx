import { ReactNode } from 'react';

import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

type ButtonContent = {
  content: ReactNode;
  icon?: ReactNode;
};

export enum ButtonTypes {
  back = 'back',
  next = 'next',
  save = 'save',
}
export const buttonTypes: Record<ButtonTypes, ButtonContent> = {
  back: { content: 'Back', icon: <ArrowBack /> },
  next: { content: 'Next', icon: <ArrowForwardIcon /> },
  save: { content: 'Save' },
};
