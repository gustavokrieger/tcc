package br.univali.tccbackend.pmd;

class LongMethodTest implements PmdTest {

  public String getInputCode() {
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

  public String getExpectedResult() {
    return "{\"formatVersion\":0,"
        + "\"pmdVersion\":\"6.26.0\","
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
        + "\"externalInfoUrl\":\"https://pmd.github.io/pmd-6.26.0/pmd_rules_java_design.html#excessivemethodlength\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }
}
