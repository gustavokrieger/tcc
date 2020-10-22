package br.univali.tccbackend.pmd;

class FeatureEnvyTest extends PmdTest {

  @Override
  String getInputCode() {
    return "import blah.blah.Baz;\n".repeat(15)
        + "\n"
        + "public class Foo {\n"
        + "    public void doWork() {}\n"
        + "\n"
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
        + "\"begincolumn\":1,"
        + "\"endline\":20,"
        + "\"endcolumn\":1,"
        + "\"description\":\"A high number of imports can indicate a high degree of coupling within an object.\","
        + "\"rule\":\"ExcessiveImports\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#excessiveimports\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }
}
