import TextSlicer from './TextSlicer';

const lines = [
  'In the beginning God created the heaven and the earth.',
  'And the earth was without form, and void; and darkness was upon the face of the deep.',
  'And the Spirit of God moved upon the face of the waters.',
];
const endOfLine = '\n';
let textSlicer: TextSlicer;

beforeEach(() => {
  textSlicer = new TextSlicer(lines);
});

test('nothing set', () => {
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected =
    'In the beginning God created the heaven and the earth.' +
    endOfLine +
    'And the earth was without form, and void; and darkness was upon the face of the deep.' +
    endOfLine +
    'And the Spirit of God moved upon the face of the waters.';

  expect(actual).toBe(expected);
});

test('all set to zero', () => {
  textSlicer.startLine = 0;
  textSlicer.endLine = 0;
  textSlicer.startColumn = 0;
  textSlicer.endColumn = 0;

  expect(textSlicer.getJoinedSlicedSelection).toThrowError(TypeError);
});

test('only columns set', () => {
  textSlicer.startColumn = 0;
  textSlicer.endColumn = 13;
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected =
    'In the beginning God created the heaven and the earth.' +
    endOfLine +
    'And the earth was without form, and void; and darkness was upon the face of the deep.' +
    endOfLine +
    'And the Spiri';

  expect(actual).toBe(expected);
});

test('first line', () => {
  textSlicer.startLine = 0;
  textSlicer.endLine = 1;
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected = 'In the beginning God created the heaven and the earth.';

  expect(actual).toBe(expected);
});

test('middle line', () => {
  textSlicer.startLine = 1;
  textSlicer.endLine = 2;
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected =
    'And the earth was without form, and void; and darkness was upon the face of the deep.';

  expect(actual).toBe(expected);
});

test('last line', () => {
  textSlicer.startLine = 2;
  textSlicer.endLine = 3;
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected = 'And the Spirit of God moved upon the face of the waters.';

  expect(actual).toBe(expected);
});

test('last line using negative', () => {
  textSlicer.startLine = -1;
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected = 'And the Spirit of God moved upon the face of the waters.';

  expect(actual).toBe(expected);
});

test('all lines', () => {
  textSlicer.startLine = 0;
  textSlicer.endLine = 3;
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected =
    'In the beginning God created the heaven and the earth.' +
    endOfLine +
    'And the earth was without form, and void; and darkness was upon the face of the deep.' +
    endOfLine +
    'And the Spirit of God moved upon the face of the waters.';

  expect(actual).toBe(expected);
});

test('first line with columns', () => {
  textSlicer.startLine = 0;
  textSlicer.endLine = 1;
  textSlicer.startColumn = 0;
  textSlicer.endColumn = 13;
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected = 'In the beginn';

  expect(actual).toBe(expected);
});

test('middle line with columns', () => {
  textSlicer.startLine = 1;
  textSlicer.endLine = 2;
  textSlicer.startColumn = 0;
  textSlicer.endColumn = 13;
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected = 'And the earth';

  expect(actual).toBe(expected);
});

test('last line with columns', () => {
  textSlicer.startLine = 2;
  textSlicer.endLine = 3;
  textSlicer.startColumn = 0;
  textSlicer.endColumn = 13;
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected = 'And the Spiri';

  expect(actual).toBe(expected);
});

test('last line using negative with columns', () => {
  textSlicer.startLine = -1;
  textSlicer.startColumn = 0;
  textSlicer.endColumn = 13;
  const actual = textSlicer.getJoinedSlicedSelection();
  const expected = 'And the Spiri';

  expect(actual).toBe(expected);
});
