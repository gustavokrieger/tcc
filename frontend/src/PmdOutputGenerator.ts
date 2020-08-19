import * as pmdOutput from './pmdOutput';
import {PmdViolation} from './PmdViolation';

export function* PmdOutputGenerator(
  report: pmdOutput.Report
): Generator<PmdViolation> {
  for (const file of report.files) {
    yield* yieldReportViolationsWithFilename(file);
  }
}

function* yieldReportViolationsWithFilename(
  file: pmdOutput.File
): Generator<PmdViolation> {
  for (const violation of file.violations) {
    yield {
      ...violation,
      filename: file.filename,
    };
  }
}
