type Result = {
  files: Files[];
};

type Files = {
  filename: string;
  violations: Violations[];
};

type Violations = {
  beginline: number;
  begincolumn: number;
  endline: number;
  endcolumn: number;
  description: string;
  rule: string;
};

export default class PmdAnalysisResult implements IterableIterator<number> {
  private readonly pmdAnalysisResult: Result = temp;
  private readonly files = this.pmdAnalysisResult.files;
  private t: Generator<any>;

  // constructor(pmdAnalysisResult: object) {
  //   this.pmdAnalysisResult = pmdAnalysisResult;
  // }

  constructor() {
    this.t = this.counter();
  }

  *counter() {
    for (const oneCase of this.files) {
      const filename = oneCase.filename;
      yield oneCase;
    }
  }

  public next(): IteratorResult<number> {
    const current = this.t.next();
    if (current.done) {
      return this.endReturn();
    } else {
      return this.normalReturn();
    }
  }

  private endReturn(): IteratorResult<number> {
    return {
      value: null,
      done: true,
    };
  }

  private normalReturn(): IteratorResult<number> {
    return {
      value: 1,
      done: false,
    };
  }

  [Symbol.iterator](): IterableIterator<number> {
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
