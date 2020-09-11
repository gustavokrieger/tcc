import {PmdCodeSmellType} from './PmdCodeSmellType';
import SynchronousFile from './SynchronousFile';
import * as pmdOutput from './pmdOutput';
import CodeSmellDescription from './code_smells_descriptions/CodeSmellDescription';
import LongMethodDescription from './code_smells_descriptions/LongMethodDescription';
import LongParameterListDescription from './code_smells_descriptions/LongParameterListDescription';
import TextPruner from './TextPruner';

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
    const endOfLine = /\r?\n|\r/;
    const lineSeparatedCode = code.split(endOfLine);
    return new CodeWithViolation(lineSeparatedCode, violation, fullPath);
  }

  getCodeThatCausedViolation(): string {
    const textPruner = new TextPruner(this.lineSeparatedCode);
    this.pruneLinesThatCausedViolation(textPruner);
    this.pruneFistLineThatCausedViolation(textPruner);
    this.pruneLastLineThatCausedViolation(textPruner);
    return textPruner.getText();
  }

  private pruneLinesThatCausedViolation(textPruner: TextPruner) {
    const start = this.violation.beginline - 1;
    const end = this.violation.endline;
    textPruner.sliceLines(start, end);
  }

  private pruneFistLineThatCausedViolation(textPruner: TextPruner) {
    const character = this.violation.begincolumn - 1;
    const line = textPruner.getFirstLineIndex();
    textPruner.removePredecessorsOfCharacterFromLine(character, line);
  }

  private pruneLastLineThatCausedViolation(textPruner: TextPruner) {
    const character = this.violation.endcolumn;
    const line = textPruner.getLastLineIndex();
    textPruner.removeSuccessorsOfCharacterFromLine(character, line);
  }

  getCodeBeforeViolation(): string {
    const textPruner = new TextPruner(this.lineSeparatedCode);
    this.pruneLinesBeforeViolation(textPruner);
    this.pruneLastLineBeforeViolation(textPruner);
    return textPruner.getText();
  }

  private pruneLinesBeforeViolation(textPruner: TextPruner) {
    const start = textPruner.getFirstLineIndex();
    const end = this.violation.beginline;
    textPruner.sliceLines(start, end);
  }

  private pruneLastLineBeforeViolation(textPruner: TextPruner) {
    const character = this.violation.begincolumn - 1;
    const line = textPruner.getLastLineIndex();
    textPruner.removeSuccessorsOfCharacterFromLine(character, line);
  }

  getCodeAfterViolation(): string {
    const textPruner = new TextPruner(this.lineSeparatedCode);
    this.pruneLinesAfterViolation(textPruner);
    this.pruneFirstLineAfterViolation(textPruner);
    return textPruner.getText();
  }

  private pruneLinesAfterViolation(textPruner: TextPruner) {
    const start = this.violation.endline - 1;
    const end = textPruner.getLastLineIndex() + 1;
    textPruner.sliceLines(start, end);
  }

  private pruneFirstLineAfterViolation(textPruner: TextPruner) {
    const character = this.violation.endcolumn;
    const line = textPruner.getFirstLineIndex();
    textPruner.removePredecessorsOfCharacterFromLine(character, line);
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
