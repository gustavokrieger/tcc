import FeatureEnvyCreator from '../FeatureEnvyCreator';
import CodeSmellCreator from '../../CodeSmellCreator';
import CodeSmell from '../../CodeSmell';

test('get description', () => {
  const codeSmell = createCodeSmell();

  const actual = codeSmell.getDescription();
  const expected = 'A classe "DataClass" é uma classe de dados.';

  expect(actual).toBe(expected);
});

function createCodeSmell(): CodeSmell {
  const code = getCode();
  const codeSmellCreator: CodeSmellCreator = new FeatureEnvyCreator(code);
  return codeSmellCreator.create();
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
