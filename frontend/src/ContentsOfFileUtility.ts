import {ContentsOfFile} from './pages/CodeFilesUpload';

export default class ContentsOfFileUtility {
  private constructor() {}

  static async convertFiles(files: Iterable<File>) {
    const contentsOfFiles: ContentsOfFile[] = [];
    for (const file of files) {
      const text = await file.text();
      // @ts-ignore
      const relativePath = file.webkitRelativePath; // Non-standard.
      const contentsOfFile: ContentsOfFile = {text, relativePath};
      contentsOfFiles.push(contentsOfFile);
    }
    return contentsOfFiles;
  }
}
