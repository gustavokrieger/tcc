import {PmdViolation} from './PmdViolation';

export default class UploadedCode {
  private readonly codeInLines: string[];

  constructor(codeInLines: string[]) {
    this.codeInLines = codeInLines;
  }

  static fromCodeNotSplit(code: string): UploadedCode {
    // todo encontrar forma melhor, vai quebrar quando codigo com regex
    const endOfLineCharacter = /\r?\n/;
    const lineSplitCode = code.split(endOfLineCharacter);
    return new UploadedCode(lineSplitCode);
  }

  getCodeThatCausedViolation(pmdViolation: PmdViolation): string[] {
    const linesWithViolation = this.getLinesThatCausedViolation(pmdViolation);
    this.trimFirstLine(linesWithViolation, pmdViolation.begincolumn);
    this.trimLastLine(linesWithViolation, pmdViolation.endcolumn);
    return linesWithViolation;
  }

  private getLinesThatCausedViolation(pmdViolation: PmdViolation): string[] {
    return this.codeInLines.slice(
      pmdViolation.beginline - 1,
      pmdViolation.endline
    );
  }

  private trimFirstLine(codeInLines: string[], charactersToTrim: number) {
    codeInLines[0] = codeInLines[0].slice(charactersToTrim);
  }

  private trimLastLine(codeInLines: string[], charactersToKeep: number) {
    const lastElementIndex = codeInLines.length - 1;
    codeInLines[lastElementIndex] = codeInLines[lastElementIndex].slice(
      0,
      charactersToKeep
    );
  }
}
