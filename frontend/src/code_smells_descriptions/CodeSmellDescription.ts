export default abstract class CodeSmellDescription {
  private readonly _codeSectionContainingCodeSmell: string;

  constructor(codeSectionContainingCodeSmell: string) {
    this._codeSectionContainingCodeSmell = this.formatCode(
      codeSectionContainingCodeSmell
    );
  }

  protected get codeSectionContainingCodeSmell(): string {
    return this._codeSectionContainingCodeSmell;
  }

  protected formatCode(code: string): string {
    code = code.trim();
    return this.replaceWhitespacesWithOneSpace(code);
  }

  private replaceWhitespacesWithOneSpace(text: string) {
    return text.replace(/\s+/g, ' ');
  }

  abstract getDescription(): string;
}
