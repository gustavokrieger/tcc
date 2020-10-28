import CodeSmellCreator from '../CodeSmellCreator';
import ClassTokenizer from '../tokenizers/ClassTokenizer';
import FormattedSignature from '../formatted_code/FormattedSignature';
import SwitchStatements from './SwitchStatements';

export default class SwitchStatementsCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedSignature: FormattedSignature
  ): ClassTokenizer {
    return new ClassTokenizer(formattedSignature);
  }

  protected makeCodeSmell(classTokenizer: ClassTokenizer): SwitchStatements {
    return new SwitchStatements(classTokenizer);
  }
}
