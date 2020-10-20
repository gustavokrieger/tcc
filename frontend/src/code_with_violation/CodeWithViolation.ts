import * as pmdOutput from '../pmdOutput';
import TextSlicer from './TextSlicer';
import SelectorOfCodeSmellCreator from '../code_smells/SelectorOfCodeSmellCreator';
import CodeSmellCreator from '../code_smells/CodeSmellCreator';
import {ContentsOfFile} from '../pages/CodeFilesUpload';

export default class CodeWithViolation {
  private readonly textSlicer: TextSlicer;
  private readonly violation: pmdOutput.Violation;
  private readonly _relativePath: string;

  private constructor(
    lineSeparatedCode: string[],
    violation: pmdOutput.Violation,
    relativePath: string
  ) {
    this.textSlicer = new TextSlicer(lineSeparatedCode); // todo refatorar para ser por injeção
    this.violation = violation;
    this._relativePath = relativePath;
  }

  static fromContentsOfFile(
    contentsOfFile: ContentsOfFile,
    violation: pmdOutput.Violation,
    relativePath: string
  ): CodeWithViolation {
    const code = contentsOfFile.text;
    // todo encontrar forma melhor, vai quebrar quando codigo com regex
    const endOfLine = /\r?\n|\r/;
    const lineSeparatedCode = code.split(endOfLine);
    return new CodeWithViolation(lineSeparatedCode, violation, relativePath);
  }

  get relativePath(): string {
    return this._relativePath;
  }

  getFirstLineOfViolation(): number {
    return this.violation.beginline;
  }

  getLastLineOfViolation(): number {
    return this.violation.endline;
  }

  getCodeThatCausedViolationAndLinesAroundIt(lines: number): string {
    const firstLine = this.violation.beginline - lines - 1;
    const lastLine = this.violation.endline + lines;
    return (
      this.getCodeBeforeViolation(firstLine) +
      this.getCodeThatCausedViolation() +
      this.getCodeAfterViolation(lastLine)
    );
  }

  private getCodeThatCausedViolation(): string {
    this.textSlicer.startLine = this.violation.beginline - 1;
    this.textSlicer.endLine = this.violation.endline;
    this.textSlicer.startColumn = this.violation.begincolumn - 1;
    this.textSlicer.endColumn = this.violation.endcolumn;
    return this.textSlicer.sliceAndJoin();
  }

  private getCodeBeforeViolation(startLine: number): string {
    if (startLine < 0) {
      startLine = 0;
    }
    this.textSlicer.startLine = startLine;
    this.textSlicer.endLine = this.violation.beginline;
    this.textSlicer.startColumn = undefined;
    this.textSlicer.endColumn = this.violation.begincolumn - 1;
    return this.textSlicer.sliceAndJoin();
  }

  private getCodeAfterViolation(endLine: number): string {
    this.textSlicer.startLine = this.violation.endline - 1;
    this.textSlicer.endLine = endLine;
    this.textSlicer.startColumn = this.violation.endcolumn;
    this.textSlicer.endColumn = undefined;
    return this.textSlicer.sliceAndJoin();
  }

  getCodeSmellCreator(): CodeSmellCreator {
    const selectorOfCodeSmellCreator = SelectorOfCodeSmellCreator.fromViolation(
      this.violation,
      this.getCodeThatCausedViolation()
    );
    return selectorOfCodeSmellCreator.select();
  }
}
