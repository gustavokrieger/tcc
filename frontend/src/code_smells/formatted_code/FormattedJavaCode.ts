export default abstract class FormattedJavaCode {
  private readonly _code: string;

  constructor(code: string[]) {
    this._code = this.format(code);
  }

  get code(): string {
    return this._code;
  }

  protected format(code: string[]): string {
    const endOfLine = '\n';
    return code.join(endOfLine);
  }
}
