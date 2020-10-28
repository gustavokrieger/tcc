package br.univali.tccbackend.pmd;

class LongMethodTest extends PmdTest {

  @Override
  protected String getInputCode() {
    return "public class LongMethod {\n"
        + "\n"
        + "    void test(){\n"
        + "        System.out.println(\"\");\n".repeat(50)
        + "    }\n"
        + "\n"
        + "}\n";
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
        + "\"endline\":54,"
        + "\"endcolumn\":5,"
        + "\"description\":\"Avoid really long methods.\","
        + "\"rule\":\"ExcessiveMethodLength\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#excessivemethodlength\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }

}
