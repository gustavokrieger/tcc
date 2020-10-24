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
      'Essa parte do método pode estar sofrendo de Inveja dos Dados, pois ';
    if (callParts.length === 2) {
      return (
        `o ${FeatureEnvy.formatByType(
          callParts[0]
        )} foi retornado por um método para poder fazer chamada ao` +
        `${FeatureEnvy.formatByType(callParts[1])}`
      );
    }
    return '';
  }

  private static formatByType(text: string) {
    if (text[-1] === ')') {
      const methodName = text.slice(-2, -1);
      return `método ${methodName}`;
    }
    return `objeto ${text}`;
  }

  private static getDescriptionSecondPart() {
    return 'O problema' + 'A solução .';
  }
}
