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

  // todo revisar esse método para baixo
  getCodeThatCausedViolation(pmdViolation: PmdViolation) {
    const targetLines = this.getLinesThatCausedViolation(pmdViolation);
    // targetLines[0] = targetLines[0].slice(pmdViolation.begincolumn);
    this.trimBeginning(targetLines, pmdViolation.begincolumn);
    // targetLines[targetLines.length - 1] = targetLines[
    //   targetLines.length - 1
    // ].slice(0, pmdViolation.endcolumn);
    this.trimEnding(targetLines, pmdViolation.endcolumn);
  }

  private getLinesThatCausedViolation(pmdViolation: PmdViolation): string[] {
    return this.codeInLines.slice(
      pmdViolation.beginline - 1,
      pmdViolation.endline
    );
  }

  private trimBeginning(codeLines: string[], beginColumn: number) {
    codeLines[0] = codeLines[0].slice(beginColumn);
  }

  private trimEnding(codeLines: string[], endColumn: number) {
    const lastElementIndex = codeLines.length - 1;
    codeLines[lastElementIndex] = codeLines[lastElementIndex].slice(
      0,
      endColumn
    );
  }
}
