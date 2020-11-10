import CodeSmell from '../CodeSmell';
import SwitchTokenizer from '../tokenizers/SwitchTokenizer';

export default class SwitchStatements implements CodeSmell {
  private readonly switchTokenizer: SwitchTokenizer;

  constructor(switchTokenizer: SwitchTokenizer) {
    this.switchTokenizer = switchTokenizer;
  }

  getTranslation(): string {
    return 'comandos switch';
  }

  getDescription(): string {
    const labels = this.switchTokenizer.getNumberOfLabels();
    const statements = this.switchTokenizer.getNumberOfStatementsInLabels();
    return (
      'Este comando "switch" possui ' +
      `${statements} declara${statements === 1 ? 'ção' : 'ções'}` +
      ' e ' +
      `${labels} rótulo${labels === 1 ? '' : 's'}` +
      ' (usos de "case" ou "default"), ' +
      'um número alto de declarações por rótulos. Essa densidade pode indicar que outra estrutura seria mais adequada no seu lugar. ' +
      'O problema de utilizar comandos "switch", principalmente quando são muito densos, é que eles tendem a causar duplicação. É comum que algumas ' +
      'declarações do "switch" se repitam em outra partes do sistema, ou até mesmo que o comando inteiro esteja ' +
      'duplicado. Essas situações vão, possivelmente, causar retrabalho todas as vezes que for necessário realizar ' +
      'alterações de funcionalidade nessas partes do código. ' +
      'A solução pode ser substituir o comando "switch" por uma estrutura que utilize polimorfismo. Por exemplo, ' +
      'criar uma subclasse (da classe que possui o "switch") para cada rótulo, criar um método abstrato na classe com ' +
      'o "switch" (será necessário tornar a classe abstrata) e passar o código de cada rótulo para o novo método da subclasse criada para o rótulo ' +
      '(o novo método é o que as subclasses foram forçadas a declarar por conta do método abstrato). ' +
      'Essa nova estrutura deve substituir as ocorrências do "switch" original.'
    );
  }
}
