import JavaCodeTokenizer from './JavaCodeTokenizer';
import FormattedSwitch from '../formatted_code/FormattedSwitch';
import assert from 'assert';

export default class SwitchTokenizer extends JavaCodeTokenizer {
  constructor(formattedSwitch: FormattedSwitch) {
    super(formattedSwitch);
  }

  getNumberOfLabels(): number {
    const matches = this.code.match(/(case .*?|default *):/g);
    assert(matches !== null);
    return matches.length;
  }

  getNumberOfStatementsInLabels() {
    const matches = this.code.match(/;/g);
    assert(matches !== null);
    return matches.length;
  }
}
