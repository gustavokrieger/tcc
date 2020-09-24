import CodeSmellCreator from './CodeSmellCreator';
import LongMethod from './LongMethod';

export default class LongMethodCreator extends CodeSmellCreator {
  protected factoryMethod(): LongMethod {
    return new LongMethod(this.codeSectionWithSmell);
  }
}
