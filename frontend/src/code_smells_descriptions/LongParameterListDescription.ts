import CodeSmellDescription from './CodeSmellDescription';

export default class LongParameterListDescription extends CodeSmellDescription {
  protected formatCode(text: string): string {
    let code = super.formatCode(text);
    code = this.removeParentheses(code);
    return code.trim();
  }

  private removeParentheses(text: string) {
    return text.slice(1, -1);
  }

  getDescription(): string {
    const parameters = this.getParameters();
    const firstParameter = parameters[0];
    const numberOfParameters = parameters.length;
    const lastParameter = parameters[numberOfParameters - 1];
    return (
      `A lista de parametros que inicia com "${firstParameter}" e finaliza com "${lastParameter}" ` +
      `possui ${numberOfParameters} elementos, um numero muito elevado.`
    );
  }

  private getParameters(): string[] {
    return this.codeThatCausedViolation.split(', ');
  }
}
