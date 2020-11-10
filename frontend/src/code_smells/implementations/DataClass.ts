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
    return (
      `A classe "${className}" é uma Classe de Dados, pois ela expõe suas variáveis de classe (por serem "public" ou ` +
      'por possuírem métodos de "get" e "set") e não possui métodos com funcionalidade complexa. ' +
      'O problema desse tipo de classe, é que geralmente a responsabilidade de manipular as suas variáveis fica ' +
      'distribuída em métodos de outras classes, o que geralmente torna a reutilização desses métodos mais difícil ' +
      'do que se estivessem reunidos em uma classe só.' +
      `A solução pode ser transferir métodos de outras classes que manipulem as variáveis de classe da "${className}" ` +
      'para dentro dela.'
    );
  }
}
