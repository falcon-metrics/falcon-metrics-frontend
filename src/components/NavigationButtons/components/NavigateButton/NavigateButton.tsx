import { ReactNode } from 'react';

import useEditConfirm from 'views/SetupWizard/hooks/useEditConfirm';

import Button, { ButtonProps } from '@material-ui/core/Button';

import {
  buttonTypes,
  ButtonTypes,
} from './interfaces/ButtonContent';

export type Props = ButtonProps & {
  path: string;
  content?: ReactNode;
  buttonType?: ButtonTypes;
  shouldRequestConfirmation?: boolean;
  onClick?: () => void;
};

const NavigateButton = ({
  path,
  content,
  buttonType,
  startIcon,
  shouldRequestConfirmation,
  onClick,
  ...props
}: Props) => {
  if (buttonType) {
    const buttonContent = buttonTypes[buttonType];
    content = content ?? buttonContent.content;
    startIcon = startIcon ?? buttonContent.icon;
  }

  const { navigate } = useEditConfirm();

  return (
    <Button
      size="large"
      variant="contained"
      type="button"
      startIcon={startIcon}
      onClick={() => onClick ? onClick?.() : navigate(path, shouldRequestConfirmation)}
      data-cy={'navigation-button-' + content}
      {...props}
    >
      {content}
    </Button>
  );
};

export default NavigateButton;
