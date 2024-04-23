import { Component } from 'react';

import { BaseDropdown } from 'components/UI/FluentUI/BaseDropdown';

import { IDropdownStyles } from '@fluentui/react';

export type Option = {
  key: string;
  text: string;
};

interface Props {
  label: string;
  options: Array<Option>;
  onContextChange(selectedKey?: string): void;
  selectedKey?: string;
  placeholder?: string;
  customDropdownStyles?: any;
  headerKeys?: string[],
  truncateLength?: number;
}

class IterationDropdown extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onContextChange = this.onContextChange.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.selectedKey !== this.props.selectedKey) {
      this.onContextChange([this.props.selectedKey || '_']);
    }
  }

  onContextChange(selectedKeys: string[]): void {
    const selectedKey = selectedKeys[0] === '_' ? undefined : selectedKeys[0];
    if (!this.props.onContextChange) {
      console.warn('Could not raise dropdown selection to parent due to missing props');
    } else {
      this.props.onContextChange(selectedKey);
    }
  }

  truncateText(text?: string) {
    const truncateLength = this.props?.truncateLength || 60;
    return text && text?.length > truncateLength ? `${text.slice(0, truncateLength)}...` : text;
  }

  render(): React.ReactNode {
    const selectedItem = this.props.selectedKey ?? '_';

    const placeholder = this.props?.placeholder || 'Loading...';

    const dropdownStyles: Partial<IDropdownStyles> = {
      dropdown: this.props.customDropdownStyles ?? { width: 340 },
    };

    return (
      <BaseDropdown
        label={this.props.label}
        options={this.props.options}
        selectedKeys={[selectedItem]}
        onSelectionChange={this.onContextChange}
        multiSelect={false}
        placeholder={placeholder}
        style={dropdownStyles}
        onRenderOption={(option: any) => {
          if (this.props?.headerKeys?.includes(option?.key)) {
            return (
              <span
                title={option?.text}
                  style={{
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgb(0, 120, 212)',
                  background: 'none transparent',
                  border: 'none',
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                {this.truncateText(option?.text)}
              </span>
            );
          }
          return (
            <span title={option?.text}>
              {this.truncateText(option?.text)}
            </span>
          );
        }}
      />
    );
  }
}

export default IterationDropdown;
