export default abstract class CodeSmellDescription {
  private readonly _codeThatCausedViolation: string;

  constructor(codeThatCausedViolation: string) {
    this._codeThatCausedViolation = this.formatCode(codeThatCausedViolation);
  }

  protected get codeThatCausedViolation(): string {
    return this._codeThatCausedViolation;
  }

  abstract getDescription(): string;

  protected formatCode(code: string): string {
    code = code.trim();
    return this.replaceWhitespacesWithOneSpace(code);
  }

  private replaceWhitespacesWithOneSpace(text: string) {
    return text.replace(/\s+/g, ' ');
  }
}
