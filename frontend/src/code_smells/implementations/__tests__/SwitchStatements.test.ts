import CodeSmellCreator from '../../CodeSmellCreator';
import CodeSmell from '../../CodeSmell';
import SwitchStatementsCreator from '../SwitchStatementsCreator';

test('get description', () => {
  const codeSmell = createCodeSmell();

  const actual = codeSmell.getDescription();
  const expected = 'A classe "DataClass" é uma classe de dados.';

  expect(actual).toBe(expected);
});

function createCodeSmell(): CodeSmell {
  const code = getCode();
  const codeSmellCreator: CodeSmellCreator = new SwitchStatementsCreator(code);
  return codeSmellCreator.create();
}

function getCode() {
  return `switch (x) {
      case 1: {
        System.out.println("");
        System.out.println("");
        System.out.println("");
        break;
      } case 2: {
        System.out.println("");
        System.out.println("");
        System.out.println("");
        break;
      }
    }`;
}
