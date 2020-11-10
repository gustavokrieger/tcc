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
      `Este conjunto de parâmetros ("${firstParameter}" até "${lastParameter}") é uma ` +
      `Lista de Parâmetros Longa pois possui parâmetros em excesso. São ${numberOfParameters}, enquanto o ideal ` +
      'seria um número menor do que 5. ' +
      'O problema desse code smell, é que um número alto de parâmetros tem alta probabilidade de sofrer alterações com o avanço do ' +
      'desenvolvimento, forçando alterações em todas as partes do sistema que utilizam o método que teve seus parâmetros ' +
      'alterados. A solução pode ser fazer com que o resgate das variáveis seja feito dentro do método, ao invés de ' +
      'ser feito pela passagem de argumentos. Isso pode ser realizado substituindo alguns parâmetros do método por um ' +
      'conjunto menor que consiga resgatar os parâmetros originais através de chamadas de métodos, e realizar as ' +
      'chamadas dentro do método que sofreu a alteração de parâmetros.'
    );
  }
}
