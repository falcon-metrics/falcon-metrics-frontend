export default null;

/**
 * @deprecated
 * 
 * Not in use; Migrated from FluentUI to MUI
 */

// import Dialog, { DialogProps } from '@material-ui/core/Dialog';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Close from '@material-ui/icons/Close';
// import { ReactNode } from 'react';

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     header: {
//       flex: '1 1 auto',
//       width: '100%',
//       display: 'flex',
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//       marginBottom: -15,
//     },
//     headerNoFlex: {
//       width: '100%',
//       display: 'flex',
//       justifyContent: 'flex-end',
//       alignItems: 'center',
//       marginBottom: -15,
//     },
//     closeButton: {
//       minWidth: 20,
//       height: 35,
//       fontSize: '1.5em',
//       fontWeight: 'lighter',
//     },
//     closeIcon: {
//       color: theme.palette.grey[500],
//     },
//     largeCloseIcon: {
//       height: '1.5em',
//       width: '1.5em'
//     },
//     body: {
//       padding: '0 24px 24px 24px',
//       overflow: 'hidden',
//       width: '70vw',
//       selectors: {
//         p: {
//           margin: '14px 0',
//         },
//         'p:first-child': { marginTop: 0 },
//         'p:last-child': { marginBottom: 0 },
//       },
//     },
//     fullWidth: {
//       width: '100%'
//     }
//   }),
// );

// type Props = {
//   children: ReactNode;
//   isOpen: boolean;
//   onClose: () => void;
// } & Omit<DialogProps, 'open'>;

// /*
// * This is the old modal component. There are still components that uses this.
// * For new features, transition to StyledBaseModal.tsx instead
// */

// const FluentUIModal = ({
//   children,
//   isOpen,
//   onClose,
//   ...dialogProps
// }: Props) => {
//   const classes = useStyles();
//   return (
//     <Dialog open={isOpen} {...dialogProps}>
//       <div className={dialogProps.fullScreen ? classes.headerNoFlex : classes.header}>
//         <Button className={classes.closeButton} onClick={onClose}>
//           <Close className={dialogProps.fullScreen ? classes.closeIcon + " " + classes.largeCloseIcon : classes.closeIcon} />
//         </Button>
//       </div>
//       <div className={dialogProps.fullScreen ? classes.body + " " + classes.fullWidth : classes.body}>{children}</div>
//     </Dialog>
//   );
// };

// export default FluentUIModal;
