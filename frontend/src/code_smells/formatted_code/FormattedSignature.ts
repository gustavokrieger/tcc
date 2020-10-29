import FormattedJavaCode from './FormattedJavaCode';

export default class FormattedSignature extends FormattedJavaCode {
  private readonly _linesOfCode: number;

  constructor(code: string[]) {
    super(code);
    this._linesOfCode = code.length;
  }

  get linesOfCode(): number {
    return this._linesOfCode;
  }

  protected format(code: string[]): string {
    let joinedCode = super.format(code);
    joinedCode = joinedCode.trim();
    return FormattedSignature.replaceWhitespacesWithSingleSpace(joinedCode);
  }

  private static replaceWhitespacesWithSingleSpace(text: string): string {
    return text.replace(/\s+/g, ' ');
  }
}
