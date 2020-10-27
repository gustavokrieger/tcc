import JavaCodeTokenizer from './JavaCodeTokenizer';
import assert from 'assert';
import FormattedSignature from '../formatted_code/FormattedSignature';

export default class MethodSignatureTokenizer extends JavaCodeTokenizer {
  constructor(formattedSignature: FormattedSignature) {
    super(formattedSignature);
  }

  getName(): string {
    const regex = /(?:[a-z]+) ([\w$]+) ?\(/;
    const match = this.code.match(regex);
    assert(match !== null);
    return match[1];
  }
}
