import BaseModal from '../../../../../../../../../components/UI/BaseModal/BaseModal2';
import { WrapperContent } from './ModalStrategicHorizon.styles';
import StrategicsHorizonForm from '../StrategicsHorizonForm';

const ModalStrategicHorizon = ({
  isOpenModalStrategic, setOpenModalStrategic,
  onSubmitStrategicDrivers, horizonInfoToEdit
}: any) => {
  return (
    <>
      <BaseModal
        maxWidth="sm"
        open={isOpenModalStrategic}
        setOpen={setOpenModalStrategic}
        title={<b>Strategy Horizons</b>}
      >
        <WrapperContent>
          <StrategicsHorizonForm
            horizonInfoToEdit={horizonInfoToEdit}
            onSubmitStrategicDrivers={onSubmitStrategicDrivers}
          />
        </WrapperContent>
      </BaseModal>
    </>
  );
};

export default ModalStrategicHorizon;
