import useAuthentication from "hooks/useAuthentication";
import BaseModal from "../../../../../components/UI/BaseModal/BaseModal2";
import { IconButtonWrapper, EditIconWrapper } from "./ModalNorthStar.styles";
import NorthStarForm from "./components/NorthStarForm";
import Box from "@material-ui/core/Box";

const ModalNorthStarPage = ({
  isOpenModalStrategic,
  data,
  isLoadingVisions,
  mutateVisions,
  postVision,
  updateVision,
  shouldHideEditIcon,
  setOpenModal,
  isOpenModal,
  isFormDirty,
  setIsFormDirty,
  setFormModified,
  handleModalClose
}: any) => {
  const openModal = () => {
    setOpenModal(true);
  };

  const { isAdminOrPowerUser } = useAuthentication();
  
  return (
    <>
      {!shouldHideEditIcon && isAdminOrPowerUser ? (
        <IconButtonWrapper aria-label="create" onClick={openModal}>
          <EditIconWrapper />
        </IconButtonWrapper>
      ) : (
        ""
      )}
      <BaseModal
        maxWidth="lg"
        open={isOpenModal || isOpenModalStrategic}
        setOpen={handleModalClose}
        title={<b>North Star</b>}
        disableBackdropClick
        disableEscKeyDown={!isFormDirty}
      >
        <Box
          style={{ padding: "0 20px 0 0" }}
        >
          <NorthStarForm
            afterSuccess={() => setOpenModal(false)}
            data={data}
            isLoadingVisions={isLoadingVisions}
            mutateVisions={mutateVisions}
            postVision={postVision}
            updateVision={updateVision}
            setIsFormDirty={setIsFormDirty}
            setFormModified={setFormModified}
            formDirty={isFormDirty}
          />
        </Box>
      </BaseModal>
    </>
  );
};

export default ModalNorthStarPage;
