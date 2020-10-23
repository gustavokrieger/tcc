import CodeSmell from './CodeSmell';
import FormattedJavaCode from './FormattedJavaCode';
import JavaCodeTokenizer from './tokenizers/JavaCodeTokenizer';

export default abstract class CodeSmellCreator {
  private readonly _codeSectionWithSmell: string;

  constructor(codeSectionWithSmell: string) {
    this._codeSectionWithSmell = codeSectionWithSmell;
  }

  create(): CodeSmell {
    const formattedJavaCode = FormattedJavaCode.format(
      this._codeSectionWithSmell
    );
    const javaCodeTokenizer = this.makeJavaCodeTokenizer(formattedJavaCode);
    return this.makeCodeSmell(javaCodeTokenizer);
  }

  protected abstract makeJavaCodeTokenizer(
    formattedJavaCode: FormattedJavaCode
  ): JavaCodeTokenizer;

  protected abstract makeCodeSmell(
    javaCodeTokenizer: JavaCodeTokenizer
  ): CodeSmell;
}
