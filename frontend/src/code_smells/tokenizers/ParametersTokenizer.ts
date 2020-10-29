import JavaCodeTokenizer from './JavaCodeTokenizer';
import FormattedDeclaration from '../formatted_code/FormattedDeclaration';

export default class ParametersTokenizer extends JavaCodeTokenizer {
  constructor(formattedDeclaration: FormattedDeclaration) {
    super(formattedDeclaration);
  }

  getAll(): string[] {
    let code = ParametersTokenizer.removeParentheses(this.code);
    code = code.trim();
    return ParametersTokenizer.splitParameters(code);
  }

  private static removeParentheses(code: string): string {
    return code.slice(1, -1);
  }

  private static splitParameters(code: string) {
    return code.split(/ *, +/);
  }
}
