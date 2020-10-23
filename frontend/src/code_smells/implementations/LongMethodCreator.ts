import CodeSmellCreator from '../CodeSmellCreator';
import LongMethod from './LongMethod';
import FormattedJavaCode from '../FormattedJavaCode';
import MethodSignatureTokenizer from '../tokenizers/MethodSignatureTokenizer';

export default class LongMethodCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedJavaCode: FormattedJavaCode
  ): MethodSignatureTokenizer {
    return new MethodSignatureTokenizer(formattedJavaCode);
  }

  protected makeCodeSmell(
    javaCodeTokenizer: MethodSignatureTokenizer
  ): LongMethod {
    return new LongMethod(javaCodeTokenizer);
  }
}
