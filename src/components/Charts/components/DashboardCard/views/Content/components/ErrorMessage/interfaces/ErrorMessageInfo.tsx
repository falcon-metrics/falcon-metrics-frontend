import ZeroState from 'components/ZeroState';
import { ReactNode } from 'react';
import { Props } from '../../../Content';

class ErrorMessageInfo {
  constructor(
    private errorContent: ReactNode,
    private condition: boolean | ((props?: Props) => boolean),
  ) {}

  isActive = (props: Props) =>
    typeof this.condition === 'boolean'
      ? this.condition
      : this.condition(props);

  get content() {
    return typeof this.errorContent === 'string' ? (
      <ZeroState message={this.errorContent} />
    ) : (
      this.errorContent
    );
  }
}

export default ErrorMessageInfo;
