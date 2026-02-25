import * as SecureStore from "expo-secure-store";

export class SecureStorageItem<T> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  async set(value: T): Promise<void> {
    if (value === undefined || value === null) {
      await this.remove();
      return;
    }

    const stringValue = typeof value === "string" ? value : JSON.stringify(value);

    await SecureStore.setItemAsync(this.key, stringValue, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
  }

  async get(): Promise<T | null> {
    try {
      const item = await SecureStore.getItemAsync(this.key);

      if (!item) return null;

      try {
        return JSON.parse(item) as T;
      } catch {
        return item as unknown as T;
      }
    } catch (error) {
      console.error(`SecureStorage Error [${this.key}]:`, error);
      return null;
    }
  }

  async remove(): Promise<void> {
    await SecureStore.deleteItemAsync(this.key);
  }
}
