import * as pmdTypes from '../pmdTypes';
import TextSlicer from './TextSlicer';
import SelectorOfCodeSmellCreator from '../code_smells/SelectorOfCodeSmellCreator';
import CodeSmellCreator from '../code_smells/CodeSmellCreator';
import {ContentsOfFile} from '../pages/CodeFilesUpload';

export default class CodeWithViolation {
  private readonly textSlicer: TextSlicer;
  private readonly violation: pmdTypes.Violation;
  private readonly _relativePath: string;

  private constructor(
    textSlicer: TextSlicer,
    violation: pmdTypes.Violation,
    relativePath: string
  ) {
    this.textSlicer = textSlicer;
    this.violation = violation;
    this._relativePath = relativePath;
  }

  static fromContentsOfFile(
    contentsOfFile: ContentsOfFile,
    violation: pmdTypes.Violation,
    relativePath: string
  ): CodeWithViolation {
    const code = contentsOfFile.text;
    const multiplatformEndOfLine = /\r?\n|\r/;
    const lineSeparatedCode = code.split(multiplatformEndOfLine);
    const textSlicer = new TextSlicer(lineSeparatedCode);
    return new CodeWithViolation(textSlicer, violation, relativePath);
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
