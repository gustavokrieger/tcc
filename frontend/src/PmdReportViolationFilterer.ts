import * as pmdTypes from './pmdTypes';
import {PmdCodeSmellType} from './code_smells/PmdCodeSmellType';
import _ from 'lodash';

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
    const filteredViolations: pmdTypes.Violation[] = [];
    for (const violation of file.violations) {
      if (violation.rule !== this.typeToFilter) {
        filteredViolations.push(violation);
        continue;
      }
      if (
        PmdReportViolationFilterer.violationHasOneOfTheCoordinates(
          violation,
          discoveredCoordinatesList
        )
      ) {
        continue;
      }

      filteredViolations.push(violation);
      const violationCoordinates = PmdReportViolationFilterer.getCoordinatesFomViolation(
        violation
      );
      discoveredCoordinatesList.push(violationCoordinates);
    }
    file.violations = filteredViolations;
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
    return _.isEqual(violationCoordinates, coordinates);
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
