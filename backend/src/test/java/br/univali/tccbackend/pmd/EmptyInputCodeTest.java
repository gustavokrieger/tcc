package br.univali.tccbackend.pmd;

class EmptyInputCodeTest extends PmdTest {

  @Override
  String getInputCode() {
    return "";
  }

  @Override
  String getExpectedResult() {
    return "{\"formatVersion\":0,"
        + "\"pmdVersion\":\"" + PMD_VERSION + "\","
        + "\"timestamp\":\"\","
        + "\"files\":[],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }

}
