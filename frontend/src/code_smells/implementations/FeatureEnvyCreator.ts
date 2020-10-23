import CodeSmellCreator from '../CodeSmellCreator';
import FormattedJavaCode from '../FormattedJavaCode';
import FeatureEnvy from './FeatureEnvy';
import MethodCallTokenizer from '../tokenizers/MethodCallTokenizer';

export default class FeatureEnvyCreator extends CodeSmellCreator {
  protected makeJavaCodeTokenizer(
    formattedJavaCode: FormattedJavaCode
  ): MethodCallTokenizer {
    return new MethodCallTokenizer(formattedJavaCode);
  }

  protected makeCodeSmell(javaCodeTokenizer: MethodCallTokenizer): FeatureEnvy {
    return new FeatureEnvy(javaCodeTokenizer);
  }
}
