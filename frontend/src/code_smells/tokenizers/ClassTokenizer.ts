import assert from 'assert';
import JavaCodeTokenizer from './JavaCodeTokenizer';
import FormattedSignature from '../formatted_code/FormattedSignature';

export default class ClassTokenizer extends JavaCodeTokenizer {
  private readonly _linesOfCode: number;

  constructor(formattedSignature: FormattedSignature) {
    super(formattedSignature);
    this._linesOfCode = formattedSignature.linesOfCode;
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
