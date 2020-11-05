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
    const beginning =
      'Essa parte do método pode estar sofrendo de Inveja dos Dados, pois';
    const ending = this.getDescriptionFirstPartEnding();
    return `${beginning} ${ending}`;
  }

  private getDescriptionFirstPartEnding() {
    let beginning;
    let ending;

    const tokens = this.callTokenizer.getParts();
    const firstIsMethod = FeatureEnvy.tokenIsMethod(tokens[0]);
    const firstToken = FeatureEnvy.getTokenDescription(tokens[0]);

    if (firstIsMethod) {
      beginning = FeatureEnvy.getDescriptionWithMethodFirst(tokens);
      ending = `estar na classe do objeto retornado pelo ${firstToken}.`;
    } else {
      beginning = FeatureEnvy.getDescriptionWithObjectFirst(tokens);
      ending = `estar na classe do ${firstToken}.`;
    }

    return (
      `${beginning}, o que pode indicar que essa parte do código (ou até mesmo o método inteiro) ` +
      `deveria, idealmente, ${ending}`
    );
  }

  private static getDescriptionWithMethodFirst(tokens: string[]) {
    const numberOfTokens = tokens.length;
    const firstToken = FeatureEnvy.getTokenDescription(tokens[0]);
    const lastToken = FeatureEnvy.getTokenDescription(
      tokens[numberOfTokens - 1]
    );

    if (numberOfTokens === 2) {
      return `o ${firstToken} retorna um objeto para poder fazer chamada ao ${lastToken}`;
    } else if (numberOfTokens === 3) {
      const secondToken = FeatureEnvy.getTokenDescription(tokens[1]);
      return `o ${firstToken} retorna um objeto que chama o ${secondToken} para poder chamar o ${lastToken}`;
    } else if (numberOfTokens >= 3) {
      return `o ${firstToken} retorna um objeto para fazer uma série de chamadas até poder chamar o ${lastToken}`;
    } else {
      throw new Error();
    }
  }

  private static getDescriptionWithObjectFirst(tokens: string[]) {
    const numberOfTokens = tokens.length;
    const firstToken = FeatureEnvy.getTokenDescription(tokens[0]);
    const lastToken = FeatureEnvy.getTokenDescription(
      tokens[numberOfTokens - 1]
    );

    if (numberOfTokens === 2) {
      return `o ${firstToken} foi retornado por um outro método para poder fazer chamada ao ${lastToken}`;
    } else if (numberOfTokens === 3) {
      const second = FeatureEnvy.getTokenDescription(tokens[1]);
      return (
        `o ${firstToken} foi retornado por um outro método para chamar o ${second}, para então poder chamar ` +
        `o ${lastToken}`
      );
    } else if (numberOfTokens >= 3) {
      return `o ${firstToken} retorna um objeto para fazer uma série de chamadas até poder chamar o ${lastToken}`;
    } else {
      throw new Error();
    }
  }

  private static tokenIsMethod(text: string) {
    return text[text.length - 1] === ')';
  }

  private static getTokenDescription(text: string) {
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
