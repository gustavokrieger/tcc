import CodeSmellCreator from './CodeSmellCreator';
import LongParameterList from './LongParameterList';

export default class LongParameterListCreator extends CodeSmellCreator {
  protected factoryMethod(): LongParameterList {
    return new LongParameterList(this.codeSectionWithSmell);
  }

  protected formatCode() {
    super.formatCode();
    this.removeParentheses();
    this.codeSectionWithSmell = this.codeSectionWithSmell.trim();
  }

  private removeParentheses() {
    this.codeSectionWithSmell = this.codeSectionWithSmell.slice(1, -1);
  }
}
