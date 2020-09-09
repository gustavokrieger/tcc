import CodeSmellDescription from './CodeSmellDescription';

export default class LongMethodDescription extends CodeSmellDescription {
  getDescription(): string {
    return 'Descrição de método longo';
  }
}
