import FormattedJavaCode from '../formatted_code/FormattedJavaCode';

export default abstract class JavaCodeTokenizer {
  private readonly _code: string;

  protected constructor(formattedJavaCode: FormattedJavaCode) {
    this._code = formattedJavaCode.code;
  }

  protected get code(): string {
    return this._code;
  }
}
