import assert from 'assert';
import JavaCodeTokenizer from './JavaCodeTokenizer';

export default class ClassTokenizer extends JavaCodeTokenizer {
  getName(): string {
    const regex = /(?:class) ([\w$]+)/; // todo trocar para que seja independente da formatação
    const match = this.code.match(regex);
    assert(match !== null);
    return match[1];
  }
}
