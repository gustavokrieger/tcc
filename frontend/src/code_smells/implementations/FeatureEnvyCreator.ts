import CodeSmellCreator from '../CodeSmellCreator';
import FeatureEnvy from './FeatureEnvy';
import MethodCallTokenizer from '../tokenizers/MethodCallTokenizer';
import FormattedCall from '../formatted_code/FormattedCall';

export default class FeatureEnvyCreator extends CodeSmellCreator {
  protected makeFormattedJavaCode(): FormattedCall {
    return new FormattedCall(this.codeSectionWithSmell);
  }

  protected makeJavaCodeTokenizer(
    formattedCall: FormattedCall
  ): MethodCallTokenizer {
    return new MethodCallTokenizer(formattedCall);
  }

  protected makeCodeSmell(
    methodCallTokenizer: MethodCallTokenizer
  ): FeatureEnvy {
    return new FeatureEnvy(methodCallTokenizer);
  }
}
