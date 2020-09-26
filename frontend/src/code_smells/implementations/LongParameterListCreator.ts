import CodeSmellCreator from '../CodeSmellCreator';
import LongParameterList from './LongParameterList';
import FormattedJavaCode from '../FormattedJavaCode';
import ParametersTokenizer from '../tokenizers/ParametersTokenizer';

export default class LongParameterListCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedJavaCode: FormattedJavaCode
  ): ParametersTokenizer {
    return new ParametersTokenizer(formattedJavaCode);
  }

  protected makeCodeSmell(
    javaCodeTokenizer: ParametersTokenizer
  ): LongParameterList {
    return new LongParameterList(javaCodeTokenizer);
  }
}
