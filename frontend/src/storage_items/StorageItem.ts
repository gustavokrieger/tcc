// This generic type is a workaround for string enums.
export default class StorageItem<T extends string> {
  private readonly storage: Storage;
  private readonly key: string;
  private readonly defaultValue: T;

  constructor(storage: Storage, key: string, defaultValue: T) {
    this.storage = storage;
    this.key = key;
    this.defaultValue = defaultValue;
  }

  getCurrentOrDefault(): T {
    const current = this.getCurrent();
    if (current === null) {
      return this.defaultValue;
    }
    return current as T;
  }

  private getCurrent(): string | null {
    return this.storage.getItem(this.key);
  }

  setValue(value: T) {
    this.storage.setItem(this.key, value);
  }

  currentOrDefaultIs(value: T) {
    return this.getCurrentOrDefault() === value;
  }
}
