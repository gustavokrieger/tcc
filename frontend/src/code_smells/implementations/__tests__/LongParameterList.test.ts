import LongParameterList from '../LongParameterList';
import LongParameterListCreator from '../LongParameterListCreator';

test('get description', () => {
  const longParameterList = createLongParameterList();

  const actual = longParameterList.getDescription();
  const expected =
    'A lista de parametros que inicia com "int birthYear"' +
    ' e finaliza com "int e" possui 9 elementos, um número muito elevado.';

  expect(actual).toBe(expected);
});

function createLongParameterList(): LongParameterList {
  const code = getCode();
  const longParameterListCreator = new LongParameterListCreator(code);
  return longParameterListCreator.create() as LongParameterList;
}

function getCode() {
  return '(int birthYear, int birthMonth, int birthDate, int height, int weight, int a, int b, int c,int d, int e)';
}
