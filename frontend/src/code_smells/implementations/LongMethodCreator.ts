import CodeSmellCreator from '../CodeSmellCreator';
import LongMethod from './LongMethod';
import FormattedJavaCode from '../FormattedJavaCode';
import MethodTokenizer from '../tokenizers/MethodTokenizer';

export default class LongMethodCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedJavaCode: FormattedJavaCode
  ): MethodTokenizer {
    return new MethodTokenizer(formattedJavaCode);
  }

  protected makeCodeSmell(javaCodeTokenizer: MethodTokenizer): LongMethod {
    return new LongMethod(javaCodeTokenizer);
  }
}
