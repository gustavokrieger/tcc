import TextSlicer from '../TextSlicer';

const lines = [
  'In the beginning God created the heaven and the earth.',
  'And the earth was without form, and void; and darkness was upon the face of the deep.',
  'And the Spirit of God moved upon the face of the waters.',
];
let textSlicer: TextSlicer;

beforeEach(() => {
  textSlicer = new TextSlicer(lines);
});

test('nothing set', () => {
  const actual = textSlicer.slice();

  expect(actual).toStrictEqual(lines);
});

test('all set to zero', () => {
  expect(() => {
    textSlicer.slice(0, 0, 0, 0);
  }).toThrowError(TypeError);
});

test('only columns set', () => {
  const actual = textSlicer.slice(undefined, undefined, 0, 13);
  const expected = [
    'In the beginning God created the heaven and the earth.',
    'And the earth was without form, and void; and darkness was upon the face of the deep.',
    'And the Spiri',
  ];

  expect(actual).toStrictEqual(expected);
});

test('first line', () => {
  const actual = textSlicer.slice(0, 1);
  const expected = ['In the beginning God created the heaven and the earth.'];

  expect(actual).toStrictEqual(expected);
});

test('middle line', () => {
  const actual = textSlicer.slice(1, 2);
  const expected = [
    'And the earth was without form, and void; and darkness was upon the face of the deep.',
  ];

  expect(actual).toStrictEqual(expected);
});

test('last line', () => {
  const actual = textSlicer.slice(2, 3);
  const expected = ['And the Spirit of God moved upon the face of the waters.'];

  expect(actual).toStrictEqual(expected);
});

test('last line using negative', () => {
  const actual = textSlicer.slice(-1);
  const expected = ['And the Spirit of God moved upon the face of the waters.'];

  expect(actual).toStrictEqual(expected);
});

test('all lines', () => {
  const actual = textSlicer.slice(0, 3);
  const expected = [
    'In the beginning God created the heaven and the earth.',
    'And the earth was without form, and void; and darkness was upon the face of the deep.',
    'And the Spirit of God moved upon the face of the waters.',
  ];

  expect(actual).toStrictEqual(expected);
});

test('first line with columns', () => {
  const actual = textSlicer.slice(0, 1, 0, 13);
  const expected = ['In the beginn'];

  expect(actual).toStrictEqual(expected);
});

test('middle line with columns', () => {
  const actual = textSlicer.slice(1, 2, 0, 13);
  const expected = ['And the earth'];

  expect(actual).toStrictEqual(expected);
});

test('last line with columns', () => {
  const actual = textSlicer.slice(2, 3, 0, 13);
  const expected = ['And the Spiri'];

  expect(actual).toStrictEqual(expected);
});

test('last line using negative with columns', () => {
  const actual = textSlicer.slice(-1, undefined, 0, 13);
  const expected = ['And the Spiri'];

  expect(actual).toStrictEqual(expected);
});
