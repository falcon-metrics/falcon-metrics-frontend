export default null;

/**
 * @deprecated
 * 
 * Not in use
 */

// import * as React from 'react';
// import { Toggle } from '@fluentui/react';
// import { Component } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
// interface Props {
//   label: string;
//   id: string;
//   defaultChecked?: boolean;
//   inlineLabel?: boolean;
//   onToggleChange(controlId: string, checked?: boolean): void;
//   onText?: string;
//   offText?: string;
// }

// export class FluentUIToggle extends Component<Props> {
//   constructor(props: Props) {
//     super(props);

//     this.onChange = this.onChange.bind(this);
//   }

//   onChange = (id: string) => (
//     event: React.MouseEvent<HTMLElement>,
//     checked?: boolean,
//   ) => {
//     this.props.onToggleChange(id, checked);
//   };

//   render() {
//     return (
//       <Toggle
//         id={this.props.id}
//         label={this.props.label}
//         inlineLabel={this.props.inlineLabel ? this.props.inlineLabel : false}
//         defaultChecked={
//           this.props.defaultChecked ? this.props.defaultChecked : false
//         }
//         onText={this.props.onText || 'Included'}
//         offText={this.props.offText || 'Excluded'}
//         onChange={this.onChange(this.props.id)}
//       />
//     );
//   }
// }
