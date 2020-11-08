import JavaCodeTokenizer from './JavaCodeTokenizer';
import FormattedSwitch from '../formatted_code/FormattedSwitch';
import assert from 'assert';

export default class SwitchTokenizer extends JavaCodeTokenizer {
  constructor(formattedSwitch: FormattedSwitch) {
    super(formattedSwitch);
  }

  // todo melhorar regex
  getNumberOfCases(): number {
    const matches = this.code.match(/case/g);
    assert(matches !== null);
    return matches.length;
  }

  // todo melhorar regex
  getNumberOfStatementsInCases() {
    const matches = this.code.match(/;/g);
    assert(matches !== null);
    return matches.length;
  }
}
