import CodeSmellDescription from './CodeSmellDescription';
import assert from 'assert';

export default class DataClassDescription extends CodeSmellDescription {
  getDescription(): string {
    const className = this.getClassName();
    return `A classe "${className}" é uma classe de dados.`;
  }

  private getClassName(): string {
    const regex = /(?:class) ([\w$]+)/;
    const match = this.codeThatCausedViolation.match(regex);
    assert(match !== null);
    return match[1];
  }
}
