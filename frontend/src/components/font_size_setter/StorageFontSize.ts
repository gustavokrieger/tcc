import {FontSize} from './FontSize';

export default class StorageFontSize {
  private static readonly key = 'fontSize';

  private constructor() {}

  static getCurrentOrDefault(): FontSize {
    const current = this.getCurrent();
    if (current === null) {
      return FontSize.NORMAL;
    }
    return Number(current) as FontSize;
  }

  private static getCurrent(): string | null {
    return localStorage.getItem(this.key);
  }

  static setValue(value: FontSize) {
    localStorage.setItem(this.key, value.toString());
  }
}
