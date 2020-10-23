import CodeSmellCreator from '../CodeSmellCreator';
import DataClass from './DataClass';
import ClassTokenizer from '../tokenizers/ClassTokenizer';
import FormattedSignature from '../formatted_code/FormattedSignature';

export default class DataClassCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedSignature: FormattedSignature
  ): ClassTokenizer {
    return new ClassTokenizer(formattedSignature);
  }

  protected makeCodeSmell(classTokenizer: ClassTokenizer): DataClass {
    return new DataClass(classTokenizer);
  }
}
