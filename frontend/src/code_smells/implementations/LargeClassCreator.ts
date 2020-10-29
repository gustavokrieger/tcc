import CodeSmellCreator from '../CodeSmellCreator';
import LargeClass from './LargeClass';
import ClassTokenizer from '../tokenizers/ClassTokenizer';
import FormattedDeclaration from '../formatted_code/FormattedDeclaration';

export default class LargeClassCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedDeclaration: FormattedDeclaration
  ): ClassTokenizer {
    return new ClassTokenizer(formattedDeclaration);
  }

  protected makeCodeSmell(classTokenizer: ClassTokenizer): LargeClass {
    return new LargeClass(classTokenizer);
  }
}
