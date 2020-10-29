import FormattedJavaCode from './FormattedJavaCode';

export default class FormattedSwitch extends FormattedJavaCode {
  protected format(code: string): string {
    return code.trim();
  }
}
