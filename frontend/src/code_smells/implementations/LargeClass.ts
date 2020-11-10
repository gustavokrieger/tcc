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
    const lines = this.classTokenizer.linesOfCode;
    return (
      `A classe "${className}" é uma Classe Grande pois ela possui linhas em excesso. São ${lines} linhas, enquanto ` +
      'o ideal seria um número menor do que 500. ' +
      'O problema desse tipo de classe é que o seu tamanho excessivo pode ser um indicativo de que a classe possui ' +
      'baixa coesão (métodos da classe tem pouca relação entre si), o que aumenta a complexidade da classe desnecessariamente. ' +
      `A solução pode ser mover métodos, e possivelmente variáveis de classe, da classe "${className}" para ` +
      'outras classes, mesmo que seja necessário criá-las.'
    );
  }
}
