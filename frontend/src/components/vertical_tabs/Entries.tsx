import {Entry} from './entry';
import {PmdViolation} from '../../PmdViolation';
import Button from '@material-ui/core/Button';
import {PmdCodeSmellType} from '../../PmdCodeSmellType';
import React from 'react';
import {Path} from '../../pages/Path';
import {Link} from 'react-router-dom';

export default class Entries {
  private readonly _entries: Entry[];

  constructor() {
    this._entries = [];
  }

  get innerArray(): Entry[] {
    return this._entries;
  }

  static fromGenerator(pmdViolations: Generator<PmdViolation>): Entries {
    const entries = new Entries();
    for (const pmdViolation of pmdViolations) {
      entries.addViolation(pmdViolation);
    }
    return entries;
  }

  private addViolation(pmdViolation: PmdViolation) {
    const label = this.translate(pmdViolation.rule);
    const entry = this.getOrAddByLabel(label);
    const caseNumber = entry.elements.length + 1;
    const caseName = 'caso' + ' ' + caseNumber;
    entry.elements.push(
      <Button component={Link} to={Path.VIOLATION_CASE + '/' + caseName}>
        {caseName}
      </Button>
    );
  }

  // todo passar para outra classe
  private translate(pmdCodeSmellType: PmdCodeSmellType) {
    switch (pmdCodeSmellType) {
      case PmdCodeSmellType.LONG_METHOD:
        return 'método longo';
      case PmdCodeSmellType.LONG_PARAMETER_LIST:
        return 'lista de parâmetros longa';
    }
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
