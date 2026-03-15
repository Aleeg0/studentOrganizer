import * as SecureStore from "expo-secure-store";
import {
  getReactNativePersistence,
  initializeAuth,
  ReactNativeAsyncStorage,
} from "firebase/auth";
import { app } from "./firebaseConfig";

const safeKey = (rawKey: string) => rawKey.replace(/[^A-Za-z0-9._-]/g, "_");

const authPersistAdapter: ReactNativeAsyncStorage = {
  getItem: async (key) => await SecureStore.getItemAsync(safeKey(key)),
  setItem: async (key, value) =>
    await SecureStore.setItemAsync(safeKey(key), value),
  removeItem: async (key) => SecureStore.deleteItemAsync(safeKey(key)),
};

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(authPersistAdapter),
});
