import CodeSmellCreator from '../CodeSmellCreator';
import LongParameterList from './LongParameterList';
import ParametersTokenizer from '../tokenizers/ParametersTokenizer';
import FormattedSignature from '../formatted_code/FormattedSignature';

export default class LongParameterListCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedSignature: FormattedSignature
  ): ParametersTokenizer {
    return new ParametersTokenizer(formattedSignature);
  }

  protected makeCodeSmell(
    parametersTokenizer: ParametersTokenizer
  ): LongParameterList {
    return new LongParameterList(parametersTokenizer);
  }
}
