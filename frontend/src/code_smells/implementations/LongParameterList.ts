import CodeSmell from '../CodeSmell';
import ParametersTokenizer from '../tokenizers/ParametersTokenizer';

export default class LongParameterList implements CodeSmell {
  private readonly parametersTokenizer: ParametersTokenizer;

  constructor(parametersTokenizer: ParametersTokenizer) {
    this.parametersTokenizer = parametersTokenizer;
  }

  getTranslation(): string {
    return 'lista de parâmetros longa';
  }

  getDescription(): string {
    const parameters = this.parametersTokenizer.getAll();
    const firstParameter = parameters[0];
    const numberOfParameters = parameters.length;
    const lastParameter = parameters[numberOfParameters - 1];
    return (
      `A lista de parametros que inicia com "${firstParameter}" e finaliza com "${lastParameter}" ` +
      `possui ${numberOfParameters} elementos, um número muito elevado.`
    );
  }
}
