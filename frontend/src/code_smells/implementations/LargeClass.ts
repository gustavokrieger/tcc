import CodeSmell from '../CodeSmell';
import ClassTokenizer from '../tokenizers/ClassTokenizer';

export default class LargeClass implements CodeSmell {
  private readonly classTokenizer: ClassTokenizer;

  constructor(classTokenizer: ClassTokenizer) {
    this.classTokenizer = classTokenizer;
  }

  getTranslation(): string {
    return 'classes grandes';
  }

  getDescription(): string {
    const className = this.classTokenizer.getName();
    return `A classe "${className}" é uma classe de grande demais. O problema é. A solução é`;
  }
}
