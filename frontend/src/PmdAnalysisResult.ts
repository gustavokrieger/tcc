type Result = {
  files: File[];
};

type File = {
  filename: string;
  violations: Violation[];
};

type Violation = {
  beginline: number;
  begincolumn: number;
  endline: number;
  endcolumn: number;
  description: string;
  rule: string;
};

type CompleteViolation = Violation & {
  filename: string;
};

export default class PmdAnalysisResult
  implements IterableIterator<CompleteViolation> {
  private readonly pmdAnalysisResult: Result = temp;
  private readonly files = this.pmdAnalysisResult.files;
  private t = this.counter();

  // constructor(pmdAnalysisResult: object) {
  //   this.pmdAnalysisResult = pmdAnalysisResult;
  // }

  *counter(): Generator<CompleteViolation> {
    for (const file of this.files) {
      const filename = file.filename;
      const violations = file.violations;
      for (const violation of violations) {
        yield {filename: filename, ...violation};
      }
    }
  }

  public next(): IteratorResult<CompleteViolation> {
    const current = this.t.next();
    if (current.done) {
      return this.endReturn();
    } else {
      return this.normalReturn(current.value);
    }
  }

  private endReturn(): IteratorResult<CompleteViolation> {
    return {
      value: null,
      done: true,
    };
  }

  private normalReturn(
    completeViolation: CompleteViolation
  ): IteratorResult<CompleteViolation> {
    // todo fazer retornar apenas os que estão no type
    return {
      value: completeViolation,
      done: false,
    };
  }

  [Symbol.iterator](): IterableIterator<CompleteViolation> {
    return this;
  }
}

// todo remover
const temp = {
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
