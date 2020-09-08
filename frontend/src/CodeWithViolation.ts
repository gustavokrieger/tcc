import {PmdCodeSmellType} from './PmdCodeSmellType';
import SynchronousFile from './SynchronousFile';
import * as pmdOutput from './pmdOutput';

// todo adicionar campo de nome de arquivo completo
export default class CodeWithViolation {
  private readonly NEWLINE_OF_RETURN = '\n';

  private readonly lineSeparatedCode: string[];
  private readonly violation: pmdOutput.Violation;
  private readonly fullPath: string;

  private constructor(
    lineSeparatedCode: string[],
    violation: pmdOutput.Violation,
    fullPath: string
  ) {
    this.lineSeparatedCode = lineSeparatedCode;
    this.violation = violation;
    this.fullPath = fullPath;
  }

  static fromSynchronousFile(
    synchronousFile: SynchronousFile,
    violation: pmdOutput.Violation,
    fullPath: string
  ): CodeWithViolation {
    const code = synchronousFile.text;
    // todo encontrar forma melhor, vai quebrar quando codigo com regex
    const endOfLine = /\r?\n/;
    const lineSeparatedCode = code.split(endOfLine);
    return new CodeWithViolation(lineSeparatedCode, violation, fullPath);
  }

  getCodeThatCausedViolation(): string {
    const lineSeparatedResult = this.getLineSeparatedCodeThatCausedViolation();
    return lineSeparatedResult.join(this.NEWLINE_OF_RETURN);
  }

  private getLineSeparatedCodeThatCausedViolation(): string[] {
    const linesWithViolation = this.getLinesThatCausedViolation();
    this.trimFirstLine(linesWithViolation, this.violation.begincolumn);
    this.trimLastLine(linesWithViolation, this.violation.endcolumn);
    return linesWithViolation;
  }

  private getLinesThatCausedViolation(): string[] {
    const firstLine = this.getZeroIfNumberIsNegative(
      this.violation.beginline - 1
    );
    return this.lineSeparatedCode.slice(firstLine, this.violation.endline);
  }

  private getZeroIfNumberIsNegative(number: number): number {
    return Math.max(number, 0);
  }

  private trimFirstLine(lineSeparatedCode: string[], charactersToTrim: number) {
    lineSeparatedCode[0] = lineSeparatedCode[0].slice(charactersToTrim);
  }

  private trimLastLine(lineSeparatedCode: string[], charactersToKeep: number) {
    const lastLine = this.getZeroIfNumberIsNegative(
      lineSeparatedCode.length - 1
    );
    lineSeparatedCode[lastLine] = lineSeparatedCode[lastLine].slice(
      undefined,
      charactersToKeep
    );
  }

  // todo talvez passar para outra classe
  getTranslatedRule() {
    const pmdCodeSmellType = this.violation.rule as PmdCodeSmellType;
    switch (pmdCodeSmellType) {
      case PmdCodeSmellType.LONG_METHOD:
        return 'método longo';
      case PmdCodeSmellType.LONG_PARAMETER_LIST:
        return 'lista de parâmetros longa';
    }
  }
}
