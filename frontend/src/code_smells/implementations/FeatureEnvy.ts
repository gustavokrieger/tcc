import CodeSmell from '../CodeSmell';
import CallTokenizer from '../tokenizers/CallTokenizer';

export default class FeatureEnvy implements CodeSmell {
  private readonly callTokenizer: CallTokenizer;

  constructor(callTokenizer: CallTokenizer) {
    this.callTokenizer = callTokenizer;
  }

  getTranslation(): string {
    return 'inveja dos dados';
  }

  // todo finalizar
  getDescription(): string {
    return `${this.getDescriptionFirstPart()} ${FeatureEnvy.getDescriptionSecondPart()}`;
  }

  private getDescriptionFirstPart() {
    const callParts = this.callTokenizer.getParts();

    const beginning =
      'Essa parte do método pode estar sofrendo de Inveja dos Dados, pois';
    let end;
    if (callParts.length === 2) {
      end =
        `o ${FeatureEnvy.formatByType(
          callParts[0]
        )} foi retornado por um método para poder fazer chamada ao ` +
        `${FeatureEnvy.formatByType(
          callParts[1]
        )}, o que pode indicar que essa parte do código (ou até mesmo o método inteiro) deveria, idealmente, ` +
        `estar na classe do ${FeatureEnvy.formatByType(callParts[0])}.`;
    } else {
      end = '';
    }
    return `${beginning} ${end}`;
  }

  private static formatByType(text: string) {
    if (text[text.length - 1] === ')') {
      const methodName = text.slice(0, -2);
      return `método "${methodName}"`;
    }
    return `objeto "${text}"`;
  }

  private static getDescriptionSecondPart() {
    return (
      'O problema desse code smell, é que o fato do código não estar na classe apropriada ' +
      'pode acabar fazendo com que o mesmo trecho de código seja duplicado em outra parte do sistema, o que causa ' +
      'retrabalho não apenas na codificação, mas possivelmente também em todas as vezes que for necessário realizar ' +
      'alterações de funcionalidade nessa parte do código. ' +
      'A solução pode ser mover esta parte do método para um novo método na classe apropriada e chamar o novo ' +
      'método no lugar desta parte. Caso a classe ' +
      'apropriada seja de biblioteca de terceiro que não pode ser facilmente alterada no sistema, a solução pode ser ' +
      'criar uma classe que possua a classe de terceiro como uma variável de classe, e fazer a tranferência do código ' +
      'para a nova classe.'
    );
  }
}
