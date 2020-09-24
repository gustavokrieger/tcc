import CodeSmellCreator from './CodeSmellCreator';
import DataClass from './DataClass';

export default class DataClassCreator extends CodeSmellCreator {
  protected factoryMethod(): DataClass {
    return new DataClass(this.codeSectionWithSmell);
  }
}
