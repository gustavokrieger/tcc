import {PmdCodeSmellType} from './PmdCodeSmellType';
import SynchronousFile from './SynchronousFile';
import * as pmdOutput from './pmdOutput';

// todo adicionar campo de nome de arquivo completo
export default class CodeWithViolation {
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

  // todo formar classe com essas funções e as de antes de depois
  getCodeThatCausedViolation(): string {
    const lineSeparatedResult = this.getLineSeparatedCodeThatCausedViolation();
    return this.joinLines(lineSeparatedResult);
  }

  private getLineSeparatedCodeThatCausedViolation(): string[] {
    const linesWithViolation = this.getLinesThatCausedViolation();
    this.trimFirstLine(linesWithViolation, this.violation.begincolumn);
    this.trimLastLine(linesWithViolation, this.violation.endcolumn);
    return linesWithViolation;
  }

  private getLinesThatCausedViolation(): string[] {
    return this.getLines(this.violation.beginline, this.violation.endline);
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

  private getLines(firstLine: number, lastLine: number) {
    firstLine = Math.max(1, firstLine);
    firstLine--; // Adjusts for array.
    return this.lineSeparatedCode.slice(firstLine, lastLine);
  }

  private joinLines(lines: string[]): string {
    const endOfLine = '\n';
    return lines.join(endOfLine);
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

  getCodeBeforeViolation(): string {
    const lineSeparatedResult = this.getLineSeparatedCodeBeforeViolation();
    return this.joinLines(lineSeparatedResult);
  }

  private getLineSeparatedCodeBeforeViolation(): string[] {
    const linesBeforeViolation = this.getLinesBeforeViolation();
    this.trimLastLine(linesBeforeViolation, this.violation.begincolumn);
    return linesBeforeViolation;
  }

  private getLinesBeforeViolation(lines = 10): string[] {
    const firstLine = this.violation.beginline - lines;
    const lastLine = this.violation.beginline;
    return this.getLines(firstLine, lastLine);
  }

  getCodeAfterViolation(): string {
    const lineSeparatedResult = this.getLineSeparatedCodeAfterViolation();
    return this.joinLines(lineSeparatedResult);
  }

  private getLineSeparatedCodeAfterViolation(): string[] {
    const linesAfterViolation = this.getLinesAfterViolation();
    this.trimFirstLine(linesAfterViolation, this.violation.endcolumn);
    return linesAfterViolation;
  }

  private getLinesAfterViolation(lines = 10): string[] {
    const firstLine = this.violation.endline;
    const lastLine = this.violation.endline + lines;
    return this.getLines(firstLine, lastLine);
  }
}
