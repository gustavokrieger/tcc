import * as pmdTypes from './pmdTypes';
import {PmdCodeSmellType} from './code_smells/PmdCodeSmellType';

type Coordinates = {
  beginline: number;
  begincolumn: number;
  endline: number;
  endcolumn: number;
};

export default class PmdReportViolationFilterer {
  private readonly report: pmdTypes.Report;
  private readonly typeToFilter: PmdCodeSmellType;

  constructor(report: pmdTypes.Report, typeToFilter: PmdCodeSmellType) {
    this.report = report;
    this.typeToFilter = typeToFilter;
  }

  removeRepeatedByCoordinatesInFiles() {
    for (const file of this.report.files) {
      this.removeRepeatedByCoordinatesInFile(file);
    }
  }

  private removeRepeatedByCoordinatesInFile(file: pmdTypes.File) {
    const discoveredCoordinatesList: Coordinates[] = [];
    const violationsWithoutDuplicates: pmdTypes.Violation[] = [];
    for (const violation of file.violations) {
      if (
        violation.rule !== this.typeToFilter ||
        PmdReportViolationFilterer.violationHasOneOfTheCoordinates(
          violation,
          discoveredCoordinatesList
        )
      ) {
        continue;
      }
      violationsWithoutDuplicates.push(violation);
      const newLimit: Coordinates = {
        beginline: violation.beginline,
        begincolumn: violation.begincolumn,
        endline: violation.endline,
        endcolumn: violation.endcolumn,
      };
      discoveredCoordinatesList.push(newLimit);
    }
    file.violations = violationsWithoutDuplicates;
  }

  private static violationHasOneOfTheCoordinates(
    violation: pmdTypes.Violation,
    coordinatesList: Iterable<Coordinates>
  ) {
    for (const coordinates of coordinatesList) {
      if (this.violationHasCoordinates(violation, coordinates)) {
        return true;
      }
    }
    return false;
  }

  private static violationHasCoordinates(
    violation: pmdTypes.Violation,
    coordinates: Coordinates
  ) {
    const violationCoordinates = this.getCoordinatesFomViolation(violation);
    return violationCoordinates === coordinates;
  }

  private static getCoordinatesFomViolation(
    violation: pmdTypes.Violation
  ): Coordinates {
    return {
      beginline: violation.beginline,
      begincolumn: violation.begincolumn,
      endline: violation.endline,
      endcolumn: violation.endcolumn,
    };
  }
}
