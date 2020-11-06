import CodeSmellCreator from '../CodeSmellCreator';
import SwitchStatements from './SwitchStatements';
import FormattedSwitch from '../formatted_code/FormattedSwitch';
import SwitchTokenizer from '../tokenizers/SwitchTokenizer';

export default class SwitchStatementsCreator extends CodeSmellCreator {
  protected makeFormattedJavaCode(): FormattedSwitch {
    return new FormattedSwitch(this.codeSectionWithSmell);
  }

  protected makeJavaCodeTokenizer(
    formattedSwitch: FormattedSwitch
  ): SwitchTokenizer {
    return new SwitchTokenizer(formattedSwitch);
  }

  protected makeCodeSmell(switchTokenizer: SwitchTokenizer): SwitchStatements {
    return new SwitchStatements(switchTokenizer);
  }
}
