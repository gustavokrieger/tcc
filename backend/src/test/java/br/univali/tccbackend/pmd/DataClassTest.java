package br.univali.tccbackend.pmd;

class DataClassTest extends PmdTest {

  @Override
  String getInputCode() {
    return "public class DataClass {\n"
        + "\n"
        + "  public int bar = 0;\n"
        + "  public int na = 0;\n"
        + "  public int bee = 0;\n"
        + "\n"
        + "  public void setBee(int n) {\n"
        + "    bee = n;\n"
        + "  }\n"
        + "}";
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
        + "\"endline\":10,"
        + "\"endcolumn\":1,"
        + "\"description\":\"The class 'DataClass' is suspected to be a Data Class (WOC=0.000%, NOPA=3, NOAM=1, WMC=1)\","
        + "\"rule\":\"DataClass\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#dataclass\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }

}
