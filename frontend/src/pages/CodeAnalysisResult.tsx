import React from 'react';
import VerticalTabs from '../components/vertical_tabs/VerticalTabs';
import Entries from '../components/vertical_tabs/Entries';
import {codeWithViolationGenerator} from '../codeWithViolationGenerator';
import * as pmdOutput from '../pmdOutput';
import {RouteComponentProps} from 'react-router-dom';
import SynchronousFile from '../SynchronousFile';

type Props = {
  report: pmdOutput.Report;
  synchronousFiles: SynchronousFile[];
};

export default function CodeAnalysisResult(
  props: RouteComponentProps<{}, any, Props | any> // "any" is a Workaround.
) {
  const report: pmdOutput.Report = props.location.state.report;
  const synchronousFiles: SynchronousFile[] =
    props.location.state.synchronousFiles;

  function getEntries() {
    const codeWithViolations = codeWithViolationGenerator(
      report,
      synchronousFiles
    );
    return Entries.fromGenerator(codeWithViolations);
  }

  return (
    <div className="code-analysis-result">
      <VerticalTabs entries={getEntries()} />
    </div>
  );
}

// todo remover
const tempReport = {
  formatVersion: 0,
  pmdVersion: '6.25.0',
  timestamp: '2020-08-24T16:47:07.103-03:00',
  files: [
    {
      filename:
        'C:\\Users\\gusta\\apache-tomcat-9.0.37\\temp\\6625704770189904314\\ExampleLongParameter.java',
      violations: [
        {
          beginline: 5,
          begincolumn: 24,
          endline: 7,
          endcolumn: 19,
          description: 'Avoid long parameter lists.',
          rule: 'ExcessiveParameterList',
          ruleset: 'Design',
          priority: 3,
          externalInfoUrl:
            'https://pmd.github.io/pmd-6.25.0/pmd_rules_java_design.html#excessiveparameterlist',
        },
      ],
    },
    {
      filename:
        'C:\\Users\\gusta\\apache-tomcat-9.0.37\\temp\\6625704770189904314\\ExampleTwo.java',
      violations: [
        {
          beginline: 5,
          begincolumn: 5,
          endline: 106,
          endcolumn: 5,
          description: 'Avoid really long methods.',
          rule: 'ExcessiveMethodLength',
          ruleset: 'Design',
          priority: 3,
          externalInfoUrl:
            'https://pmd.github.io/pmd-6.25.0/pmd_rules_java_design.html#excessivemethodlength',
        },
        {
          beginline: 108,
          begincolumn: 5,
          endline: 210,
          endcolumn: 5,
          description: 'Avoid really long methods.',
          rule: 'ExcessiveMethodLength',
          ruleset: 'Design',
          priority: 3,
          externalInfoUrl:
            'https://pmd.github.io/pmd-6.25.0/pmd_rules_java_design.html#excessivemethodlength',
        },
      ],
    },
    {
      filename:
        'C:\\Users\\gusta\\apache-tomcat-9.0.37\\temp\\6625704770189904314\\Example.java',
      violations: [
        {
          beginline: 5,
          begincolumn: 5,
          endline: 107,
          endcolumn: 5,
          description: 'Avoid really long methods.',
          rule: 'ExcessiveMethodLength',
          ruleset: 'Design',
          priority: 3,
          externalInfoUrl:
            'https://pmd.github.io/pmd-6.25.0/pmd_rules_java_design.html#excessivemethodlength',
        },
        {
          beginline: 109,
          begincolumn: 5,
          endline: 211,
          endcolumn: 5,
          description: 'Avoid really long methods.',
          rule: 'ExcessiveMethodLength',
          ruleset: 'Design',
          priority: 3,
          externalInfoUrl:
            'https://pmd.github.io/pmd-6.25.0/pmd_rules_java_design.html#excessivemethodlength',
        },
      ],
    },
  ],
  suppressedViolations: [],
  processingErrors: [],
  configurationErrors: [],
};

// todo remover
const tempFileContent = `package com;

public class ExampleLongParameter {

  public void addPerson(
      int birthYear, int birthMonth, int birthDate, int height, int weight, int a, int b, int c,
      int d, int e) {
    return;
  }

}`;

// todo remover
const tempFile = new File([tempFileContent], 'ExampleLongParameter.java');

// todo remover
const tempReportOneCase = {
  formatVersion: 0,
  pmdVersion: '6.25.0',
  timestamp: '2020-08-24T16:47:07.103-03:00',
  files: [
    {
      filename:
        'C:\\Users\\gusta\\apache-tomcat-9.0.37\\temp\\6625704770189904314\\ExampleLongParameter.java',
      violations: [
        {
          beginline: 5,
          begincolumn: 24,
          endline: 7,
          endcolumn: 19,
          description: 'Avoid long parameter lists.',
          rule: 'ExcessiveParameterList',
          ruleset: 'Design',
          priority: 3,
          externalInfoUrl:
            'https://pmd.github.io/pmd-6.25.0/pmd_rules_java_design.html#excessiveparameterlist',
        },
      ],
    },
  ],
  suppressedViolations: [],
  processingErrors: [],
  configurationErrors: [],
};
