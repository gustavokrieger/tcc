export default abstract class CodeSmell {
  private readonly _codeSectionWithSmell: string;

  constructor(codeSectionWithSmell: string) {
    this._codeSectionWithSmell = this.formatCode(codeSectionWithSmell);
  }

  protected get codeSectionWithSmell(): string {
    return this._codeSectionWithSmell;
  }

  abstract get translation(): string;

  protected formatCode(code: string): string {
    code = code.trim();
    return this.replaceWhitespacesWithOneSpace(code);
  }

  private replaceWhitespacesWithOneSpace(text: string) {
    return text.replace(/\s+/g, ' ');
  }

  abstract getDescription(): string;
}
