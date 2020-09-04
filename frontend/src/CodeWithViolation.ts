import {PmdCodeSmellType} from './PmdCodeSmellType';
import SynchronousFile from './SynchronousFile';
import * as pmdOutput from './pmdOutput';

// todo adicionar campo de nome de arquivo completo
export default class CodeWithViolation {
  private readonly lineSeparatedCode: string[];
  private readonly violation: pmdOutput.Violation;

  private constructor(
    lineSeparatedCode: string[],
    violation: pmdOutput.Violation
  ) {
    this.lineSeparatedCode = lineSeparatedCode;
    this.violation = violation;
  }

  static fromSynchronousFile(
    synchronousFile: SynchronousFile,
    violation: pmdOutput.Violation
  ): CodeWithViolation {
    const code = synchronousFile.text;
    // todo encontrar forma melhor, vai quebrar quando codigo com regex
    const endOfLine = /\r?\n/;
    const lineSeparatedCode = code.split(endOfLine);
    return new CodeWithViolation(lineSeparatedCode, violation);
  }

  getCodeThatCausedViolation(): string[] {
    const linesWithViolation = this.getLinesThatCausedViolation();
    this.trimFirstLine(linesWithViolation, this.violation.begincolumn);
    this.trimLastLine(linesWithViolation, this.violation.endcolumn);
    return linesWithViolation;
  }

  private getLinesThatCausedViolation(): string[] {
    return this.lineSeparatedCode.slice(
      this.violation.beginline - 1,
      this.violation.endline
    );
  }

  private trimFirstLine(lineSeparatedCode: string[], charactersToTrim: number) {
    lineSeparatedCode[0] = lineSeparatedCode[0].slice(charactersToTrim);
  }

  private trimLastLine(lineSeparatedCode: string[], charactersToKeep: number) {
    const lastLine = lineSeparatedCode.length - 1;
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
