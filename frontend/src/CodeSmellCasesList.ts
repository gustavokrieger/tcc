import {CodeSmellCases} from './pages/CodeAnalysisResult2';
import CodeWithViolation from './code_with_violation/CodeWithViolation';
import {JavaCodeProps} from './components/ViolationCase/JavaCode';
import {ViolationCaseProps} from './components/ViolationCase/ViolationCase3';

export default class CodeSmellCasesList {
  private readonly list: CodeSmellCases[] = [];

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
    const copy = [...this.list];
    return Object.freeze(copy);
  }

  private addViolationCase(codeWithViolation: CodeWithViolation) {
    const code =
      codeWithViolation.getCodeBeforeViolation() +
      codeWithViolation.getCodeThatCausedViolation() +
      codeWithViolation.getCodeAfterViolation(); // todo trocar para ser parte do codigo antes e depois

    const javaCodeProps: JavaCodeProps = {
      children: code,
      startingLineNumber: 1, //todo mudar para ser dinamico
      lineMarkStart: codeWithViolation.getFirstLineOfViolation(),
      lineMarkEnd: codeWithViolation.getLastLineOfViolation(),
    };

    const codeSmell = this.getCodeSmellTranslation(codeWithViolation);
    const entry = this.getOrAddByCodeSmell(codeSmell);
    const caseNumber = entry.cases.length + 1;
    const caseName = 'caso ' + caseNumber;

    const codeSmellCases: ViolationCaseProps = {
      title: caseName,
      fileName: codeWithViolation.fullPath,
      description: 'temp', //todo mudar para ser dinamico
      javaCodeProps: javaCodeProps,
    };

    entry.cases.push(codeSmellCases);
  }

  private getCodeSmellTranslation(codeWithViolation: CodeWithViolation) {
    const codeSmellCreator = codeWithViolation.getCodeSmellCreator();
    const codeSmell = codeSmellCreator.create();
    return codeSmell.getTranslation();
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
    for (const entry of this.list) {
      if (entry.codeSmell === codeSmell) {
        return entry;
      }
    }
    return null;
  }

  private addWithCodeSmell(codeSmell: string): CodeSmellCases {
    const newEntry: CodeSmellCases = {codeSmell: codeSmell, cases: []};
    this.list.push(newEntry);
    return newEntry;
  }
}
