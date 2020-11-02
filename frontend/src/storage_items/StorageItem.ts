export default class StorageItem<T extends string> {
  private readonly key: string;
  private readonly defaultValue: T;

  constructor(key: string, defaultValue: T) {
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
    return localStorage.getItem(this.key);
  }

  setValue(value: T) {
    localStorage.setItem(this.key, value);
  }
}
