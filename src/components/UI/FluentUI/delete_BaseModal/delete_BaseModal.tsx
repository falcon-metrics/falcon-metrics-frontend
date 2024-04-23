export default null;

/**
 * @deprecated
 * 
 * Not in use; Migrated from FluentUI to MUI
 */

// import * as React from 'react';

// import {
//   getTheme,
//   mergeStyleSets,
//   FontWeights,
//   Modal,
//   IconButton,
//   IIconProps,
// } from '@fluentui/react';
// import { Component } from 'react';

// interface Props {
//   widgetType: any;
//   widgetProps: any;
//   fullScreenStyles?: any;
//   renderIcon?(any): any;
// }

// interface State {
//   isModalOpen: boolean;
// }

// const theme = getTheme();
// const contentStyles = mergeStyleSets({
//   container: {
//     display: 'flex',
//     flexFlow: 'column nowrap',
//     alignItems: 'stretch',
//     flexDirection: 'row',
//     minHeight: '86vh',
//     width: '86%',
//     borderRadius: '8px',
//   },
//   header: [
//     theme.fonts.xLargePlus,
//     {
//       flex: '1 1 auto',
//       //borderTop: `4px solid ${theme.palette.themePrimary}`,
//       color: theme.palette.neutralPrimary,
//       display: 'flex',
//       alignItems: 'center',
//       fontWeight: FontWeights.semibold,
//       padding: '0 0 12px 24px',
//     },
//   ],
//   body: {
//     //flex: '4 4 auto',
//     padding: '0 24px 24px 24px',
//     overflowY: 'hidden',
//     selectors: {
//       p: { margin: '14px 0' },
//       'p:first-child': { marginTop: 0 },
//       'p:last-child': { marginBottom: 0 },
//     },
//   },
// });

// const cancelIcon: IIconProps = { iconName: 'Cancel' };
// const iconButtonStyles = {
//   root: {
//     color: theme.palette.neutralPrimary,
//     marginLeft: 'auto',
//     marginTop: '2px',
//     float: 'right',
//     //marginRight: '2px',
//   },
//   rootHovered: {
//     color: theme.palette.neutralDark,
//   },
// };

// class FluentUIModal extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);

//     this.showModal = this.showModal.bind(this);
//     this.hideModal = this.hideModal.bind(this);

//     this.state = {
//       isModalOpen: false,
//     };
//   }

//   hideModal() {
//     this.setState({ isModalOpen: false });
//   }

//   showModal() {
//     this.setState({ isModalOpen: true });
//   }

//   render() {
//     const newProps = {
//       ...this.props.widgetProps,
//     };

//     const titleId: string = 'modal-' + this.props.widgetType;

//     const customFullScreen = this.props.fullScreenStyles || {};

//     return (
//       <div className="widget-expand-icon">
//         {!this.state.isModalOpen &&
//           this.props?.renderIcon?.({
//             titleId,
//             customFullScreen,
//             showModal: this.showModal,
//           })}
//         <Modal
//           titleAriaId={titleId}
//           isOpen={this.state.isModalOpen}
//           onDismiss={this.hideModal}
//           isBlocking={false}
//           containerClassName={contentStyles.container}
//         >
//           <div className={contentStyles.header}>
//             <IconButton
//               styles={iconButtonStyles}
//               iconProps={cancelIcon}
//               ariaLabel="Close popup modal"
//               onClick={this.hideModal}
//             />
//           </div>
//           <div className={contentStyles.body}>
//             {React.createElement(this.props.widgetType, newProps)}
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default FluentUIModal;
