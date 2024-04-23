import { useCallback, useMemo } from 'react';
import { ObeyaRooms } from 'core/api/ApiClient/ObeyaGoalsClient';
import Spinner from 'components/UI/Spinner';
import Box from '@material-ui/core/Box';
import { sortByString } from 'utils/string';
import IterationDropdown from '../IterationDropdown';
import { useSendTelemetry } from 'core/api/CustomerTelemetryClient';
import { useHistory } from 'react-router-dom';

interface Props {
  isDataLoading?: boolean;
  onObeyaRoomChange(path?: string): void;
  obeyaRoomsList: ObeyaRooms;
  initialObeyaRoomId: string;
}

const ObeyaRoomsSelect = ({
  obeyaRoomsList,
  onObeyaRoomChange,
  isDataLoading,
  initialObeyaRoomId,
}: Props) => {
  const sendTelemetry = useSendTelemetry();

  const contextOptions = useMemo(
    () =>
      sortByString(
        obeyaRoomsList.map((context) => ({
          key: context.path,
          text: context.displayName,
        })),
        'text',
      ),
    [obeyaRoomsList],
  );
  
  const history = useHistory();
  
  const redirectToObeyaRooms = (obeyaRoomId) => {
    const queryParams = obeyaRoomId ? `?roomId=${obeyaRoomId}` : '';
    history.push(`${queryParams}`);
  };
  
  const onSelectIteration = useCallback(
    (path?: any) => {
      const selectedRoom = contextOptions.find(room => room.key === path);
      if (!selectedRoom) {
        console.warn(`Iteration Dropdown requested an update but the id '${path}' was not found in any of the ${contextOptions.length} options`);
        return;
      }

      onObeyaRoomChange(path);
      redirectToObeyaRooms(selectedRoom.key);

      sendTelemetry(
        'SelectObeyaRoom',
        `Selected RoomName: ${selectedRoom?.text} -> RoomId: ${path}`,
        {page: 'obeya', item: selectedRoom?.text }
      );
    },
    [contextOptions, onObeyaRoomChange],
  );

  return (
    <Box className="context-container">
      <Box className="iteration-selection">
        <IterationDropdown
          label="Obeya Rooms"
          options={contextOptions}
          onContextChange={onSelectIteration}
          selectedKey={initialObeyaRoomId}
        />
        &nbsp;&nbsp;
        <Box width="40">{isDataLoading && <Spinner />}</Box>
      </Box>
    </Box>
  );
};

export default ObeyaRoomsSelect;
