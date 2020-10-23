import LongParameterListCreator from '../LongParameterListCreator';
import CodeSmell from '../../CodeSmell';
import CodeSmellCreator from '../../CodeSmellCreator';

test('get description', () => {
  const codeSmell = createCodeSmell();

  const actual = codeSmell.getDescription();
  const expected =
    'A lista de parametros que inicia com "int birthYear"' +
    ' e finaliza com "int e" possui 9 elementos, um número muito elevado.';

  expect(actual).toBe(expected);
});

function createCodeSmell(): CodeSmell {
  const code = getCode();
  const codeSmellCreator: CodeSmellCreator = new LongParameterListCreator(code);
  return codeSmellCreator.create();
}

function getCode() {
  return '(int birthYear, int birthMonth, int birthDate, int height, int weight, int a, int b, int c,int d, int e)';
}
