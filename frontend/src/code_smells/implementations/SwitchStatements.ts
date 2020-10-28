import CodeSmell from '../CodeSmell';
import ClassTokenizer from '../tokenizers/ClassTokenizer';

export default class SwitchStatements implements CodeSmell {
  private readonly classTokenizer: ClassTokenizer;

  constructor(classTokenizer: ClassTokenizer) {
    this.classTokenizer = classTokenizer;
  }

  getTranslation(): string {
    return 'comandos switch';
  }

  getDescription(): string {
    // const className = this.classTokenizer.getName();
    return 'O comando' + 'O problema' + 'A solução.';
  }
}
