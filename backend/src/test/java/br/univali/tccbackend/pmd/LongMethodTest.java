package br.univali.tccbackend.pmd;

class LongMethodTest extends PmdTest {

  String getInputCode() {
    return "package com;\n"
        + "\n"
        + "class Example {\n"
        + "\n"
        + "    void test(){\n"
        + "        System.out.println(\"\");\n".repeat(100)
        + "    }\n"
        + "\n"
        + "}\n";
  }

  String getExpectedResult() {
    return "{\"formatVersion\":0,"
        + "\"pmdVersion\":\"" + PMD_VERSION + "\","
        + "\"timestamp\":\"\","
        + "\"files\":["
        + "{\"filename\":\"\","
        + "\"violations\":["
        + "{\"beginline\":5,"
        + "\"begincolumn\":5,"
        + "\"endline\":106,"
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
