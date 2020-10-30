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
      'distribuída em métodos outras classes, dificultando a reutilização desse código. ' +
      `A solução pode ser transferir os métodos que manipulam as variáveis de classe para a classe "${className}".`
    );
  }
}
