import FormattedJavaCode from './FormattedJavaCode';

export default class FormattedCall extends FormattedJavaCode {
  protected format(code: string): string {
    code = FormattedCall.removeWhitespaces(code);
    return FormattedCall.removeArguments(code);
  }

  private static removeWhitespaces(text: string): string {
    return text.replace(/\s+/g, '');
  }

  private static removeArguments(text: string): string {
    return text.replace(/\(.*?\)\)|\(.*?\)/g, '()');
  }
}
