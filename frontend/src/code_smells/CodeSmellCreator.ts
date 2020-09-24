import CodeSmell from './CodeSmell';

export default abstract class CodeSmellCreator {
  private _codeSectionWithSmell: string;

  constructor(codeSectionWithSmell: string) {
    this._codeSectionWithSmell = codeSectionWithSmell;
  }

  protected get codeSectionWithSmell(): string {
    return this._codeSectionWithSmell;
  }

  protected set codeSectionWithSmell(value: string) {
    this._codeSectionWithSmell = value;
  }

  create(): CodeSmell {
    this.formatCode();
    return this.factoryMethod();
  }

  protected formatCode() {
    this._codeSectionWithSmell = this._codeSectionWithSmell.trim();
    this.replaceCodeWhitespacesWithOneSpace();
  }

  private replaceCodeWhitespacesWithOneSpace() {
    this._codeSectionWithSmell = this._codeSectionWithSmell.replace(
      /\s+/g,
      ' '
    );
  }

  protected abstract factoryMethod(): CodeSmell;
}
