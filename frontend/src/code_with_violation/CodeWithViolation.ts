import * as pmdOutput from '../pmdOutput';
import TextSlicer from './TextSlicer';
import SelectorOfCodeSmellCreator from '../code_smells/SelectorOfCodeSmellCreator';
import CodeSmellCreator from '../code_smells/CodeSmellCreator';
import {ContentsOfFile} from '../pages/CodeAnalysisResult';

export default class CodeWithViolation {
  private readonly textSlicer: TextSlicer;
  private readonly _violation: pmdOutput.Violation;
  private readonly fullPath: string;

  private constructor(
    lineSeparatedCode: string[],
    violation: pmdOutput.Violation,
    fullPath: string
  ) {
    this.textSlicer = new TextSlicer(lineSeparatedCode); // todo refatorar para ser por injeção
    this._violation = violation;
    this.fullPath = fullPath;
  }

  static fromContentsOfFile(
    contentsOfFile: ContentsOfFile,
    violation: pmdOutput.Violation,
    fullPath: string
  ): CodeWithViolation {
    const code = contentsOfFile.text;
    // todo encontrar forma melhor, vai quebrar quando codigo com regex
    const endOfLine = /\r?\n|\r/;
    const lineSeparatedCode = code.split(endOfLine);
    return new CodeWithViolation(lineSeparatedCode, violation, fullPath);
  }

  getCodeThatCausedViolation(): string {
    this.textSlicer.startLine = this._violation.beginline - 1;
    this.textSlicer.endLine = this._violation.endline;
    this.textSlicer.startColumn = this._violation.begincolumn - 1;
    this.textSlicer.endColumn = this._violation.endcolumn;
    return this.textSlicer.getJoinedSlicedSelection();
  }

  getCodeBeforeViolation(): string {
    this.textSlicer.startLine = undefined;
    this.textSlicer.endLine = this._violation.beginline;
    this.textSlicer.startColumn = undefined;
    this.textSlicer.endColumn = this._violation.begincolumn - 1;
    return this.textSlicer.getJoinedSlicedSelection();
  }

  getCodeAfterViolation(): string {
    this.textSlicer.startLine = this._violation.endline - 1;
    this.textSlicer.endLine = undefined;
    this.textSlicer.startColumn = this._violation.endcolumn;
    this.textSlicer.endColumn = undefined;
    return this.textSlicer.getJoinedSlicedSelection();
  }

  getCodeSmellCreator(): CodeSmellCreator {
    const selectorOfCodeSmellCreator = SelectorOfCodeSmellCreator.fromViolation(
      this._violation,
      this.getCodeThatCausedViolation()
    );
    return selectorOfCodeSmellCreator.select();
  }
}
