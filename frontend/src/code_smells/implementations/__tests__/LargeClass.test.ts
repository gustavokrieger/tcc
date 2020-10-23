import LargeClassCreator from '../LargeClassCreator';
import CodeSmell from '../../CodeSmell';
import CodeSmellCreator from '../../CodeSmellCreator';

test('get description', () => {
  const codeSmell = createCodeSmell();

  const actual = codeSmell.getDescription();
  const expected = 'A classe "Foo" é uma classe de grande demais.';

  expect(actual).toBe(expected);
});

function createCodeSmell(): CodeSmell {
  const code = getCode();
  const codeSmellCreator: CodeSmellCreator = new LargeClassCreator(code);
  return codeSmellCreator.create();
}

function getCode() {
  const numberOfRepetitions = 98;
  return (
    'class Foo {\n' +
    '    public void bar1() {\n' +
    '        System.out.println("");\n'.repeat(numberOfRepetitions) +
    '    }\n' +
    '    public void bar2() {\n' +
    '        System.out.println("");\n'.repeat(numberOfRepetitions) +
    '    }\n' +
    '    public void bar3() {\n' +
    '        System.out.println("");\n'.repeat(numberOfRepetitions) +
    '    }\n' +
    '    public void bar4() {\n' +
    '        System.out.println("");\n'.repeat(numberOfRepetitions) +
    '    }\n' +
    '    public void bar5() {\n' +
    '        System.out.println("");\n'.repeat(numberOfRepetitions) +
    '    }\n' +
    '    public void bar6() {\n' +
    '        System.out.println("");\n'.repeat(numberOfRepetitions) +
    '    }\n' +
    '    public void bar7() {\n' +
    '        System.out.println("");\n'.repeat(numberOfRepetitions) +
    '    }\n' +
    '    public void bar8() {\n' +
    '        System.out.println("");\n'.repeat(numberOfRepetitions) +
    '    }\n' +
    '    public void bar9() {\n' +
    '        System.out.println("");\n'.repeat(numberOfRepetitions) +
    '    }\n' +
    '    public void bar10() {\n' +
    '        System.out.println("");\n'.repeat(numberOfRepetitions) +
    '    }\n' +
    '}\n'
  );
}
