import CodeSmell from '../CodeSmell';
import ClassTokenizer from '../tokenizers/ClassTokenizer';

export default class DataClass implements CodeSmell {
  private readonly classTokenizer: ClassTokenizer;

  constructor(classTokenizer: ClassTokenizer) {
    this.classTokenizer = classTokenizer;
  }

  getTranslation(): string {
    return 'classes de dados';
  }

  getDescription(): string {
    const className = this.classTokenizer.getName();
    return `A classe "${className}" é uma classe de dados.`;
  }
}
