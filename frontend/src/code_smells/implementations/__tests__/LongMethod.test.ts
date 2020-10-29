import LongMethodCreator from '../LongMethodCreator';
import CodeSmell from '../../CodeSmell';
import CodeSmellCreator from '../../CodeSmellCreator';

test('get description', () => {
  const codeSmell = createCodeSmell();

  const actual = codeSmell.getDescription();
  const expected = 'O método "test" possui linhas demais.';

  expect(actual).toBe(expected);
});

function createCodeSmell(): CodeSmell {
  const code = getCode();
  const codeSmellCreator: CodeSmellCreator = new LongMethodCreator(code);
  return codeSmellCreator.create();
}

function getCode() {
  const code =
    'void test(){\n' + '    System.out.println("");\n'.repeat(100) + '}\n';
  return code.split('\n');
}
