export default class TextTrimmer {
  private lines: string[];

  constructor(lines: string[]) {
    this.lines = lines;
  }

  getFirstLineIndex() {
    return 0;
  }

  getLastLineIndex(): number {
    return this.lines.length - 1;
  }

  removeLinesBeforeIndex(lineIndex: number) {
    this.lines = this.lines.slice(lineIndex);
  }

  removeLinesAfterIndex(lineIndex: number) {
    this.lines = this.lines.slice(undefined, lineIndex);
  }

  private removePrecedentsOfCharacterFromLineByIndexes(
    characterIndex: number,
    lineIndex: number
  ) {
    const line = this.lines[lineIndex];
    this.lines[lineIndex] = line.slice(characterIndex);
  }

  private removeSuccessorsOfCharacterFromLineByIndexes(
    characterIndex: number,
    lineIndex: number
  ) {
    const line = this.lines[lineIndex];
    this.lines[lineIndex] = line.slice(undefined, characterIndex);
  }
}
