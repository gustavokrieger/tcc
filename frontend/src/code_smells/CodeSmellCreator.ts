import CodeSmell from './CodeSmell';

export default abstract class CodeSmellCreator {
  private readonly _codeSectionWithSmell: string;
  private _formattedCodeSectionWithSmell = '';

  constructor(codeSectionWithSmell: string) {
    this._codeSectionWithSmell = codeSectionWithSmell;
  }

  get codeSectionWithSmell(): string {
    return this._codeSectionWithSmell;
  }

  protected get formattedCodeSectionWithSmell(): string {
    return this._formattedCodeSectionWithSmell;
  }

  protected set formattedCodeSectionWithSmell(value: string) {
    this._formattedCodeSectionWithSmell = value;
  }

  create(): CodeSmell {
    this._formattedCodeSectionWithSmell = this._codeSectionWithSmell;
    this.formatCode();
    return this.factoryMethod();
  }

  protected formatCode() {
    this._formattedCodeSectionWithSmell = this._formattedCodeSectionWithSmell.trim();
    this.replaceCodeWhitespacesWithOneSpace();
  }

  private replaceCodeWhitespacesWithOneSpace() {
    this._formattedCodeSectionWithSmell = this._formattedCodeSectionWithSmell.replace(
      /\s+/g,
      ' '
    );
  }

  protected abstract factoryMethod(): CodeSmell;
}
