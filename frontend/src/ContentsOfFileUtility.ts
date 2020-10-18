import {ContentsOfFile} from './pages/CodeAnalysisResult';

export default class ContentsOfFileUtility {
  private constructor() {}

  static async convertFiles(files: Iterable<File>) {
    const contentsOfFiles: ContentsOfFile[] = [];
    for (const file of files) {
      const text = await file.text();
      const name = file.name;
      const contentsOfFile: ContentsOfFile = {text: text, name: name};
      contentsOfFiles.push(contentsOfFile);
    }
    return contentsOfFiles;
  }
}
