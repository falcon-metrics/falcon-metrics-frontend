import BaseModal from '../../../../../../../../../components/UI/BaseModal/BaseModal2';
import { WrapperContent } from './ModalStrategicsDrivers.styles';
import StrategicsDriversForm from '../StrategicsDriversForm';
import { useState } from 'react';

const ModalStrategicsDrivers = ({
  isOpenModalStrategic, setOpenModalStrategic,
  onSubmitStrategicDrivers, strategicInfoToEdit,
}: any) => {
  const [isFormDirty, setIsFormDirty] = useState(false);
  
  return (
    <>
      <BaseModal
        maxWidth="md"
        open={isOpenModalStrategic}
        setOpen={setOpenModalStrategic}
        title={<b>Strategic Driver</b>}
        disableEscKeyDown={!isFormDirty}
        disableBackdropClick
        isFormDirty={isFormDirty}
      >
        <WrapperContent>
          <StrategicsDriversForm
            strategicInfoToEdit={strategicInfoToEdit}
            onSubmitStrategicDrivers={onSubmitStrategicDrivers}
            setIsFormDirty={setIsFormDirty}
            isFormDirty={isFormDirty}
          />
        </WrapperContent>
      </BaseModal>
    </>
  );
};

export default ModalStrategicsDrivers;
