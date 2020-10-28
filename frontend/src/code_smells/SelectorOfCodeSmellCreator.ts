import {PmdCodeSmellType} from './PmdCodeSmellType';
import DataClassCreator from './implementations/DataClassCreator';
import LongMethodCreator from './implementations/LongMethodCreator';
import LongParameterListCreator from './implementations/LongParameterListCreator';
import CodeSmellCreator from './CodeSmellCreator';
import * as pmdOutput from '../pmdOutput';
import LargeClassCreator from './implementations/LargeClassCreator';
import FeatureEnvyCreator from './implementations/FeatureEnvyCreator';
import SwitchStatementsCreator from './implementations/SwitchStatementsCreator';

export default class SelectorOfCodeSmellCreator {
  private readonly pmdCodeSmellType: PmdCodeSmellType;
  private readonly codeSectionWithSmell: string;

  private constructor(
    pmdCodeSmellType: PmdCodeSmellType,
    codeSectionWithSmell: string
  ) {
    this.pmdCodeSmellType = pmdCodeSmellType;
    this.codeSectionWithSmell = codeSectionWithSmell;
  }

  static fromViolation(
    violation: pmdOutput.Violation,
    codeSectionWithSmell: string
  ): SelectorOfCodeSmellCreator {
    const pmdCodeSmellType = violation.rule as PmdCodeSmellType;
    return new SelectorOfCodeSmellCreator(
      pmdCodeSmellType,
      codeSectionWithSmell
    );
  }

  select(): CodeSmellCreator {
    switch (this.pmdCodeSmellType) {
      case PmdCodeSmellType.DATA_CLASS:
        return new DataClassCreator(this.codeSectionWithSmell);
      case PmdCodeSmellType.LARGE_CLASS:
        return new LargeClassCreator(this.codeSectionWithSmell);
      case PmdCodeSmellType.LONG_METHOD:
        return new LongMethodCreator(this.codeSectionWithSmell);
      case PmdCodeSmellType.LONG_PARAMETER_LIST:
        return new LongParameterListCreator(this.codeSectionWithSmell);
      case PmdCodeSmellType.FEATURE_ENVY:
        return new FeatureEnvyCreator(this.codeSectionWithSmell);
      case PmdCodeSmellType.SWITCH_STATEMENTS:
        return new SwitchStatementsCreator(this.codeSectionWithSmell);
      default:
        // todo criar exception
        throw new Error();
    }
  }
}
