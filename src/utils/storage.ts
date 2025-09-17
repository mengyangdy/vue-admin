import { createStorage, createLocalforage } from "@dylanjs/utils";

const storagePrefix = import.meta.env.VITE_STORAGE_PREFIX || "";

export const localStg = createStorage("local", storagePrefix);

export const sessionStg = createStorage("session", storagePrefix);

export const localForage = createLocalforage("local");
