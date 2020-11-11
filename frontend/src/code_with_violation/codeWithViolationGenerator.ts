import * as pmdTypes from '../pmdTypes';
import CodeWithViolation from './CodeWithViolation';
import {ContentsOfFile} from '../pages/CodeFilesUpload';

export function* codeWithViolationGenerator(
  files: pmdTypes.File[],
  contentsOfFiles: Iterable<ContentsOfFile>
): Generator<CodeWithViolation> {
  for (const file of files) {
    let fileRelativePath = getFileRelativePath(file.filename);
    fileRelativePath = getPathWithUnixDirectorySeparator(fileRelativePath);

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

function getFileRelativePath(filename: string): string {
  const pathWithTemporaryDirectory = getPathWithTemporaryDirectory(filename);
  return removeFirstDirectory(pathWithTemporaryDirectory);
}

function getPathWithUnixDirectorySeparator(path: string): string {
  // todo passar para variavel externa
  const directorySeparatorInBackend = '/';
  const unixDirectorySeparator = '/';
  if (directorySeparatorInBackend === unixDirectorySeparator) {
    return path;
  }
  return path.replaceAll(directorySeparatorInBackend, unixDirectorySeparator);
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

function getPathWithTemporaryDirectory(filename: string): string {
  const directoryId = 'CyXWc8mDSV';
  const index = filename.indexOf(directoryId);
  return filename.substring(index);
}

function removeFirstDirectory(pathWithTemporaryDirectory: string): string {
  // todo passar para variavel externa
  const directorySeparatorInBackend = '/';
  const index = pathWithTemporaryDirectory.indexOf(directorySeparatorInBackend);
  return pathWithTemporaryDirectory.substring(index + 1);
}
