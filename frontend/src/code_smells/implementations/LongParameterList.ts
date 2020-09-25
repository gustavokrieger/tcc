import CodeSmell from '../CodeSmell';

export default class LongParameterList extends CodeSmell {
  get translation(): string {
    return 'lista de parâmetros longa';
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
