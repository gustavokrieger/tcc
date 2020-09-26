import CodeSmellCreator from '../CodeSmellCreator';
import LargeClass from './LargeClass';
import FormattedJavaCode from '../FormattedJavaCode';
import ClassTokenizer from '../tokenizers/ClassTokenizer';

export default class LargeClassCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedJavaCode: FormattedJavaCode
  ): ClassTokenizer {
    return new ClassTokenizer(formattedJavaCode);
  }

  protected makeCodeSmell(javaCodeTokenizer: ClassTokenizer): LargeClass {
    return new LargeClass(javaCodeTokenizer);
  }
}
