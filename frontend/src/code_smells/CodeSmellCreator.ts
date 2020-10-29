import CodeSmell from './CodeSmell';
import FormattedJavaCode from './formatted_code/FormattedJavaCode';
import JavaCodeTokenizer from './tokenizers/JavaCodeTokenizer';
import FormattedSignature from './formatted_code/FormattedSignature';

export default abstract class CodeSmellCreator {
  private readonly _codeSectionWithSmell: string[];

  constructor(codeSectionWithSmell: string[]) {
    this._codeSectionWithSmell = codeSectionWithSmell;
  }

  protected get codeSectionWithSmell(): string[] {
    return this._codeSectionWithSmell;
  }

  create(): CodeSmell {
    const formattedJavaCode = this.makeFormattedJavaCode();
    const javaCodeTokenizer = this.makeJavaCodeTokenizer(formattedJavaCode);
    return this.makeCodeSmell(javaCodeTokenizer);
  }

  protected makeFormattedJavaCode(): FormattedJavaCode {
    return new FormattedSignature(this._codeSectionWithSmell);
  }

  protected abstract makeJavaCodeTokenizer(
    formattedJavaCode: FormattedJavaCode
  ): JavaCodeTokenizer;

  protected abstract makeCodeSmell(
    javaCodeTokenizer: JavaCodeTokenizer
  ): CodeSmell;
}
