export default class TextSlicer {
  private readonly lines: string[];
  private _startLine: number | undefined;
  private _endLine: number | undefined;
  private _startColumn: number | undefined;
  private _endColumn: number | undefined;

  constructor(lines: string[]) {
    this.lines = lines;
  }

  set startLine(value: number | undefined) {
    this._startLine = value;
  }

  set endLine(value: number | undefined) {
    this._endLine = value;
  }

  set startColumn(value: number | undefined) {
    this._startColumn = value;
  }

  set endColumn(value: number | undefined) {
    this._endColumn = value;
  }

  sliceAndJoin(endOfLine = '\n'): string {
    const lines = this.slice();
    return lines.join(endOfLine);
  }

  private slice(): string[] {
    const lines = this.lines.slice(this._startLine, this._endLine);
    if (lines.length === 1) {
      this.sliceSingleLine(lines);
    } else {
      this.sliceFirstLine(lines);
      this.sliceLastLine(lines);
    }
    return lines;
  }

  private sliceSingleLine(lines: string[]) {
    const lineIndex = 0;
    const line = lines[lineIndex];
    lines[lineIndex] = line.slice(this._startColumn, this._endColumn);
  }

  private sliceFirstLine(lines: string[]) {
    const lineIndex = 0;
    const line = lines[lineIndex];
    lines[lineIndex] = line.slice(this._startColumn);
  }

  private sliceLastLine(lines: string[]) {
    const lineIndex = lines.length - 1;
    const line = lines[lineIndex];
    lines[lineIndex] = line.slice(undefined, this._endColumn);
  }
}
