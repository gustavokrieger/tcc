import MethodCallTokenizer from '../MethodCallTokenizer';
import FormattedCall from '../../formatted_code/FormattedCall';

function getParts(code: string): string[] {
  const formattedCall = new FormattedCall(code);
  const methodCallTokenizer = new MethodCallTokenizer(formattedCall);
  return methodCallTokenizer.getParts();
}

test('one call', () => {
  const code = 'c.doIt()';
  const actual = getParts(code);
  const expected = ['c', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('one call with linebreak', () => {
  const code = `c
  . doIt()`;
  const actual = getParts(code);
  const expected = ['c', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('one call with parameter', () => {
  const code = 'o.setName("my name")';
  const actual = getParts(code);
  const expected = ['o', 'setName()'];

  expect(actual).toStrictEqual(expected);
});

test('one call with parameter and linebreak', () => {
  const code = `o .
  setName(
  "my name" )`;
  const actual = getParts(code);
  const expected = ['o', 'setName()'];

  expect(actual).toStrictEqual(expected);
});

test('two calls', () => {
  const code = 'b.doC().doIt()';
  const actual = getParts(code);
  const expected = ['b', 'doC()', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('two calls with linebreak', () => {
  const code = `b.
  doC().
  doIt()`;
  const actual = getParts(code);
  const expected = ['b', 'doC()', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('two calls with parameters', () => {
  const code = 'b.doC("hiy").doIt("bye")';
  const actual = getParts(code);
  const expected = ['b', 'doC()', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('two calls with parameters and linebreak', () => {
  const code = `b
  .doC(  "hiy"  )
  .doIt(
  "bye"
  )`;
  const actual = getParts(code);
  const expected = ['b', 'doC()', 'doIt()'];

  expect(actual).toStrictEqual(expected);
});

test('one variable call and one method call', () => {
  const code = 'B.a.doStatic()';
  const actual = getParts(code);
  const expected = ['B', 'a', 'doStatic()'];

  expect(actual).toStrictEqual(expected);
});

test('one variable call and one method call with parameter', () => {
  const code = 'B.a.doStatic("hi")';
  const actual = getParts(code);
  const expected = ['B', 'a', 'doStatic()'];

  expect(actual).toStrictEqual(expected);
});

test('one variable call and one method call with parameter and linebreak', () => {
  const code = `B
  .a
  .doStatic(
  'i'
   )`;
  const actual = getParts(code);
  const expected = ['B', 'a', 'doStatic()'];

  expect(actual).toStrictEqual(expected);
});
