import DataClass from '../DataClass';
import DataClassCreator from '../DataClassCreator';

test('get description', () => {
  const dataClass = createDataClass();

  const actual = dataClass.getDescription();
  const expected = 'A classe "DataClass" é uma classe de dados.';

  expect(actual).toBe(expected);
});

function createDataClass(): DataClass {
  const code = getCode();
  const dataClassCreator = new DataClassCreator(code);
  return dataClassCreator.create() as DataClass;
}

function getCode() {
  return `
  class DataClass {

    public int bar = 0;
    public int na = 0;
    public int bee = 0;
  
    public void setBee(int n) {
      bee = n;
    }
  }`;
}
