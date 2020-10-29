import DataClassCreator from '../DataClassCreator';
import CodeSmellCreator from '../../CodeSmellCreator';
import CodeSmell from '../../CodeSmell';

test('get description', () => {
  const codeSmell = createCodeSmell();

  const actual = codeSmell.getDescription();
  const expected = 'A classe "DataClass" é uma classe de dados.';

  expect(actual).toBe(expected);
});

function createCodeSmell(): CodeSmell {
  const code = getCode();
  const codeSmellCreator: CodeSmellCreator = new DataClassCreator(code);
  return codeSmellCreator.create();
}

function getCode(): string[] {
  const code =
    'class DataClass {\n' +
    '\n' +
    '    public int bar = 0;\n' +
    '    public int na = 0;\n' +
    '    public int bee = 0;\n' +
    '  \n' +
    '    public void setBee(int n) {\n' +
    '      bee = n;\n' +
    '    }\n' +
    '  }';
  return code.split('\n');
}
