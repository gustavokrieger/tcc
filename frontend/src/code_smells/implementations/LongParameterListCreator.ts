import CodeSmellCreator from '../CodeSmellCreator';
import LongParameterList from './LongParameterList';
import ParametersTokenizer from '../tokenizers/ParametersTokenizer';
import FormattedDeclaration from '../formatted_code/FormattedDeclaration';

export default class LongParameterListCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedDeclaration: FormattedDeclaration
  ): ParametersTokenizer {
    return new ParametersTokenizer(formattedDeclaration);
  }

  protected makeCodeSmell(
    parametersTokenizer: ParametersTokenizer
  ): LongParameterList {
    return new LongParameterList(parametersTokenizer);
  }
}
