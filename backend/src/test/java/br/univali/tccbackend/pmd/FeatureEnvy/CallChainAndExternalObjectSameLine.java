package br.univali.tccbackend.pmd.FeatureEnvy;

import br.univali.tccbackend.pmd.PmdTest;

class CallChainAndExternalObjectSameLine extends PmdTest {

  @Override
  protected String getInputCode() {
    return "public class Foo {\n"
        + "\n"
        + "    public void example(Bar b) {\n"
        + "        C c = b.getC();\n"
        + "        c.doIt().doSomethingElse();\n"
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
        + "{\"beginline\":5,"
        + "\"begincolumn\":9,"
        + "\"endline\":5,"
        + "\"endcolumn\":34,"
        + "\"description\":\"Potential violation of Law of Demeter (method chain calls)\","
        + "\"rule\":\"LawOfDemeter\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#lawofdemeter\"},"
        + "{\"beginline\":5,"
        + "\"begincolumn\":9,"
        + "\"endline\":5,"
        + "\"endcolumn\":34,"
        + "\"description\":\"Potential violation of Law of Demeter (object not created locally)\","
        + "\"rule\":\"LawOfDemeter\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#lawofdemeter\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }
}
