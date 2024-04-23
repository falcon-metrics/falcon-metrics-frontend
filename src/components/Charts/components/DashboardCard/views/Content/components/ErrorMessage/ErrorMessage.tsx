import { ReactNode } from 'react';
import { Props as ConditionProps } from '../../Content';
import ErrorMessageInfo from './interfaces/ErrorMessageInfo';

type Props = {
  children: ReactNode;
  errorMessagesInfo?: ErrorMessageInfo[];
  conditionArgs: ConditionProps;
};

const ErrorMessage = ({
  children,
  errorMessagesInfo,
  conditionArgs,
}: Props) => {
  const activeErrorMessages =
    errorMessagesInfo?.filter((e) => e.isActive(conditionArgs)) ?? [];
  if (!activeErrorMessages?.length) {
    return <>{children}</>;
  } else {
    const errorContent = activeErrorMessages[0].content;

    return <>{errorContent}</>;
  }
};

export default ErrorMessage;
