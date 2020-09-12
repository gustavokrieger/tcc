import {PmdCodeSmellType} from './PmdCodeSmellType';
import SynchronousFile from './SynchronousFile';
import * as pmdOutput from './pmdOutput';
import CodeSmellDescription from './code_smells_descriptions/CodeSmellDescription';
import LongMethodDescription from './code_smells_descriptions/LongMethodDescription';
import LongParameterListDescription from './code_smells_descriptions/LongParameterListDescription';
import TextSlicer from './TextSlicer';

export default class CodeWithViolation {
  private readonly textSlicer: TextSlicer;
  private readonly violation: pmdOutput.Violation;
  private readonly fullPath: string;

  private constructor(
    lineSeparatedCode: string[],
    violation: pmdOutput.Violation,
    fullPath: string
  ) {
    this.textSlicer = new TextSlicer(lineSeparatedCode); // todo refatorar para ser por injeção
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
    const endOfLine = /\r?\n|\r/;
    const lineSeparatedCode = code.split(endOfLine);
    return new CodeWithViolation(lineSeparatedCode, violation, fullPath);
  }

  getCodeThatCausedViolation(): string {
    this.textSlicer.startLine = this.violation.beginline - 1;
    this.textSlicer.endLine = this.violation.endline;
    this.textSlicer.startColumn = this.violation.begincolumn - 1;
    this.textSlicer.endColumn = this.violation.endcolumn;
    return this.textSlicer.getJoinedSlicedSelection();
  }

  getCodeBeforeViolation(): string {
    this.textSlicer.startLine = undefined;
    this.textSlicer.endLine = this.violation.beginline;
    this.textSlicer.startColumn = undefined;
    this.textSlicer.endColumn = this.violation.begincolumn - 1;
    return this.textSlicer.getJoinedSlicedSelection();
  }

  getCodeAfterViolation(): string {
    this.textSlicer.startLine = this.violation.endline - 1;
    this.textSlicer.endLine = undefined;
    this.textSlicer.startColumn = this.violation.endcolumn;
    this.textSlicer.endColumn = undefined;
    return this.textSlicer.getJoinedSlicedSelection();
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
}
