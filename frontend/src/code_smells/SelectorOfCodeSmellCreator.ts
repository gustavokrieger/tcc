import {PmdCodeSmellType} from '../PmdCodeSmellType';
import DataClassCreator from './DataClassCreator';
import LongMethodCreator from './LongMethodCreator';
import LongParameterListCreator from './LongParameterListCreator';
import CodeSmellCreator from './CodeSmellCreator';
import CodeSmell from './CodeSmell';

export default class SelectorOfCodeSmellCreator {
  private readonly pmdCodeSmellType: PmdCodeSmellType;
  private readonly codeSectionWithSmell: string;

  constructor(
    pmdCodeSmellType: PmdCodeSmellType,
    codeSectionWithSmell: string
  ) {
    this.pmdCodeSmellType = pmdCodeSmellType;
    this.codeSectionWithSmell = codeSectionWithSmell;
  }

  private select(): CodeSmellCreator {
    switch (this.pmdCodeSmellType) {
      case PmdCodeSmellType.DATA_CLASS:
        return new DataClassCreator(this.codeSectionWithSmell);
      case PmdCodeSmellType.LONG_METHOD:
        return new LongMethodCreator(this.codeSectionWithSmell);
      case PmdCodeSmellType.LONG_PARAMETER_LIST:
        return new LongParameterListCreator(this.codeSectionWithSmell);
    }
  }

  selectAndCreate(): CodeSmell {
    const codeSmellCreator = this.select();
    return codeSmellCreator.create();
  }
}
