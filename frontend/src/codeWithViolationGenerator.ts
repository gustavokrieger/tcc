import * as pmdOutput from './pmdOutput';
import CodeWithViolation from './CodeWithViolation';
import assert from 'assert';
import SynchronousFile from './SynchronousFile';

// todo refatorar
export function* codeWithViolationGenerator(
  report: pmdOutput.Report,
  synchronousFiles: SynchronousFile[]
): Generator<CodeWithViolation> {
  for (const file of report.files) {
    for (const violation of file.violations) {
      const fileNames = file.filename.split('\\');
      const lastFilename = fileNames[fileNames.length - 1];
      let outerItem = null;
      let outerIndex = null;
      synchronousFiles.forEach((item, index) => {
        if (item.name() === lastFilename) {
          outerItem = item;
          outerIndex = index;
        }
      });
      assert(outerItem !== null);
      assert(outerIndex !== null);
      synchronousFiles.splice(outerIndex, 1);

      yield CodeWithViolation.fromSynchronousFile(
        outerItem,
        violation,
        file.filename
      );
    }
  }
}
