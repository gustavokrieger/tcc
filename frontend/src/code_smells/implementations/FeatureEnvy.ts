import CodeSmell from '../CodeSmell';
import MethodCallTokenizer from '../tokenizers/MethodCallTokenizer';

export default class FeatureEnvy implements CodeSmell {
  private readonly methodCallTokenizer: MethodCallTokenizer;

  constructor(methodCallTokenizer: MethodCallTokenizer) {
    this.methodCallTokenizer = methodCallTokenizer;
  }

  getTranslation(): string {
    return 'inveja dos dados';
  }

  getDescription(): string {
    const parts = this.methodCallTokenizer.getParts();
    return `A classe "${parts[0]}"` + 'O problema' + 'A solução .';
  }
}
