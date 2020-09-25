import CodeSmellCreator from '../CodeSmellCreator';
import LargeClass from './LargeClass';

export default class LargeClassCreator extends CodeSmellCreator {
  protected factoryMethod(): LargeClass {
    return new LargeClass(this.formattedCodeSectionWithSmell);
  }
}
