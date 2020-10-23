import assert from 'assert';
import JavaCodeTokenizer from './JavaCodeTokenizer';
import FormattedSignature from '../formatted_code/FormattedSignature';

export default class ClassTokenizer extends JavaCodeTokenizer {
  constructor(formattedSignature: FormattedSignature) {
    super(formattedSignature);
  }

  getName(): string {
    // todo trocar para que seja independente da formatação
    const regex = /(?:class) ([\w$]+)/;
    const match = this.code.match(regex);
    assert(match !== null);
    return match[1];
  }
}
