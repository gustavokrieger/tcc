package br.univali.tccbackend.pmd.SwitchStatements;

import br.univali.tccbackend.pmd.PmdTest;

class NoCasesTest extends PmdTest {

  @Override
  protected String getInputCode() {
    return "public class Foo {\n"
        + "  public void bar(int x) {\n"
        + "    switch (x) {\n"
        + "    }\n"
        + "  }\n"
        + "}";
  }

}
