import JavaCodeTokenizer from './JavaCodeTokenizer';
import assert from 'assert';

export default class MethodCallTokenizer extends JavaCodeTokenizer {
  getParts(): string[] {
    // todo trocar para que seja independente da formatação
    // todo talvez não esteja correto
    const regex = /\\"|"(?:\\"|[^"])*"|(\.)/;
    const match = this.code.split(regex);
    assert(match !== null);
    return match;
  }
}
