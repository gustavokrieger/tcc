import {CodeAnalysisResultProps} from './pages/CodeAnalysisResult';
import ContentsOfFileUtility from './ContentsOfFileUtility';
import {codeWithViolationGenerator} from './code_with_violation/codeWithViolationGenerator';
import CodeSmellCasesList from './CodeSmellCasesList';
import CodeAnalysisRequester from './CodeAnalysisRequester';
import JavaFiles from './JavaFiles';

export default class CodeAnalysisResultUtility {
  private constructor() {}

  static async convertFilesToProps(
    javaFiles: JavaFiles
  ): Promise<CodeAnalysisResultProps> {
    const report = await this.requestReport(javaFiles);
    const contentsOfFiles = await ContentsOfFileUtility.convertFiles(
      javaFiles.getAll()
    );
    const codeWithViolations = codeWithViolationGenerator(
      report.files,
      contentsOfFiles
    );
    const codeSmellCasesList = CodeSmellCasesList.fromIterable(
      codeWithViolations
    );
    return {codeSmellCasesList: codeSmellCasesList.getAll()};
  }

  private static async requestReport(javaFiles: JavaFiles) {
    const codeAnalysisRequester = new CodeAnalysisRequester(javaFiles);
    return codeAnalysisRequester.sendAndGetReport();
  }
}
