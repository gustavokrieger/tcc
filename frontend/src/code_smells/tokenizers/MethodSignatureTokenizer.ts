import JavaCodeTokenizer from './JavaCodeTokenizer';
import assert from 'assert';
import FormattedDeclaration from '../formatted_code/FormattedDeclaration';

export default class MethodSignatureTokenizer extends JavaCodeTokenizer {
  constructor(formattedDeclaration: FormattedDeclaration) {
    super(formattedDeclaration);
  }

  getName(): string {
    const regex = /(?:[a-z]+) ([\w$]+) ?\(/;
    const match = this.code.match(regex);
    assert(match !== null);
    return match[1];
  }
}
