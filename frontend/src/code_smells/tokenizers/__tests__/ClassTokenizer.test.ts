import ClassTokenizer from '../ClassTokenizer';
import FormattedSignature from '../../formatted_code/FormattedSignature';

const endOfLine = '\n'; // todo passar para test helper

function testGetName(code: string) {
  const formattedSignature = new FormattedSignature(code);
  const classTokenizer = new ClassTokenizer(formattedSignature);

  const actual = classTokenizer.getName();
  const expected = 'Test';

  expect(actual).toBe(expected);
}

test('get name', () => {
  const code = `
  class Test {
    private int a = 0;

    public void setA(int a) {
      this.a = a;
    }
  }`;
  testGetName(code);
});

test('get name, one line class', () => {
  const code = 'class Test{private int a=0;public void setA(int a){this.a=a;}}';
  testGetName(code);
});

test('get name, with excessive spaces', () => {
  const code = `
   class   Test   { 
     private   int   a   =   0 ; 

     public   void   setA ( int   a )   { 
       this . a   =   a ; 
     } 
   } `;
  testGetName(code);
});

test('get name, with newlines', () => {
  const code = `
  ${endOfLine}class${endOfLine} ${endOfLine}Test${endOfLine} ${endOfLine}{${endOfLine}
    ${endOfLine}private${endOfLine} ${endOfLine}int${endOfLine} ${endOfLine}a${endOfLine} ${endOfLine}=${endOfLine} ${endOfLine}0${endOfLine};${endOfLine}

    ${endOfLine}public${endOfLine} ${endOfLine}void${endOfLine} ${endOfLine}setA${endOfLine}(${endOfLine}int${endOfLine} ${endOfLine}a${endOfLine})${endOfLine} ${endOfLine}{${endOfLine}
      ${endOfLine}this${endOfLine}.${endOfLine}a${endOfLine} =${endOfLine} ${endOfLine}a${endOfLine};${endOfLine}
    ${endOfLine}}${endOfLine}
  ${endOfLine}}${endOfLine}`;
  testGetName(code);
});
