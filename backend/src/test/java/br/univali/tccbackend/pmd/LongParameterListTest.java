package br.univali.tccbackend.pmd;

class LongParameterListTest extends PmdTest {

  @Override
  String getInputCode() {
    String parameters = getParameters();
    return "public class LongParameter {\n"
        + "\n"
        + "  public void addPerson(" + parameters + ") {\n"
        + "    return;\n"
        + "  }\n"
        + "\n"
        + "}";
  }

  private String getParameters() {
    int numberOfParameters = 5;
    String parameter = "int foo";
    StringBuilder parameters = new StringBuilder();
    for (int i = 1; i < numberOfParameters; i++) {
      parameters.append(parameter).append(i).append(", ");
    }
    parameters.append(parameter);
    return parameters.toString();
  }

  @Override
  String getExpectedResult() {
    return "{\"formatVersion\":0,"
        + "\"pmdVersion\":\"" + PMD_VERSION + "\","
        + "\"timestamp\":\"\","
        + "\"files\":["
        + "{\"filename\":\"\","
        + "\"violations\":["
        + "{\"beginline\":3,"
        + "\"begincolumn\":24,"
        + "\"endline\":3,"
        + "\"endcolumn\":72,"
        + "\"description\":\"Avoid long parameter lists.\","
        + "\"rule\":\"ExcessiveParameterList\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#excessiveparameterlist\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }

}
