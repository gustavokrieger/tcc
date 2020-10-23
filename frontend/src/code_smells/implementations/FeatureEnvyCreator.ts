import CodeSmellCreator from '../CodeSmellCreator';
import FeatureEnvy from './FeatureEnvy';
import CallTokenizer from '../tokenizers/CallTokenizer';
import FormattedCall from '../formatted_code/FormattedCall';

export default class FeatureEnvyCreator extends CodeSmellCreator {
  protected makeFormattedJavaCode(): FormattedCall {
    return new FormattedCall(this.codeSectionWithSmell);
  }

  protected makeJavaCodeTokenizer(formattedCall: FormattedCall): CallTokenizer {
    return new CallTokenizer(formattedCall);
  }

  protected makeCodeSmell(callTokenizer: CallTokenizer): FeatureEnvy {
    return new FeatureEnvy(callTokenizer);
  }
}
