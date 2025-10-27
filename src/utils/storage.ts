import { createLocalforage, createStorage } from '@dylanjs/utils';

const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || '';

export const localStg = createStorage<StorageType.Local>('local', storagePrefix);

export const sessionStg = createStorage('session', storagePrefix);

export const localForage = createLocalforage('local');
