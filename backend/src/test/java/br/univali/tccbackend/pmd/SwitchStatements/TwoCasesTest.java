package br.univali.tccbackend.pmd.SwitchStatements;

import br.univali.tccbackend.pmd.PmdTest;

class TwoCasesTest extends PmdTest {

  @Override
  protected String getInputCode() {
    return "public class Foo {\n"
        + "  public void bar(int x) {\n"
        + "    switch (x) {\n"
        + "      case 1: {\n"
        + "        System.out.println(\"\");\n".repeat(3)
        + "        break;\n"
        + "      } case 2: {\n"
        + "        System.out.println(\"\");\n".repeat(3)
        + "        break;\n"
        + "      }\n"
        + "    }\n"
        + "  }\n"
        + "}";
  }

  @Override
  protected String getExpectedResult() {
    return "{\"formatVersion\":0,"
        + "\"pmdVersion\":\"" + PMD_VERSION + "\","
        + "\"timestamp\":\"\","
        + "\"files\":["
        + "{\"filename\":\"\","
        + "\"violations\":["
        + "{\"beginline\":3,"
        + "\"begincolumn\":5,"
        + "\"endline\":15,"
        + "\"endcolumn\":5,"
        + "\"description\":\"A high ratio of statements to labels in a switch statement.  Consider refactoring.\","
        + "\"rule\":\"SwitchDensity\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#switchdensity\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }
}
