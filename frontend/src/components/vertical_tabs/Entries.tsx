import {Entry} from './entry';
import Button from '@material-ui/core/Button';
import React from 'react';
import {Path} from '../../pages/Path';
import {Link} from 'react-router-dom';
import CodeWithViolation from '../../code_with_violation/CodeWithViolation';
import CodeSmellCreator from '../../code_smells/CodeSmellCreator';

export default class Entries {
  private readonly _entries: Entry[] = [];

  get innerEntries(): Entry[] {
    return this._entries;
  }

  static fromGenerator(pmdViolations: Generator<CodeWithViolation>): Entries {
    const entries = new Entries();
    for (const pmdViolation of pmdViolations) {
      entries.addViolationCase(pmdViolation);
    }
    return entries;
  }

  private addViolationCase(codeWithViolation: CodeWithViolation) {
    const codeSmellCreator = codeWithViolation.getCodeSmellCreator();
    const label = this.getCodeSmellTranslation(codeSmellCreator);
    const entry = this.getOrAddByLabel(label);
    const caseNumber = entry.elements.length + 1;
    const caseName = 'caso ' + caseNumber;
    const element = this.getViolationCaseElement(
      codeWithViolation,
      codeSmellCreator,
      caseName
    );
    entry.elements.push(element);
  }

  private getCodeSmellTranslation(codeSmellCreator: CodeSmellCreator) {
    const codeSmell = codeSmellCreator.create();
    return codeSmell.getTranslation();
  }

  private getViolationCaseElement(
    codeWithViolation: CodeWithViolation,
    codeSmellCreator: CodeSmellCreator,
    caseName: string
  ): JSX.Element {
    return (
      <Button
        component={Link}
        to={{
          pathname: Path.VIOLATION_CASE + '/' + caseName,
          state: {
            codeWithViolation: codeWithViolation,
            codeSmellCreator: codeSmellCreator,
          },
        }}
      >
        {caseName}
      </Button>
    );
  }

  private getOrAddByLabel(label: string) {
    const entry = this.getByLabel(label);
    if (entry === null) {
      return this.addWithLabel(label);
    } else {
      return entry;
    }
  }

  private getByLabel(label: string) {
    for (const entry of this._entries) {
      if (entry.label === label) {
        return entry;
      }
    }
    return null;
  }

  private addWithLabel(label: string): Entry {
    const newEntry: Entry = {label: label, elements: []};
    this._entries.push(newEntry);
    return newEntry;
  }
}
