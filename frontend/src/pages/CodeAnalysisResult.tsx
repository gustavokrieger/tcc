import React from 'react';
import VerticalTabs from '../components/vertical_tabs/VerticalTabs';
import Button from '@material-ui/core/Button';
import {pmdViolationGenerator} from '../pmdViolationGenerator';
import Entries from '../components/vertical_tabs/Entries';

export default function CodeAnalysisResult() {
  const pmdViolations = pmdViolationGenerator(tempReport2);
  const entries = Entries.fromGenerator(pmdViolations);
  return (
    <div className="code-analysis-result">
      <VerticalTabs entries={entries} />
    </div>
  );
}

// todo remover
const tempButtons = [
  {
    label: 'zero',
    elements: [
      <Button onClick={temp}>zero_value</Button>,
      <Button onClick={temp2}>one_value</Button>,
    ],
  },
  {
    label: 'one',
    elements: [
      <Button onClick={temp}>zero_value2</Button>,
      <Button onClick={temp2}>one_value2</Button>,
    ],
  },
];

// todo remover
function temp() {
  console.log('alo');
}

// todo remover
function temp2() {
  console.log('tchau');
}

// todo remover
const tempReport = {
  formatVersion: 0,
  pmdVersion: '6.25.0',
  timestamp: '2020-08-18T16:10:57.086-03:00',
  files: [
    {
      filename:
        'C:\\Users\\gusta\\apache-tomcat-9.0.37\\temp\\3245974109159344455\\ExampleTwo.java',
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
        'C:\\Users\\gusta\\apache-tomcat-9.0.37\\temp\\3245974109159344455\\Example.java',
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

const tempReport2 = {
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
