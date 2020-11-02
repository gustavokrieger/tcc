import StorageItem from './StorageItem';
import {FontSize} from './FontSize';
import {FontFamily} from './FontFamily';

export default class StorageItemCreator {
  static createFontSize(): StorageItem<FontSize> {
    return new StorageItem<FontSize>('fontSize', FontSize.MEDIUM);
  }

  static createFontFamily(): StorageItem<FontFamily> {
    return new StorageItem<FontFamily>('fontFamily', FontFamily.ROBOTO);
  }
}
