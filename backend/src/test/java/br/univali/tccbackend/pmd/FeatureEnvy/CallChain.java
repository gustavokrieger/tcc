package br.univali.tccbackend.pmd.FeatureEnvy;

import br.univali.tccbackend.pmd.PmdTest;

class CallChain extends PmdTest {

  @Override
  protected String getInputCode() {
    return "public class Foo {\n"
        + "\n"
        + "    public void example() {\n"
        + "        getB().getC();\n"
        + "    }\n"
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
        + "{\"beginline\":4,"
        + "\"begincolumn\":9,"
        + "\"endline\":4,"
        + "\"endcolumn\":21,"
        + "\"description\":\"Potential violation of Law of Demeter (method chain calls)\","
        + "\"rule\":\"LawOfDemeter\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#lawofdemeter\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }
}
