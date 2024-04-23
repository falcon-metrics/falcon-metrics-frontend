import fetch from 'core/api/fetch';

export const updateHideProductTourOnDatabase = async (
  userId: string,
  hideProductTour: boolean,
) => {
  try {
    await fetch.post('/user-settings', {
      userId,
      hideProductTour,
    });
  } catch (e) {
    console.log('[ERROR]: FIRST ACCESS', e);
  }
};
