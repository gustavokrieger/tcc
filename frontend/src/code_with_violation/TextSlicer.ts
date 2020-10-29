export default class TextSlicer {
  private readonly lines: string[];
  private _startLine: number | undefined;
  private _endLine: number | undefined;
  private _startColumn: number | undefined;
  private _endColumn: number | undefined;

  constructor(lines: string[]) {
    this.lines = lines;
  }

  slice(
    startLine?: number,
    endLine?: number,
    startColumn?: number,
    endColumn?: number
  ): string[] {
    this.defineLimits(startLine, endLine, startColumn, endColumn);
    const lines = this.lines.slice(this._startLine, this._endLine);
    if (lines.length === 1) {
      this.sliceSingleLine(lines);
    } else {
      this.sliceFirstLine(lines);
      this.sliceLastLine(lines);
    }
    return lines;
  }

  private defineLimits(
    startLine?: number,
    endLine?: number,
    startColumn?: number,
    endColumn?: number
  ) {
    this._startLine = startLine;
    this._endLine = endLine;
    this._startColumn = startColumn;
    this._endColumn = endColumn;
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
