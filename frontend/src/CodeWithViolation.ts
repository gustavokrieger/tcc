import {PmdCodeSmellType} from './PmdCodeSmellType';
import SynchronousFile from './SynchronousFile';
import * as pmdOutput from './pmdOutput';
import CodeSmellDescription from './code_smells_descriptions/CodeSmellDescription';
import LongMethodDescription from './code_smells_descriptions/LongMethodDescription';
import LongParameterListDescription from './code_smells_descriptions/LongParameterListDescription';

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

  // todo formar classe com essas funções e as de antes de depois. criar classe considerando 0 e subclasse 1
  getCodeThatCausedViolation(): string {
    const lineSeparatedResult = this.getLineSeparatedCodeThatCausedViolation();
    return this.joinLines(lineSeparatedResult);
  }

  private getLineSeparatedCodeThatCausedViolation(): string[] {
    const linesWithViolation = this.getLinesThatCausedViolation();
    linesWithViolation[0] = this.trimTextThatPrecedesPosition(
      linesWithViolation[0],
      this.violation.begincolumn
    );
    const lastLine = this.getIndexOfLastLine(linesWithViolation);
    linesWithViolation[lastLine] = this.trimTextThatSucceedsPosition(
      linesWithViolation[lastLine],
      this.violation.endcolumn
    );
    return linesWithViolation;
  }

  private getLinesThatCausedViolation(): string[] {
    return this.getLines(this.violation.beginline, this.violation.endline);
  }

  private getIndexOfLastLine(lines: string[]) {
    return lines.length - 1;
  }

  private trimTextThatPrecedesPosition(text: string, position: number) {
    position--;
    return text.slice(position);
  }

  private trimTextThatSucceedsPosition(line: string, endingColumn: number) {
    return line.slice(undefined, endingColumn);
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

  // todo talvez passar para outra classe
  getViolationDescription(codeThatCausedViolation: string): string {
    const codeSmellDescription = this.getCodeSmellDescription(
      codeThatCausedViolation
    );
    return codeSmellDescription.getDescription();
  }

  // todo talvez passar para outra classe
  private getCodeSmellDescription(
    codeThatCausedViolation: string
  ): CodeSmellDescription {
    const pmdCodeSmellType = this.violation.rule as PmdCodeSmellType;
    switch (pmdCodeSmellType) {
      case PmdCodeSmellType.LONG_METHOD:
        return new LongMethodDescription(codeThatCausedViolation);
      case PmdCodeSmellType.LONG_PARAMETER_LIST:
        return new LongParameterListDescription(codeThatCausedViolation);
    }
  }

  getCodeBeforeViolation(): string {
    const lineSeparatedResult = this.getLineSeparatedCodeBeforeViolation();
    return this.joinLines(lineSeparatedResult);
  }

  private getLineSeparatedCodeBeforeViolation(): string[] {
    const linesBeforeViolation = this.getLinesBeforeViolation();
    const lastLine = this.getIndexOfLastLine(linesBeforeViolation);
    linesBeforeViolation[lastLine] = this.trimTextThatSucceedsPosition(
      linesBeforeViolation[lastLine],
      this.violation.begincolumn - 1
    );
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
    linesAfterViolation[0] = this.trimTextThatPrecedesPosition(
      linesAfterViolation[0],
      this.violation.endcolumn + 1
    );
    return linesAfterViolation;
  }

  private getLinesAfterViolation(lines = 10): string[] {
    const firstLine = this.violation.endline;
    const lastLine = this.violation.endline + lines;
    return this.getLines(firstLine, lastLine);
  }
}
