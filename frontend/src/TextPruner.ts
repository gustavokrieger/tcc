// todo refatorar para apenas fazer o slice por ultimo
export default class TextPruner {
  private lines: string[];

  constructor(lines: string[]) {
    this.lines = [...lines]; // todo depois de refatorar fazer normal
  }

  getText(): string {
    const endOfLine = '\n';
    return this.lines.join(endOfLine);
  }

  getFirstLineIndex() {
    return 0;
  }

  getLastLineIndex(): number {
    return this.lines.length - 1;
  }

  sliceLines(start?: number, end?: number) {
    this.lines = this.lines.slice(start, end);
  }

  removePredecessorsOfCharacterFromLine(
    characterIndex: number,
    lineIndex: number
  ) {
    const line = this.lines[lineIndex];
    this.lines[lineIndex] = line.slice(characterIndex);
  }

  removeSuccessorsOfCharacterFromLine(
    characterIndex: number,
    lineIndex: number
  ) {
    const line = this.lines[lineIndex];
    this.lines[lineIndex] = line.slice(undefined, characterIndex);
  }
}
