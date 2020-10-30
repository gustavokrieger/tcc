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
    const cases = this.switchTokenizer.getNumberOfCases();
    const statements = this.switchTokenizer.getNumberOfStatementsInCases();
    return (
      `Este comando "switch" possui ${cases} "cases" e ${statements} declarações, uma proporção que pode indicar que ` +
      'outra estrutura seria mais adequada no seu lugar. ' +
      'O problema de utilizar comandos "switch", é que eles tendem a causar duplicação. É comum que algumas linhas ' +
      'dos "cases" se repitam em outra partes do sistema, ou até mesmo que o comando "switch" inteiro esteja ' +
      'duplicado. Essa situação vai, possivelmente, causar retrabalho todas as vezes que for necessário realizar ' +
      'alterações de funcionalidade nessa parte do código. ' +
      'A solução pode ser substituir o comando "switch" por uma estrutura que utilize polimorfismo, por exemplo, ' +
      'criando uma subclasse (da classe que possui o "switch") para cada "case", criar um método abstrato na classe com ' +
      'o "switch" e passar o código de cada "case" para o novo método da subclasse criada para o "case" ' +
      '(o novo método é o que as subclasses foram forçadas a declarar por conta do abstrato). ' +
      'Essa nova estrutura deve substituir as ocorrências do "switch" original.'
    );
  }
}
