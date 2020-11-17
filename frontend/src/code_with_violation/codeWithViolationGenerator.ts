import * as pmdTypes from '../pmdTypes';
import CodeWithViolation from './CodeWithViolation';
import {ContentsOfFile} from '../pages/CodeFilesUpload';
import EnvironmentVariablesUtility from '../EnvironmentVariablesUtility';

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
  const directorySeparatorInBackEnd =
    EnvironmentVariablesUtility.directorySeparatorInBackEnd;
  const unixDirectorySeparator = '/';
  if (directorySeparatorInBackEnd === unixDirectorySeparator) {
    return path;
  }
  return path.replaceAll(directorySeparatorInBackEnd, unixDirectorySeparator);
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
  const index = pathWithTemporaryDirectory.indexOf(
    EnvironmentVariablesUtility.directorySeparatorInBackEnd
  );
  return pathWithTemporaryDirectory.substring(index + 1);
}
