import StorageItem from './StorageItem';
import {FontSize} from './FontSize';
import {FontFamily} from './FontFamily';
import {BooleanValue} from './BooleanValue';

export default class StorageItemCreator {
  static createFontSize(): StorageItem<FontSize> {
    return new StorageItem<FontSize>(localStorage, 'fontSize', FontSize.MEDIUM);
  }

  static createFontFamily(): StorageItem<FontFamily> {
    return new StorageItem<FontFamily>(
      localStorage,
      'fontFamily',
      FontFamily.ROBOTO
    );
  }

  static createVisitedViolationCase(id: string): StorageItem<BooleanValue> {
    return new StorageItem<BooleanValue>(
      sessionStorage,
      `case-${id}`,
      BooleanValue.FALSE
    );
  }
}
