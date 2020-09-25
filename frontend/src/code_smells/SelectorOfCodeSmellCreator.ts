import {PmdCodeSmellType} from '../PmdCodeSmellType';
import DataClassCreator from './DataClassCreator';
import LongMethodCreator from './LongMethodCreator';
import LongParameterListCreator from './LongParameterListCreator';
import CodeSmellCreator from './CodeSmellCreator';
import * as pmdOutput from '../pmdOutput';

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
      case PmdCodeSmellType.LONG_METHOD:
        return new LongMethodCreator(this.codeSectionWithSmell);
      case PmdCodeSmellType.LONG_PARAMETER_LIST:
        return new LongParameterListCreator(this.codeSectionWithSmell);
    }
  }
}
