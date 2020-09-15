import CodeSmellDescription from './CodeSmellDescription';
import assert from 'assert';

export default class LongMethodDescription extends CodeSmellDescription {
  getDescription(): string {
    const methodName = this.getMethodName();
    return `O método "${methodName}" possui linhas demais.`;
  }

  private getMethodName(): string {
    const regex = /(?:[a-z]+) ([\w$]+)\(/; // todo refatorar para ser classe reutilizavel
    const match = this.codeThatCausedViolation.match(regex);
    assert(match !== null);
    return match[1];
  }
}
