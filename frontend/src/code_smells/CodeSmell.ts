export default abstract class CodeSmell {
  private readonly _codeSectionWithSmell: string;

  constructor(codeSectionWithSmell: string) {
    this._codeSectionWithSmell = codeSectionWithSmell;
  }

  protected get codeSectionWithSmell(): string {
    return this._codeSectionWithSmell;
  }

  abstract get translation(): string;

  abstract getDescription(): string;
}
