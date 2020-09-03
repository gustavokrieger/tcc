package br.univali.tccbackend.pmd;

class LongParameterListTest extends PmdTest {

  String getInputCode() {
    return "package com;\n"
        + "\n"
        + "public class ExampleLongParameter {\n"
        + "\n"
        + "  public void addPerson(\n"
        + "      int birthYear, int birthMonth, int birthDate, int height, int weight, int a, int b, int c,\n"
        + "      int d, int e) {\n"
        + "    return;\n"
        + "  }\n"
        + "\n"
        + "}";
  }

  String getExpectedResult() {
    return "{\"formatVersion\":0,"
        + "\"pmdVersion\":\"" + PMD_VERSION + "\","
        + "\"timestamp\":\"\","
        + "\"files\":["
        + "{\"filename\":\"\","
        + "\"violations\":["
        + "{\"beginline\":5,"
        + "\"begincolumn\":24,"
        + "\"endline\":7,"
        + "\"endcolumn\":19,"
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
