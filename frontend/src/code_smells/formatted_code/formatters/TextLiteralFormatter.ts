export default class TextLiteralFormatter {
  private _code: string;

  constructor(code: string) {
    this._code = code;
  }

  get code(): string {
    return this._code;
  }

  removeContentOfAll() {
    this.removeEscapedCharacters();
    this.removeContentOfStringLiterals();
    this.removeContentOfCharacterLiterals();
  }

  private removeEscapedCharacters() {
    this._code = this._code.replace(/\\./g, '');
  }

  private removeContentOfStringLiterals() {
    this._code = this._code.replace(/".*?"/g, '""');
  }

  private removeContentOfCharacterLiterals() {
    this._code = this._code.replace(/'.*?'/g, "''");
  }
}
