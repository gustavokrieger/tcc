export default abstract class FormattedJavaCode {
  private readonly _code: string;

  constructor(code: string) {
    this._code = this.format(code);
  }

  get code(): string {
    return this._code;
  }

  protected abstract format(code: string): string;
}
