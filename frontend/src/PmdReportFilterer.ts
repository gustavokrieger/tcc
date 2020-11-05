import * as pmdTypes from './pmdTypes';
import {PmdCodeSmellType} from './code_smells/PmdCodeSmellType';

type Coordinates = {
  beginline: number;
  begincolumn: number;
  endline: number;
  endcolumn: number;
};

export default class PmdReportFilterer {
  private readonly report: pmdTypes.Report;
  private readonly typeToFilter: PmdCodeSmellType;

  constructor(report: pmdTypes.Report, typeToFilter: PmdCodeSmellType) {
    this.report = report;
    this.typeToFilter = typeToFilter;
  }

  removeRepeatedInFiles() {
    for (const file of this.report.files) {
      this.removeRepeatedInFile(file);
    }
  }

  private removeRepeatedInFile(file: pmdTypes.File) {
    const coordinates: Coordinates[] = [];
    const newViolations: pmdTypes.Violation[] = [];
    for (const violation of file.violations) {
      if (
        violation.rule !== this.typeToFilter ||
        PmdReportFilterer.temp2(violation, coordinates)
      ) {
        continue;
      }
      newViolations.push(violation);
      const newLimit: Coordinates = {
        beginline: violation.beginline,
        begincolumn: violation.begincolumn,
        endline: violation.endline,
        endcolumn: violation.endcolumn,
      };
      coordinates.push(newLimit);
    }
    file.violations = newViolations;
  }

  private static temp2(violation: pmdTypes.Violation, limits: Coordinates[]) {
    for (const limit of limits) {
      if (
        violation.beginline === limit.beginline &&
        violation.begincolumn === limit.begincolumn &&
        violation.endline === limit.endline &&
        violation.endcolumn === limit.endcolumn
      ) {
        return true;
      }
    }
    return false;
  }
}
