import assert from 'assert';
import JavaCodeTokenizer from './JavaCodeTokenizer';
import FormattedDeclaration from '../formatted_code/FormattedDeclaration';

export default class ClassTokenizer extends JavaCodeTokenizer {
  private readonly _linesOfCode: number;

  constructor(formattedDeclaration: FormattedDeclaration) {
    super(formattedDeclaration);
    this._linesOfCode = formattedDeclaration.linesOfCode;
  }

  get linesOfCode(): number {
    return this._linesOfCode;
  }

  getName(): string {
    const regex = /(?:class) ([\w$]+)/;
    const match = this.code.match(regex);
    assert(match !== null);
    return match[1];
  }
}
