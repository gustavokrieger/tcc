import ParametersTokenizer from '../ParametersTokenizer';
import FormattedSignature from '../../formatted_code/FormattedSignature';

const endOfLine = '\n';

function createParametersTokenizer(code: string) {
  const formattedSignature = new FormattedSignature(code);
  return new ParametersTokenizer(formattedSignature);
}

test('get all, no parameters', () => {
  const code = '()';
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = [''];

  expect(actual).toStrictEqual(expected);
});

function getCodeWithOneParameter(betweenParts: string) {
  return (
    betweenParts +
    '(' +
    betweenParts +
    'int' +
    betweenParts +
    ' ' +
    betweenParts +
    'a' +
    betweenParts +
    ')' +
    betweenParts
  );
}

test('get all, one parameter', () => {
  const code = getCodeWithOneParameter('');
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a'];

  expect(actual).toStrictEqual(expected);
});

test('get all, one parameter, with excessive spaces', () => {
  const code = getCodeWithOneParameter(' ');
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a'];

  expect(actual).toStrictEqual(expected);
});

test('get all, one parameter, with newlines', () => {
  const code = getCodeWithOneParameter(endOfLine);
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a'];

  expect(actual).toStrictEqual(expected);
});

function getCodeWithTwoParameter(betweenParts: string) {
  return (
    betweenParts +
    '(' +
    betweenParts +
    'int' +
    betweenParts +
    ' ' +
    betweenParts +
    'a' +
    betweenParts +
    ',' +
    betweenParts +
    ' ' +
    betweenParts +
    'String' +
    betweenParts +
    ' ' +
    betweenParts +
    'b' +
    betweenParts +
    ')' +
    betweenParts
  );
}

test('get all, two parameters', () => {
  const code = getCodeWithTwoParameter('');
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b'];

  expect(actual).toStrictEqual(expected);
});

test('get all, two parameters, with excessive spaces', () => {
  const code = getCodeWithTwoParameter(' ');
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b'];

  expect(actual).toStrictEqual(expected);
});

test('get all, two parameters, with newlines', () => {
  const code = getCodeWithTwoParameter(endOfLine);
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b'];

  expect(actual).toStrictEqual(expected);
});

function getCodeWithThreeParameter(betweenParts: string) {
  return (
    betweenParts +
    '(' +
    betweenParts +
    'int' +
    betweenParts +
    ' ' +
    betweenParts +
    'a' +
    betweenParts +
    ',' +
    betweenParts +
    ' ' +
    betweenParts +
    'String' +
    betweenParts +
    ' ' +
    betweenParts +
    'b' +
    betweenParts +
    ',' +
    betweenParts +
    ' ' +
    betweenParts +
    'int' +
    betweenParts +
    '[' +
    betweenParts +
    ']' +
    betweenParts +
    ' ' +
    betweenParts +
    'c' +
    betweenParts +
    ')' +
    betweenParts
  );
}

test('get all, three parameters', () => {
  const code = getCodeWithThreeParameter('');
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b', 'int[] c'];

  expect(actual).toStrictEqual(expected);
});

test('get all, three parameters, with excessive spaces', () => {
  const code = getCodeWithThreeParameter(' ');
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b', 'int [ ] c'];

  expect(actual).toStrictEqual(expected);
});

test('get all, three parameters, with newlines', () => {
  const code = getCodeWithThreeParameter(endOfLine);
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b', 'int [ ] c'];

  expect(actual).toStrictEqual(expected);
});
