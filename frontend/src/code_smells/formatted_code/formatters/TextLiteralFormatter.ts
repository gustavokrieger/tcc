export default class TextLiteralFormatter {
  private _code: string;

  constructor(code: string) {
    this._code = code;
  }

  get code(): string {
    return this._code;
  }

  removeEscapedCharacters() {
    this._code = this._code.replace(/\\./g, '');
  }

  removeContentOfStringLiterals() {
    this._code = this._code.replace(/".*?"/g, '""');
  }

  removeContentOfCharacterLiterals() {
    this._code = this._code.replace(/'.*?'/g, "''");
  }
}
