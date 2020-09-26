import CodeSmell from '../CodeSmell';
import MethodTokenizer from '../tokenizers/MethodTokenizer';

export default class LongMethod implements CodeSmell {
  private readonly methodTokenizer: MethodTokenizer;

  constructor(methodTokenizer: MethodTokenizer) {
    this.methodTokenizer = methodTokenizer;
  }

  getTranslation(): string {
    return 'método longo';
  }

  getDescription(): string {
    const methodName = this.methodTokenizer.getName();
    return `O método "${methodName}" possui linhas demais.`;
  }
}
