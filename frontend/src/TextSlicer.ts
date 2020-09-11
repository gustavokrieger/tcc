export default class TextSlicer {
  private readonly DEFAULT_COORDINATE_VALUE = 0;

  private readonly lines: string[];
  private _startLine = this.DEFAULT_COORDINATE_VALUE;
  private _endLine = this.DEFAULT_COORDINATE_VALUE;
  private _startColumn = this.DEFAULT_COORDINATE_VALUE;
  private _endColumn = this.DEFAULT_COORDINATE_VALUE;

  constructor(lines: string[]) {
    this.lines = lines;
  }

  set startLine(value: number) {
    this._startLine = value;
  }

  set endLine(value: number) {
    this._endLine = value;
  }

  set startColumn(value: number) {
    this._startColumn = value;
  }

  set endColumn(value: number) {
    this._endColumn = value;
  }

  resetCoordinates() {
    this._startLine = this.DEFAULT_COORDINATE_VALUE;
    this._endLine = this.DEFAULT_COORDINATE_VALUE;
    this._startColumn = this.DEFAULT_COORDINATE_VALUE;
    this._endColumn = this.DEFAULT_COORDINATE_VALUE;
  }

  getJoinedSlicedSelection(endOfLine = '\n'): string {
    const lines = this.sliceSelection();
    return lines.join(endOfLine);
  }

  sliceSelection(): string[] {
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
