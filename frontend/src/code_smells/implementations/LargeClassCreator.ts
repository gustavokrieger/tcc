import CodeSmellCreator from '../CodeSmellCreator';
import LargeClass from './LargeClass';
import ClassTokenizer from '../tokenizers/ClassTokenizer';
import FormattedSignature from '../formatted_code/FormattedSignature';

export default class LargeClassCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedSignature: FormattedSignature
  ): ClassTokenizer {
    return new ClassTokenizer(formattedSignature);
  }

  protected makeCodeSmell(classTokenizer: ClassTokenizer): LargeClass {
    return new LargeClass(classTokenizer);
  }
}
