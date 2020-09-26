import CodeSmellCreator from '../CodeSmellCreator';
import DataClass from './DataClass';
import ClassTokenizer from '../tokenizers/ClassTokenizer';
import FormattedJavaCode from '../FormattedJavaCode';

export default class DataClassCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedJavaCode: FormattedJavaCode
  ): ClassTokenizer {
    return new ClassTokenizer(formattedJavaCode);
  }

  protected makeCodeSmell(javaCodeTokenizer: ClassTokenizer): DataClass {
    return new DataClass(javaCodeTokenizer);
  }
}
