import BaseModal from '../../../../../../../components/UI/BaseModal/BaseModal2';
import Box from '@material-ui/core/Box';

const ModalStrategicDriverDetail = ({
  isOpenModal,
  setOpenModal,
  children,
  isFormDirty,
}: any) => {
  return (
    <>
      <BaseModal
        maxWidth="md"
        open={isOpenModal}
        setOpen={setOpenModal}
        title={<b>Strategic Driver</b>}
        disableEscKeyDown={!isFormDirty}
        disableBackdropClick
        isFormDirty={isFormDirty}
      >
        <Box width="100%">
          {children}
        </Box>
      </BaseModal>
    </>
  );
};

export default ModalStrategicDriverDetail;
