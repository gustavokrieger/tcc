import CodeSmellCreator from './CodeSmellCreator';
import LongParameterList from './LongParameterList';

export default class LongParameterListCreator extends CodeSmellCreator {
  protected factoryMethod(): LongParameterList {
    return new LongParameterList(this.formattedCodeSectionWithSmell);
  }

  protected formatCode() {
    super.formatCode();
    this.removeCodeParentheses();
    this.formattedCodeSectionWithSmell = this.formattedCodeSectionWithSmell.trim();
  }

  private removeCodeParentheses() {
    this.formattedCodeSectionWithSmell = this.formattedCodeSectionWithSmell.slice(
      1,
      -1
    );
  }
}
