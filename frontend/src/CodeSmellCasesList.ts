import {CodeSmellCases} from './pages/CodeAnalysisResult';
import CodeWithViolation from './code_with_violation/CodeWithViolation';
import {JavaCodeProps} from './components/violation_case/JavaCode';
import {ViolationCaseProps} from './components/violation_case/ViolationCase';

export default class CodeSmellCasesList {
  private readonly array: CodeSmellCases[] = [];

  static fromIterable(
    CodeWithViolationList: Iterable<CodeWithViolation>
  ): CodeSmellCasesList {
    const codeSmellCasesList = new CodeSmellCasesList();
    for (const codeWithViolation of CodeWithViolationList) {
      codeSmellCasesList.addViolationCase(codeWithViolation);
    }
    return codeSmellCasesList;
  }

  getAll(): readonly CodeSmellCases[] {
    const copy = [...this.array];
    return Object.freeze(copy);
  }

  private addViolationCase(codeWithViolation: CodeWithViolation) {
    const additionalLines = 3;
    const code = codeWithViolation.getCodeThatCausedViolationAndLinesAroundIt(
      additionalLines
    );

    let startingLineNumber =
      codeWithViolation.getFirstLineOfViolation() - additionalLines;
    if (startingLineNumber < 1) {
      startingLineNumber = 1;
    }
    const javaCodeProps: JavaCodeProps = {
      children: code,
      startingLineNumber: startingLineNumber,
      lineMarkStart: codeWithViolation.getFirstLineOfViolation(),
      lineMarkEnd: codeWithViolation.getLastLineOfViolation(),
    };

    const codeSmellCreator = codeWithViolation.getCodeSmellCreator();
    const codeSmell = codeSmellCreator.create();

    const codeSmellTranslation = codeSmell.getTranslation();
    const entry = this.getOrAddByCodeSmell(codeSmellTranslation);
    const caseNumber = entry.cases.length + 1;
    const caseName = 'ocorrência ' + caseNumber;

    const codeSmellCases: ViolationCaseProps = {
      title: caseName,
      fileName: codeWithViolation.relativePath,
      description: codeSmell.getDescription(),
      javaCodeProps: javaCodeProps,
    };

    entry.cases.push(codeSmellCases);
  }

  private getOrAddByCodeSmell(codeSmell: string) {
    const entry = this.getByCodeSmell(codeSmell);
    if (entry === null) {
      return this.addWithCodeSmell(codeSmell);
    } else {
      return entry;
    }
  }

  private getByCodeSmell(codeSmell: string) {
    for (const entry of this.array) {
      if (entry.codeSmell === codeSmell) {
        return entry;
      }
    }
    return null;
  }

  private addWithCodeSmell(codeSmell: string): CodeSmellCases {
    const newEntry: CodeSmellCases = {codeSmell: codeSmell, cases: []};
    this.array.push(newEntry);
    return newEntry;
  }
}
