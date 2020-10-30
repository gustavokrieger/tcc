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
        )} foi retornado por um outro método para poder fazer chamada ao ` +
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
      'O problema desse code smell, é que como o código não está na classe mais apropriada, ele provavelmente vai ' +
      'ser duplicado em outras partes do sistema. Essa duplicação vai, possivelmente, causar retrabalho todas ' +
      'as vezes que for necessário realizar alterações de funcionalidade nessa parte do código. ' +
      'A solução pode ser mover esta parte do código para um novo método na classe apropriada e chamar esse ' +
      'método no lugar da parte extraída. Caso a classe que receberia o novo método seja de biblioteca de terceiro, ' +
      'uma alternativa pode ser criar uma classe que possua a de terceiro como variável de classe ' +
      'e fazer a tranferência do código para a nova classe.'
    );
  }
}
