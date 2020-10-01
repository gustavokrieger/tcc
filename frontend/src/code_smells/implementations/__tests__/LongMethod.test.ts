import LongMethod from '../LongMethod';
import LongMethodCreator from '../LongMethodCreator';

test('get description', () => {
  const longMethod = createLongMethod();

  const actual = longMethod.getDescription();
  const expected = 'O método "test" possui linhas demais.';

  expect(actual).toBe(expected);
});

function createLongMethod(): LongMethod {
  const code = getCode();
  const longMethodCreator = new LongMethodCreator(code);
  return longMethodCreator.create() as LongMethod;
}

function getCode() {
  return 'void test(){\n' + '    System.out.println("");\n'.repeat(100) + '}\n';
}
