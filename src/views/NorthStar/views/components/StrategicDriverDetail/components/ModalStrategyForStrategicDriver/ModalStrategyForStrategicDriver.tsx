import BaseModal from '../../../../../../../components/UI/BaseModal/BaseModal2';
import Box from '@material-ui/core/Box';

const ModalStrategyForStrategicDriver = ({
  isOpenModal,
  setOpenModal,
  children,
  strategyName,
}: any) => {
  return (
    <>
      <BaseModal
        maxWidth="md"
        open={isOpenModal}
        setOpen={setOpenModal}
        title={<b style={{ fontSize: 24 }}>Strategic Driver for {strategyName}</b>}
        disableBackdropClick
        disableEscKeyDown
      >
        <Box width="100%">
          {children}
        </Box>
      </BaseModal>
    </>
  );
};

export default ModalStrategyForStrategicDriver;
