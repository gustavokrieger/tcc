export default class TextSelector {
  private readonly DEFAULT_VALUE = 0;

  private readonly lines: string[];
  private startLine = this.DEFAULT_VALUE;
  private endLine = this.DEFAULT_VALUE;
  private startColumn = this.DEFAULT_VALUE;
  private endColumn = this.DEFAULT_VALUE;

  constructor(lines: string[]) {
    this.lines = lines;
  }

  static fromText(text: string): TextSelector {
    const endOfLine = /\r?\n|\r/;
    const lines = text.split(endOfLine);
    return new TextSelector(lines);
  }

  resetCoordinates() {
    this.startLine = this.DEFAULT_VALUE;
    this.endLine = this.DEFAULT_VALUE;
    this.startColumn = this.DEFAULT_VALUE;
    this.endColumn = this.DEFAULT_VALUE;
  }

  getJoinedSlicedSelection(endOfLine = '\n'): string {
    const lines = this.sliceSelection();
    return lines.join(endOfLine);
  }

  sliceSelection(): string[] {
    const lines = this.lines.slice(this.startLine, this.endLine);
    const firstLine = lines[this.startLine];
    lines[this.startLine] = firstLine.slice(this.startColumn);
    const lastLine = lines[this.endLine];
    lines[this.endLine] = lastLine.slice(undefined, this.endColumn);
    return lines;
  }
}
