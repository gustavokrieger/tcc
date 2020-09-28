import JavaCodeTokenizer from './JavaCodeTokenizer';

export default class ParametersTokenizer extends JavaCodeTokenizer {
  getAll(): string[] {
    let code = this.removeParentheses(this.code);
    code = code.trim();
    return this.splitParameters(code);
  }

  private removeParentheses(code: string): string {
    return code.slice(1, -1);
  }

  private splitParameters(code: string) {
    return code.split(/ *, +/);
  }
}
