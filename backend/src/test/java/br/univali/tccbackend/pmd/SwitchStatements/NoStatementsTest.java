package br.univali.tccbackend.pmd.SwitchStatements;

import br.univali.tccbackend.pmd.PmdTest;

class NoStatementsTest extends PmdTest {

  @Override
  protected String getInputCode() {
    return "public class Foo {\n"
        + "  public void bar(int x) {\n"
        + "    switch (x) {\n"
        + "      case 1: {\n"
        + "        \n"
        + "      } case 2: {\n"
        + "        \n"
        + "      }\n"
        + "    }\n"
        + "  }\n"
        + "}";
  }

}
