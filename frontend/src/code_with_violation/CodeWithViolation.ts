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
    // todo refatorar para ser por injeção
    this.textSlicer = new TextSlicer(lineSeparatedCode);
    this.violation = violation;
    this._relativePath = relativePath;
  }

  static fromContentsOfFile(
    contentsOfFile: ContentsOfFile,
    violation: pmdOutput.Violation,
    relativePath: string
  ): CodeWithViolation {
    const code = contentsOfFile.text;
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

  getCodeThatCausedViolationAndLinesAroundIt(lines: number): string[] {
    const firstLine = Math.max(0, this.violation.beginline - lines - 1);
    const lastLine = this.violation.endline + lines;

    return this.textSlicer.slice(firstLine, lastLine);
  }

  private getCodeThatCausedViolation(): string[] {
    return this.textSlicer.slice(
      this.violation.beginline - 1,
      this.violation.endline,
      this.violation.begincolumn - 1,
      this.violation.endcolumn
    );
  }

  getCodeSmellCreator(): CodeSmellCreator {
    const selectorOfCodeSmellCreator = SelectorOfCodeSmellCreator.fromViolation(
      this.violation,
      this.getCodeThatCausedViolation()
    );
    return selectorOfCodeSmellCreator.select();
  }
}
