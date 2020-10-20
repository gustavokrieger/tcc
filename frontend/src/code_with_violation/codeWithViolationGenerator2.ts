import * as pmdOutput from '../pmdOutput';
import CodeWithViolation from './CodeWithViolation';
import {ContentsOfFile} from '../pages/CodeFilesUpload';

export function* codeWithViolationGenerator2(
  files: pmdOutput.File[],
  contentsOfFiles: Iterable<ContentsOfFile>
): Generator<CodeWithViolation> {
  for (const file of files) {
    let fileRelativePath = getFileRelativePath(file.filename);
    fileRelativePath = fileRelativePath.replaceAll('\\', '/');

    let contentsOfFile: ContentsOfFile = {
      name: '',
      text: '',
      relativePath: '',
    };
    for (contentsOfFile of contentsOfFiles) {
      if (contentsOfFile.relativePath === fileRelativePath) {
        break;
      }
    }

    for (const violation of file.violations) {
      yield CodeWithViolation.fromContentsOfFile(
        contentsOfFile,
        violation,
        fileRelativePath
      );
    }
  }
}

function getFileRelativePath(filename: string) {
  const pathWithTemporaryDirectory = getPathWithTemporaryDirectory(filename);
  return removeFirstDirectory(pathWithTemporaryDirectory);
}

function getPathWithTemporaryDirectory(filename: string): string {
  const directoryId = 'CyXWc8mDSV';
  const index = filename.indexOf(directoryId);
  return filename.substring(index);
}

function removeFirstDirectory(pathWithTemporaryDirectory: string): string {
  const index = pathWithTemporaryDirectory.indexOf('\\');
  return pathWithTemporaryDirectory.substring(index + 1);
}
