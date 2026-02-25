import { createMMKV } from "react-native-mmkv";

const mmkvInstance = createMMKV();

export class BasicStorage<T> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  set(value: T): void {
    if (value === undefined || value === null) {
      this.remove();
      return;
    }

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      mmkvInstance.set(this.key, value);
    } else {
      const jsonValue = JSON.stringify(value);
      mmkvInstance.set(this.key, jsonValue);
    }
  }

  get(): T | null {
    if (!mmkvInstance.contains(this.key)) {
      return null;
    }

    const valueStr = mmkvInstance.getString(this.key);
    if (!valueStr) return null;

    try {
      if (valueStr.startsWith("{") || valueStr.startsWith("[")) {
        return JSON.parse(valueStr) as T;
      }

      if (valueStr === "true") return true as unknown as T;
      if (valueStr === "false") return false as unknown as T;

      const num = Number(valueStr);
      if (!isNaN(num) && valueStr.trim() !== "") {
        return valueStr as unknown as T;
      }

      return valueStr as unknown as T;
    } catch {
      return valueStr as unknown as T;
    }
  }

  remove(): void {
    mmkvInstance.remove(this.key);
  }
}
