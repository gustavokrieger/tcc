import JavaCodeTokenizer from './JavaCodeTokenizer';

export default class ParametersTokenizer extends JavaCodeTokenizer {
  getAll(): string[] {
    let code = this.removeCodeParentheses(this.code);
    code = code.trim();
    return code.split(', ');
  }

  private removeCodeParentheses(code: string): string {
    return code.slice(1, -1);
  }
}
