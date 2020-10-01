import LargeClass from '../LargeClass';
import LargeClassCreator from '../LargeClassCreator';

test('get description', () => {
  const largeClass = createLargeClass();

  const actual = largeClass.getDescription();
  const expected = 'A classe "Foo" é uma classe de grande demais.';

  expect(actual).toBe(expected);
});

function createLargeClass(): LargeClass {
  const code = getCode();
  const largeClassCreator = new LargeClassCreator(code);
  return largeClassCreator.create() as LargeClass;
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
