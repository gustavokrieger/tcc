import CodeSmell from '../CodeSmell';
import MethodSignatureTokenizer from '../tokenizers/MethodSignatureTokenizer';

export default class LongMethod implements CodeSmell {
  private readonly methodSignatureTokenizer: MethodSignatureTokenizer;

  constructor(methodSignatureTokenizer: MethodSignatureTokenizer) {
    this.methodSignatureTokenizer = methodSignatureTokenizer;
  }

  getTranslation(): string {
    return 'método longo';
  }

  getDescription(): string {
    const methodName = this.methodSignatureTokenizer.getName();
    const lines = this.methodSignatureTokenizer.linesOfCode;
    return (
      `O método "${methodName}" é um Método Longo pois ele possui linhas em excesso. São ${lines} linhas, enquanto ` +
      'o ideal seria um número menor do que 50. ' +
      'O problema desse tipo de método é que o seu tamanho excessivo pode acabar tornando difícil entender ' +
      'o que ele faz, além de tornar o seu código menos reutilizável (métodos pequenos são mais versáteis).' +
      `A solução pode ser identificar trechos de código do método "${methodName}" que possam ser extraídos, ` +
      'mover esses trechos para novos métodos e chamar os novos métodos no lugar dos trechos extraídos.'
    );
  }
}
