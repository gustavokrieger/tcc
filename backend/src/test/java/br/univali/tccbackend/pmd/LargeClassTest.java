package br.univali.tccbackend.pmd;

class LargeClassTest extends PmdTest {

  @Override
  String getInputCode() {
    String method = "\n"
        + "    public void bar() {\n"
        + "        System.out.println(\"\");\n".repeat(48)
        + "    }\n"
        + "\n";
    return "public class Foo {\n"
        + method.repeat(10)
        + "}\n";
  }

  @Override
  String getExpectedResult() {
    return "{\"formatVersion\":0,"
        + "\"pmdVersion\":\"" + PMD_VERSION + "\","
        + "\"timestamp\":\"\","
        + "\"files\":["
        + "{\"filename\":\"\","
        + "\"violations\":["
        + "{\"beginline\":1,"
        + "\"begincolumn\":8,"
        + "\"endline\":522,"
        + "\"endcolumn\":1,"
        + "\"description\":\"Avoid really long classes.\","
        + "\"rule\":\"ExcessiveClassLength\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#excessiveclasslength\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }
}
