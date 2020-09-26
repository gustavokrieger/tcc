import JavaCodeTokenizer from './JavaCodeTokenizer';
import assert from 'assert';

export default class MethodTokenizer extends JavaCodeTokenizer {
  getName(): string {
    const regex = /(?:[a-z]+) ([\w$]+)\(/;
    const match = this.code.match(regex);
    assert(match !== null);
    return match[1];
  }
}
