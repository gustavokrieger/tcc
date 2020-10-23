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

  getDescription(): string {
    const parts = this.callTokenizer.getParts();
    return `A classe "${parts[0]}"` + 'O problema' + 'A solução .';
  }
}
