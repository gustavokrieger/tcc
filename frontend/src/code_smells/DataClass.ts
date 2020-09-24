import CodeSmell from './CodeSmell';
import assert from 'assert';

export default class DataClass extends CodeSmell {
  getDescription(): string {
    const className = this.getClassName();
    return `A classe "${className}" é uma classe de dados.`;
  }

  private getClassName(): string {
    const regex = /(?:class) ([\w$]+)/;
    const match = this.codeSectionWithSmell.match(regex);
    assert(match !== null);
    return match[1];
  }

  get translation(): string {
    return 'classes de dados';
  }
}
