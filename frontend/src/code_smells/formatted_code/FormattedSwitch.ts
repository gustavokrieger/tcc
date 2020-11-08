import FormattedJavaCode from './FormattedJavaCode';
import TextLiteralFormatter from './formatters/TextLiteralFormatter';

export default class FormattedSwitch extends FormattedJavaCode {
  protected format(code: string[]): string {
    let joinedCode = super.format(code);
    const textLiteralFormatter = new TextLiteralFormatter(joinedCode);
    textLiteralFormatter.removeContentOfAll();
    joinedCode = textLiteralFormatter.code;
    return joinedCode.trim();
  }
}
