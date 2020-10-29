import ParametersTokenizer from '../ParametersTokenizer';
import FormattedDeclaration from '../../formatted_code/FormattedDeclaration';

function createParametersTokenizer(code: string[]) {
  const formattedDeclaration = new FormattedDeclaration(code);
  return new ParametersTokenizer(formattedDeclaration);
}

test('get all, no parameters', () => {
  const code = ['()'];
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = [''];

  expect(actual).toStrictEqual(expected);
});

function getCodeWithOneParameter(betweenParts: string) {
  return [
    betweenParts,
    '(',
    betweenParts,
    'int',
    betweenParts,
    ' ',
    betweenParts,
    'a',
    betweenParts,
    ')',
    betweenParts,
  ];
}

test('get all, one parameter', () => {
  let code = getCodeWithOneParameter('');
  code = [code.join('')];
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a'];

  expect(actual).toStrictEqual(expected);
});

test('get all, one parameter, with excessive spaces', () => {
  let code = getCodeWithOneParameter(' ');
  code = [code.join('')];
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a'];

  expect(actual).toStrictEqual(expected);
});

test('get all, one parameter, with newlines', () => {
  const code = getCodeWithOneParameter('');
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a'];

  expect(actual).toStrictEqual(expected);
});

function getCodeWithTwoParameter(betweenParts: string) {
  return [
    betweenParts,
    '(',
    betweenParts,
    'int',
    betweenParts,
    ' ',
    betweenParts,
    'a',
    betweenParts,
    ',',
    betweenParts,
    ' ',
    betweenParts,
    'String',
    betweenParts,
    ' ',
    betweenParts,
    'b',
    betweenParts,
    ')',
    betweenParts,
  ];
}

test('get all, two parameters', () => {
  let code = getCodeWithTwoParameter('');
  code = [code.join('')];
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b'];

  expect(actual).toStrictEqual(expected);
});

test('get all, two parameters, with excessive spaces', () => {
  let code = getCodeWithTwoParameter(' ');
  code = [code.join('')];
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b'];

  expect(actual).toStrictEqual(expected);
});

test('get all, two parameters, with newlines', () => {
  const code = getCodeWithTwoParameter('');
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b'];

  expect(actual).toStrictEqual(expected);
});

function getCodeWithThreeParameter(betweenParts: string) {
  return [
    betweenParts,
    '(',
    betweenParts,
    'int',
    betweenParts,
    ' ',
    betweenParts,
    'a',
    betweenParts,
    ',',
    betweenParts,
    ' ',
    betweenParts,
    'String',
    betweenParts,
    ' ',
    betweenParts,
    'b',
    betweenParts,
    ',',
    betweenParts,
    ' ',
    betweenParts,
    'int',
    betweenParts,
    '[',
    betweenParts,
    ']',
    betweenParts,
    ' ',
    betweenParts,
    'c',
    betweenParts,
    ')',
    betweenParts,
  ];
}

test('get all, three parameters', () => {
  let code = getCodeWithThreeParameter('');
  code = [code.join('')];
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b', 'int[] c'];

  expect(actual).toStrictEqual(expected);
});

test('get all, three parameters, with excessive spaces', () => {
  let code = getCodeWithThreeParameter(' ');
  code = [code.join('')];
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b', 'int [ ] c'];

  expect(actual).toStrictEqual(expected);
});

test('get all, three parameters, with newlines', () => {
  const code = getCodeWithThreeParameter('');
  const parametersTokenizer = createParametersTokenizer(code);

  const actual = parametersTokenizer.getAll();
  const expected = ['int a', 'String b', 'int [ ] c'];

  expect(actual).toStrictEqual(expected);
});
