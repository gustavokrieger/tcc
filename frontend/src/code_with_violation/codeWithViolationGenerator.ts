import * as pmdOutput from '../pmdOutput';
import CodeWithViolation from './CodeWithViolation';
import assert from 'assert';
import {ContentsOfFile} from '../pages/CodeAnalysisResult';

// todo refatorar
export function* codeWithViolationGenerator(
  report: pmdOutput.Report,
  contentsOfFiles: ContentsOfFile[]
): Generator<CodeWithViolation> {
  contentsOfFiles = [...contentsOfFiles];
  for (const file of report.files) {
    for (const violation of file.violations) {
      const fileNames = file.filename.split('\\');
      const lastFilename = fileNames[fileNames.length - 1];
      let outerItem = null;
      let outerIndex = null;
      let relativePath = '';
      contentsOfFiles.forEach((item, index) => {
        if (item.name === lastFilename) {
          outerItem = item;
          outerIndex = index;
          relativePath = item.relativePath;
        }
      });
      assert(outerItem !== null);
      assert(outerIndex !== null);
      contentsOfFiles.splice(outerIndex, 1); // todo fazer com q não remova

      yield CodeWithViolation.fromContentsOfFile(
        outerItem,
        violation,
        relativePath
      );
    }
  }
}
