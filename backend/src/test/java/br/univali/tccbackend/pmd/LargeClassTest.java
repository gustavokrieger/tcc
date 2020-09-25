package br.univali.tccbackend.pmd;

class LargeClassTest extends PmdTest {

  final int NUMBER_OF_REPETITIONS = 98;

  @Override
  String getInputCode() {
    return "public class Foo {\n"
        + "\n"
        + "    public void bar1() {\n"
        + "        System.out.println(\"\");\n".repeat(NUMBER_OF_REPETITIONS)
        + "    }\n"
        + "\n"
        + "    public void bar2() {\n"
        + "        System.out.println(\"\");\n".repeat(NUMBER_OF_REPETITIONS)
        + "    }\n"
        + "\n"
        + "    public void bar3() {\n"
        + "        System.out.println(\"\");\n".repeat(NUMBER_OF_REPETITIONS)
        + "    }\n"
        + "\n"
        + "    public void bar4() {\n"
        + "        System.out.println(\"\");\n".repeat(NUMBER_OF_REPETITIONS)
        + "    }\n"
        + "\n"
        + "    public void bar5() {\n"
        + "        System.out.println(\"\");\n".repeat(NUMBER_OF_REPETITIONS)
        + "    }\n"
        + "\n"
        + "    public void bar6() {\n"
        + "        System.out.println(\"\");\n".repeat(NUMBER_OF_REPETITIONS)
        + "    }\n"
        + "\n"
        + "    public void bar7() {\n"
        + "        System.out.println(\"\");\n".repeat(NUMBER_OF_REPETITIONS)
        + "    }\n"
        + "\n"
        + "    public void bar8() {\n"
        + "        System.out.println(\"\");\n".repeat(NUMBER_OF_REPETITIONS)
        + "    }\n"
        + "\n"
        + "    public void bar9() {\n"
        + "        System.out.println(\"\");\n".repeat(NUMBER_OF_REPETITIONS)
        + "    }\n"
        + "\n"
        + "    public void bar10() {\n"
        + "        System.out.println(\"\");\n".repeat(NUMBER_OF_REPETITIONS)
        + "    }\n"
        + "\n"
        + "}\n";
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
        + "\"endline\":1013,"
        + "\"endcolumn\":1,"
        + "\"description\":\"Avoid really long classes.\","
        + "\"rule\":\"ExcessiveClassLength\","
        + "\"ruleset\":\"Design\","
        + "\"priority\":3,"
        + "\"externalInfoUrl\":\"" + PMD_RULES_URL + "#excessiveclasslength\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }
}
