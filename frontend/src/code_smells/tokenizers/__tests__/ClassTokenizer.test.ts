import ClassTokenizer from '../ClassTokenizer';
import FormattedDeclaration from '../../formatted_code/FormattedDeclaration';

function testGetName(code: string[]) {
  const formattedDeclaration = new FormattedDeclaration(code);
  const classTokenizer = new ClassTokenizer(formattedDeclaration);

  const actual = classTokenizer.getName();
  const expected = 'Test';

  expect(actual).toBe(expected);
}

test('get name', () => {
  const code = [
    'class Test {',
    '    private int a = 0;',
    '',
    '    public void setA(int a) {',
    '      this.a = a;',
    '    }',
    '  }',
  ];
  testGetName(code);
});

test('get name, one line class', () => {
  const code = [
    'class Test{private int a=0;public void setA(int a){this.a=a;}}',
  ];
  testGetName(code);
});

test('get name, with excessive spaces', () => {
  const code = [
    'class   Test   { ',
    '     private   int   a   =   0 ; ',
    '',
    '     public   void   setA ( int   a )   { ',
    '       this . a   =   a ; ',
    '     } ',
    '   } ',
  ];
  testGetName(code);
});

test('get name, with newlines', () => {
  const code = [
    '',
    'class',
    ' ',
    'Test',
    ' ',
    '{',
    '',
    '    ',
    'private',
    ' ',
    'int',
    ' ',
    'a',
    ' ',
    '=',
    ' ',
    '0',
    ';',
    '',
    '',
    '    ',
    'public',
    ' ',
    'void',
    ' ',
    'setA',
    '(',
    'int',
    ' ',
    'a',
    ')',
    ' ',
    '{',
    '',
    '      ',
    'this',
    '.',
    'a',
    ' =',
    ' ',
    'a',
    ';',
    '',
    '    ',
    '}',
    '',
    '  ',
    '}',
    '',
  ];
  testGetName(code);
});
