import * as pmdOutput from './pmdOutput';
import {PmdViolation} from './PmdViolation';

export default class PmdOutputIterator
  implements IterableIterator<PmdViolation> {
  private readonly ReportFiles: pmdOutput.File[];
  private readonly violations = this.violationGenerator();

  constructor(report: pmdOutput.Report) {
    this.ReportFiles = report.files;
  }

  private *violationGenerator(): Generator<PmdViolation> {
    for (const file of this.ReportFiles) {
      yield this.yieldReportViolationWithFilename(file);
    }
  }

  private *yieldReportViolationWithFilename(
    file: pmdOutput.File
  ): Generator<PmdViolation> {
    for (const violation of file.violations) {
      yield {
        ...violation,
        filename: file.filename,
      };
    }
  }

  public next(): IteratorResult<PmdViolation> {
    const current = this.violations.next();
    if (current.done) {
      return this.endReturn();
    } else {
      return this.normalReturn(current.value);
    }
  }

  private endReturn(): IteratorResult<PmdViolation> {
    return {
      value: null,
      done: true,
    };
  }

  private normalReturn(
    pmdViolation: PmdViolation
  ): IteratorResult<PmdViolation> {
    return {
      value: pmdViolation,
      done: false,
    };
  }

  [Symbol.iterator](): IterableIterator<PmdViolation> {
    return this;
  }
}
