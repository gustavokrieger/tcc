import JavaCodeTokenizer from './JavaCodeTokenizer';
import FormattedCall from '../formatted_code/FormattedCall';

export default class CallTokenizer extends JavaCodeTokenizer {
  constructor(formattedCall: FormattedCall) {
    super(formattedCall);
  }

  getParts(): string[] {
    return this.code.split('.');
  }
}
