import {PmdViolation} from './PmdViolation';

export default class CodeWithViolation {
  private readonly lineSeparatedCode: string[];
  private readonly pmdViolation: PmdViolation;

  private constructor(lineSeparatedCode: string[], pmdViolation: PmdViolation) {
    this.lineSeparatedCode = lineSeparatedCode;
    this.pmdViolation = pmdViolation;
  }

  static async fromFile(
    file: File,
    pmdViolation: PmdViolation
  ): Promise<CodeWithViolation> {
    const code = await file.text();
    // todo encontrar forma melhor, vai quebrar quando codigo com regex
    const endOfLineCharacter = /\r?\n/;
    const lineSplitCode = code.split(endOfLineCharacter);
    return new CodeWithViolation(lineSplitCode, pmdViolation);
  }

  getCodeThatCausedViolation(): string[] {
    const linesWithViolation = this.getLinesThatCausedViolation();
    this.trimFirstLine(linesWithViolation, this.pmdViolation.begincolumn);
    this.trimLastLine(linesWithViolation, this.pmdViolation.endcolumn);
    return linesWithViolation;
  }

  private getLinesThatCausedViolation(): string[] {
    return this.lineSeparatedCode.slice(
      this.pmdViolation.beginline - 1,
      this.pmdViolation.endline
    );
  }

  private trimFirstLine(lineSeparatedCode: string[], charactersToTrim: number) {
    lineSeparatedCode[0] = lineSeparatedCode[0].slice(charactersToTrim);
  }

  private trimLastLine(lineSeparatedCode: string[], charactersToKeep: number) {
    const lastLineIndex = lineSeparatedCode.length - 1;
    lineSeparatedCode[lastLineIndex] = lineSeparatedCode[lastLineIndex].slice(
      0,
      charactersToKeep
    );
  }
}
