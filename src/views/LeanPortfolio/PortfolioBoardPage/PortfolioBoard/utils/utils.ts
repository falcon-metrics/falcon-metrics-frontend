export function mergeValues(data: any) {
  let allRoomIds: number[] = [];

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const element = data[key];
      for (const room of element.roomIds) {
        room.columnId = key; // Update the columnId field for each room
      }
      allRoomIds = allRoomIds.concat(element.roomIds);
    }
  }

  return allRoomIds;
}

export function updateRoomIdsOrder(data: any) {
  const { columns } = data;

  Object.keys(columns).forEach((columnId) => {
    const roomIds = columns[columnId].roomIds;

    if (!roomIds || roomIds.length === 0) {
      return;
    }

    roomIds.forEach((room, index) => {
      room.order = index + 1;
    });
  });

  return data;
}
