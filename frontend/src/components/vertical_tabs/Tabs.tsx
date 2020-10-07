import Button from '@material-ui/core/Button';
import React from 'react';
import {Path} from '../../pages/Path';
import {Link} from 'react-router-dom';
import CodeWithViolation from '../../code_with_violation/CodeWithViolation';
import CodeSmellCreator from '../../code_smells/CodeSmellCreator';
import {Tab} from './VerticalTabs';

export default class Tabs {
  private readonly tabs: Tab[] = [];

  static fromIterable(pmdViolations: Iterable<CodeWithViolation>): Tabs {
    const tabs = new Tabs();
    for (const pmdViolation of pmdViolations) {
      tabs.addViolationCase(pmdViolation);
    }
    return tabs;
  }

  getAll(): readonly Tab[] {
    const copy = [...this.tabs];
    return Object.freeze(copy);
  }

  private addViolationCase(codeWithViolation: CodeWithViolation) {
    const codeSmellCreator = codeWithViolation.getCodeSmellCreator();
    const label = this.getCodeSmellTranslation(codeSmellCreator);
    const tab = this.getOrAddByLabel(label);
    const caseNumber = tab.children.length + 1;
    const caseName = 'caso ' + caseNumber;
    const element = this.getViolationCaseElement(
      codeWithViolation,
      codeSmellCreator,
      caseName
    );
    tab.children.push(element);
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
    const tab = this.getByLabel(label);
    if (tab === null) {
      return this.addWithLabel(label);
    } else {
      return tab;
    }
  }

  private getByLabel(label: string) {
    for (const tab of this.tabs) {
      if (tab.label === label) {
        return tab;
      }
    }
    return null;
  }

  private addWithLabel(label: string): Tab {
    const newTab: Tab = {label: label, children: []};
    this.tabs.push(newTab);
    return newTab;
  }
}
