export default abstract class CodeSmellDescription {
  private readonly _codeThatCausedViolation: string;

  constructor(codeThatCausedViolation: string) {
    this._codeThatCausedViolation = this.formatCode(codeThatCausedViolation);
  }

  protected get codeThatCausedViolation(): string {
    return this._codeThatCausedViolation;
  }

  abstract getDescription(): string;

  protected formatCode(text: string): string {
    return text.trim();
    // todo aplicar remover espaço duplo e newlines
  }
}
