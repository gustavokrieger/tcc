import CodeSmellCreator from '../CodeSmellCreator';
import DataClass from './DataClass';
import ClassTokenizer from '../tokenizers/ClassTokenizer';
import FormattedDeclaration from '../formatted_code/FormattedDeclaration';

export default class DataClassCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedDeclaration: FormattedDeclaration
  ): ClassTokenizer {
    return new ClassTokenizer(formattedDeclaration);
  }

  protected makeCodeSmell(classTokenizer: ClassTokenizer): DataClass {
    return new DataClass(classTokenizer);
  }
}
