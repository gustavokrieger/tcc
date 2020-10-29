import MethodSignatureTokenizer from '../MethodSignatureTokenizer';
import FormattedDeclaration from '../../formatted_code/FormattedDeclaration';

function testGetName(code: string[]) {
  const formattedDeclaration = new FormattedDeclaration(code);
  const methodSignatureTokenizer = new MethodSignatureTokenizer(
    formattedDeclaration
  );

  const actual = methodSignatureTokenizer.getName();
  const expected = 'test';

  expect(actual).toBe(expected);
}

test('get name', () => {
  const code = ['void test() {', '    System.out.println("hi");', '  }'];
  testGetName(code);
});

test('get name, one line method', () => {
  const code = ['void test(){System.out.println("hi");}'];
  testGetName(code);
});

test('get name, with parameter', () => {
  const code = ['void test(int a) {', '    System.out.println("hi");', '  }'];
  testGetName(code);
});

test('get name, with excessive spaces', () => {
  const code = [
    'void  test ( )  { ',
    '     System.out.println ( "hi" ) ;',
    '   } ',
  ];
  testGetName(code);
});

test('get name, with newlines', () => {
  const code = [
    '',
    'void',
    ' ',
    'test',
    '(',
    ')',
    ' ',
    '{',
    '',
    '    ',
    'System.out.println',
    '(',
    '"hi"',
    ')',
    ';',
    '',
    '  ',
    '}',
    '',
  ];
  testGetName(code);
});
