import {Entry} from './entry';
import {PmdViolation} from '../../PmdViolation';
import Button from '@material-ui/core/Button';
import {PmdCodeSmellType} from '../../PmdCodeSmellType';
import React from 'react';

export default class Entries {
  private readonly _entries: Entry[];

  constructor() {
    this._entries = [];
  }

  get innerArray(): Entry[] {
    return this._entries;
  }

  // todo revisar desse para baixo
  static fromPmdViolationGenerator(
    pmdViolations: Generator<PmdViolation>
  ): Entries {
    const entries = new Entries();
    for (const pmdViolation of pmdViolations) {
      entries.addViolationToEntries(pmdViolation);
    }
    return entries;
  }

  private addViolationToEntries(pmdViolation: PmdViolation) {
    const label = this.translate(pmdViolation.rule);
    const entryWithLabel = this.getByLabel(label);
    let target: Entry;
    if (entryWithLabel === null) {
      target = this.addNewEntry(label);
    } else {
      target = entryWithLabel;
    }
    target.elements.push(<Button>zero_value</Button>);
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

  private getByLabel(label: string) {
    for (const entry of this._entries) {
      if (label === entry.label) {
        return entry;
      }
    }
    return null;
  }

  private addNewEntry(label: string) {
    const entry: Entry = {label: label, elements: []};
    this._entries.push(entry);
    return entry;
  }
}
