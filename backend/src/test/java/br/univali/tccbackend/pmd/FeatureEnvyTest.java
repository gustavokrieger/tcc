package br.univali.tccbackend.pmd;

class FeatureEnvyTest extends PmdTest {

  @Override
  protected String getInputCode() {
    return "public class Foo {\n"
        + "    /**\n"
        + "     * This example will result in two violations.\n"
        + "     */\n"
        + "    public void example(Bar b) {\n"
        + "        // this method call is ok, as b is a parameter of \"example\"\n"
        + "        C c = b.getC();\n"
        + "\n"
        + "        // this method call is a violation, as we are using c, which we got from B.\n"
        + "        // We should ask b directly instead, e.g. \"b.doItOnC();\"\n"
        + "        c.doIt();\n"
        + "\n"
        + "        // this is also a violation, just expressed differently as a method chain without temporary variables.\n"
        + "        b.getC().doIt();\n"
        + "\n"
        + "        // a constructor call, not a method call.\n"
        + "        D d = new D();\n"
        + "        // this method call is ok, because we have create the new instance of D locally.\n"
        + "        d.doSomethingElse();\n"
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
        + "{\"beginline\":11,"
        + "\"begincolumn\":9,"
        + "\"endline\":11,"
        + "\"endcolumn\":16,"
        + "\"description\":\"Potential violation of Law of Demeter (object not created locally)\","
        + "\"rule\":\"LawOfDemeter\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#lawofdemeter\"},"
        + "{\"beginline\":14,"
        + "\"begincolumn\":9,"
        + "\"endline\":14,"
        + "\"endcolumn\":23,"
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
