import FormattedJavaCode from './FormattedJavaCode';

export default class FormattedCall extends FormattedJavaCode {
  protected format(code: string[]): string {
    let joinedCode = super.format(code);
    joinedCode = FormattedCall.removeWhitespaces(joinedCode);
    return FormattedCall.removeArguments(joinedCode);
  }

  private static removeWhitespaces(text: string): string {
    return text.replace(/\s+/g, '');
  }

  private static removeArguments(text: string): string {
    return text.replace(/\(.*?\)\)|\(.*?\)/g, '()');
  }
}
