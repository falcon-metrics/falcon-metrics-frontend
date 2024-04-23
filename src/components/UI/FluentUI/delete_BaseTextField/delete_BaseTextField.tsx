export default null;

/**
 * @deprecated
 * 
 * Not in use. Use MaterialUI TextField
 */

// import { TextField } from '@fluentui/react';
// import { Component } from 'react';

// interface Props {
//   label: string;
//   value?: string;
//   /*options: IdropdownItems[];
//   onSelectionChange(selectedKeys: string[]): void;
//   multiSelect: boolean;
//   selectedKeys?: Array<string>;
//   defaultSelectedKeys?: Array<string>;
//   selectedItem?: string;
//   defaultSelectedKey?: string;
//   placeholder?: string;*/
// }

// export class FluentUITextField extends Component<Props> {
//   //static defaultProps = {placeholder: 'All'};

//   /*constructor(props: Props) {
//     super(props);

//     //this.onChangeMultiSelect = this.onChangeMultiSelect.bind(this);
//     //this.onChangeSingleSelect = this.onChangeSingleSelect.bind(this);
//   }*/

//   /*onChangeMultiSelect = (
//     _event: React.FormEvent<HTMLDivElement>,
//     item?: IDropdownOption,
//   ) => {
//     if (item) {
//       const selectedKeys = this.props.selectedKeys ?? [];

//       let keys: string[] = [];

//       keys = item.selected
//         ? [...selectedKeys, item.key as string]
//         : selectedKeys.filter((key: any) => key !== item.key);

//       this.props.onSelectionChange(keys);
//     }
//   };

//   onChangeSingleSelect = (
//     _event: React.FormEvent<HTMLDivElement>,
//     item?: IDropdownOption,
//   ) => {
//     if (item) {
//       this.props.onSelectionChange([item.key as string]);
//     }
//   };*/

//   render() {
//     return (
//       <TextField
//         //placeholder={this.props.placeholder}
//         label={this.props.label}
//         defaultValue={this.props.value}
//       />
//     );
//   }
// }
