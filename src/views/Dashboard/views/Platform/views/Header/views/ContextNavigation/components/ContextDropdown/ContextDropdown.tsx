import { MockContextId } from 'core/api/ApiClient/MockData/MockData';
import { BaseDropdown } from 'components/UI/FluentUI/BaseDropdown/BaseDropdown';
import OptionWithSampleDataLabel from './components/OptionWithSampleDataLabel.tsx/OptionWithSampleDataLabel';
import { CSSProperties } from 'react';

export type Option = {
  key: string;
  text: string;
};

interface Props {
  label: string;
  options: Option[];
  onChange(selectedKey?: string): void;
  selectedKey?: string;
  disabled?: boolean;
  addAllOption: boolean;
  style?: CSSProperties;
}

const ContextDropdown = ({
  label,
  options,
  onChange,
  selectedKey,
  disabled,
  addAllOption,
  style,
}: Props) => {
  const onContextChange = (selectedKeys: string[]): void => {
    if (!selectedKeys.length) {
      onChange(undefined);
    } else {
      onChange(selectedKeys[0]);
    }
  };

  const extendedOptions = addAllOption ? [{ key: '', text: 'All' }, ...options] : options;
  const optionsWithDemoDataFlag = extendedOptions.map((o) => ({
    ...o,
    data: { isDemoData: MockContextId.includes(o.key) },
  }));

  const selectedItem = selectedKey ?? '_';

  return (
    <BaseDropdown
      disabled={disabled || false}
      className={disabled ? 'context-disabled' : ''}
      label={label}
      placeholder={'All'}
      options={optionsWithDemoDataFlag}
      selectedKeys={[selectedItem]}
      onSelectionChange={onContextChange}
      multiSelect={false}
      style={style}
      onRenderOption={OptionWithSampleDataLabel}
    />
  );
};

export default ContextDropdown;
