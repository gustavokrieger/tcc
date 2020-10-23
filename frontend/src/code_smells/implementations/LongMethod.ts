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
    return (
      `O método "${methodName}" é um método longo pois ele possui linhas em excesso. ` +
      'O problema desse tipo de método, é que o seu tamanho excessivo acaba tornando difícil entender o que ele faz. ' +
      `A solução pode ser identificar trechos de código do método "${methodName}" que possam ser extraídos, ` +
      'mover esses trechos para novos métodos e chamar os novos métodos no lugar dos trechos extraídos.'
    );
  }
}
