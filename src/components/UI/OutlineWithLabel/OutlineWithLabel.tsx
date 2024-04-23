import { ReactNode } from 'react';
import { Fieldset, Legend, Span } from './OutlineWithLabel.styles';

type Props = {
  label: string;
  children: ReactNode;
};

const OutlineWithLabel = ({ children, label }: Props) => {
  return (
    <Fieldset>
      <Legend>
        <Span>{`  ${label}  `} </Span>
      </Legend>
      {children}
    </Fieldset>
  );
};

export default OutlineWithLabel;
