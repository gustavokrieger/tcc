import FormattedJavaCode from './FormattedJavaCode';

export default class FormattedSignature extends FormattedJavaCode {
  protected format(code: string): string {
    code = code.trim();
    return FormattedSignature.replaceWhitespacesWithSingleSpace(code);
  }

  private static replaceWhitespacesWithSingleSpace(text: string): string {
    return text.replace(/\s+/g, ' ');
  }
}
