import FormattedJavaCode from './FormattedJavaCode';

export default class FormattedSwitch extends FormattedJavaCode {
  protected format(code: string[]): string {
    const joinedCode = super.format(code);
    return joinedCode.trim();
  }
}
