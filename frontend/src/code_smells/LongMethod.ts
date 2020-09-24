import CodeSmell from './CodeSmell';
import assert from 'assert';

export default class LongMethod extends CodeSmell {
  getDescription(): string {
    const methodName = this.getMethodName();
    return `O método "${methodName}" possui linhas demais.`;
  }

  private getMethodName(): string {
    const regex = /(?:[a-z]+) ([\w$]+)\(/; // todo refatorar para ser classe reutilizavel
    const match = this.codeSectionWithSmell.match(regex);
    assert(match !== null);
    return match[1];
  }

  get translation(): string {
    return 'método longo';
  }
}
