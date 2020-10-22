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
      `O conjunto de parâmetros que inicia com "${firstParameter}" e finaliza com "${lastParameter}" (total de ` +
      `${numberOfParameters}), é uma lista de parâmetros longa pois possui parâmetros em excesso. ` +
      'O problema desse tipo de situação, é que a lista tem alta probabilidade de sofrer alterações com o avanço do ' +
      'desenvolvimento, forçando alterações em toda parte do sistema que utiliza o método que teve seus parâmetros ' +
      'alterados. A solução pode ser fazer com que o resgate das variáveis seja feito dentro do método, ao invés de ' +
      'ser feito pela passagem de parâmetros. Isso pode ser realizado substituindo multiplos parâmetros por um ' +
      'conjunto menor que consiga resgatar os parâmetros originais através de métodos.'
    );
  }
}
