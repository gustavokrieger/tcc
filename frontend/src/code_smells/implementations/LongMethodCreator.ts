import CodeSmellCreator from '../CodeSmellCreator';
import LongMethod from './LongMethod';
import MethodSignatureTokenizer from '../tokenizers/MethodSignatureTokenizer';
import FormattedSignature from '../formatted_code/FormattedSignature';

export default class LongMethodCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedSignature: FormattedSignature
  ): MethodSignatureTokenizer {
    return new MethodSignatureTokenizer(formattedSignature);
  }

  protected makeCodeSmell(
    methodSignatureTokenizer: MethodSignatureTokenizer
  ): LongMethod {
    return new LongMethod(methodSignatureTokenizer);
  }
}
