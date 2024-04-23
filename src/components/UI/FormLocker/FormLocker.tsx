import { ReactNode } from 'react';

interface Props {
  isLocked: boolean;
  children: ReactNode;
}

function FormLocker({ isLocked, children }: Props) {
  return (
    <fieldset
      disabled={isLocked}
      style={{
        border: 0,
        pointerEvents: isLocked ? 'none' : 'initial',
      }}
    >
      {children}
    </fieldset>
  );
}

export default FormLocker;
