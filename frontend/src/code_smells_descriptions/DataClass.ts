import CodeSmellDescription from './CodeSmellDescription';

export default class DataClass extends CodeSmellDescription {
  getDescription(): string {
    return 'Descrição de Classe de Dados';
  }
}
