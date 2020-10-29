import CodeSmellCreator from '../../CodeSmellCreator';
import CodeSmell from '../../CodeSmell';
import SwitchStatementsCreator from '../SwitchStatementsCreator';

test('get description', () => {
  const codeSmell = createCodeSmell();

  const actual = codeSmell.getDescription();
  const expected = 'A classe "DataClass" é uma classe de dados.';

  expect(actual).toBe(expected);
});

function createCodeSmell(): CodeSmell {
  const code = getCode();
  const codeSmellCreator: CodeSmellCreator = new SwitchStatementsCreator(code);
  return codeSmellCreator.create();
}

function getCode() {
  const code =
    'switch (x) {\n' +
    '      case 1: {\n' +
    '        System.out.println("");\n' +
    '        System.out.println("");\n' +
    '        System.out.println("");\n' +
    '        break;\n' +
    '      } case 2: {\n' +
    '        System.out.println("");\n' +
    '        System.out.println("");\n' +
    '        System.out.println("");\n' +
    '        break;\n' +
    '      }\n' +
    '    }';
  return code.split('\n');
}
