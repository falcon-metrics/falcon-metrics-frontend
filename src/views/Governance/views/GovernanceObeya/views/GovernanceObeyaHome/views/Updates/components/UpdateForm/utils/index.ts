import { UpdateItem } from '../../../hooks/useUpdates';
import { v4 as uuidV4 } from 'uuid';

export const getNewUpdate = () => {
  const id = uuidV4();
  const update: UpdateItem = {
    id,
    orgId: '',
    initiativeId: '',
    userId: '',
    username: '',
    feedType: '',
    updateType: '',
    updateMetadata: '',
    updatedAt: '',
    createdAt: '',
    deletedAt: undefined,
    feedImages: '',
    updateText: '',
    name: '',
    parentId: undefined,
    updateNotes: '',
    reactions: '',
    new_id: id,
  };
  return update;
};