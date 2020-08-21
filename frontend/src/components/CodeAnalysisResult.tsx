import React from 'react';
import VerticalTabs from './VerticalTabs';
import Button from '@material-ui/core/Button';

export default function CodeAnalysisResult() {
  return (
    <div className="code-analysis-result">
      <VerticalTabs elements={tempButtons} />
    </div>
  );
}

// todo remover
const tempButtons = [
  {
    label: 'zero',
    values: [
      <Button key="zero_value" onClick={temp}>
        zero_value
      </Button>,
      <Button key="one_value" onClick={temp2}>
        one_value
      </Button>,
    ],
  },
  {
    label: 'one',
    values: [
      <Button key="two_value" onClick={temp}>
        two_value
      </Button>,
      <Button key="three_value" onClick={temp2}>
        three_value
      </Button>,
    ],
  },
];

function temp() {
  console.log('alo');
}

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
