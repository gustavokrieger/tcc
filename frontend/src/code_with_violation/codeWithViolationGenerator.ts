import * as pmdTypes from '../pmdTypes';
import CodeWithViolation from './CodeWithViolation';
import {ContentsOfFile} from '../pages/CodeFilesUpload';

// todo pode ser melhorado para ganhar desempenho
export function* codeWithViolationGenerator(
  files: pmdTypes.File[],
  contentsOfFiles: Iterable<ContentsOfFile>
): Generator<CodeWithViolation> {
  for (const file of files) {
    let fileRelativePath = getFileRelativePath(file.filename);
    fileRelativePath = fileRelativePath.replaceAll('\\', '/');

    const contentsOfFile = getContentsOfFileWithRelativePath(
      contentsOfFiles,
      fileRelativePath
    );

    for (const violation of file.violations) {
      yield CodeWithViolation.fromContentsOfFile(
        contentsOfFile,
        violation,
        fileRelativePath
      );
    }
  }
}

function getContentsOfFileWithRelativePath(
  contentsOfFiles: Iterable<ContentsOfFile>,
  relativePath: string
): ContentsOfFile {
  for (const contentsOfFile of contentsOfFiles) {
    if (contentsOfFile.relativePath === relativePath) {
      return contentsOfFile;
    }
  }
  throw new Error();
}

function getFileRelativePath(filename: string): string {
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
