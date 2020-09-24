import CodeSmell from './CodeSmell';

export default class LongParameterList extends CodeSmell {
  protected formatCode(code: string): string {
    code = super.formatCode(code);
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
      `possui ${numberOfParameters} elementos, um número muito elevado.`
    );
  }

  private getParameters(): string[] {
    return this.codeSectionWithSmell.split(', ');
  }
}
