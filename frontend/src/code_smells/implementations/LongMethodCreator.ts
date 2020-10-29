import CodeSmellCreator from '../CodeSmellCreator';
import LongMethod from './LongMethod';
import MethodSignatureTokenizer from '../tokenizers/MethodSignatureTokenizer';
import FormattedDeclaration from '../formatted_code/FormattedDeclaration';

export default class LongMethodCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedDeclaration: FormattedDeclaration
  ): MethodSignatureTokenizer {
    return new MethodSignatureTokenizer(formattedDeclaration);
  }

  protected makeCodeSmell(
    methodSignatureTokenizer: MethodSignatureTokenizer
  ): LongMethod {
    return new LongMethod(methodSignatureTokenizer);
  }
}
