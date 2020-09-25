import CodeSmell from '../CodeSmell';
import assert from 'assert';

export default class LargeClass extends CodeSmell {
  get translation(): string {
    return 'classes grandes';
  }

  getDescription(): string {
    const className = this.getClassName();
    return `A classe "${className}" é uma classe de grande demais.`;
  }

  private getClassName(): string {
    const regex = /(?:class) ([\w$]+)/; // todo refatorar para reutilizar
    const match = this.codeSectionWithSmell.match(regex);
    assert(match !== null);
    return match[1];
  }
}
