import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const isApiSupported = (api: string): boolean =>
  typeof window !== 'undefined' ? api in window : false;

const getSafeJSON = (storage: any, storageKey: string) => {
  try {
    return JSON.parse(storage.getItem(storageKey));
  } catch (e) {
    return null;
  }
};

export enum Storage {
  LOCAL = 'local',
  SESSION = 'session',
}

export const createStorage = (type: Storage) => {
  const storageName = `${type}Storage`;

  if (!isApiSupported(storageName)) {
    console.warn(`${storageName} is not supported`);
  }

  return <T>(
    storageKey: string,
    defaultValue?: any,
  ): {
    storageValue: T;
    set: Dispatch<SetStateAction<T>>;
    get: (key: string) => any;
  } => {
    const storage = (window as any)[storageName];
    const [storageValue, set] = useState<T>(
      getSafeJSON(storage, storageKey) || JSON.stringify(defaultValue),
    );

    useEffect(() => {
      if (storageValue) {
        storage.setItem(storageKey, storageValue);
      }
    }, [storageKey, storageValue]);

    const get = (key: string) => storage.getItem(key);

    return {
      storageValue,
      set,
      get,
    };
  };
};

export const useStorage = createStorage(Storage.LOCAL);

export const useSession = createStorage(Storage.SESSION);
