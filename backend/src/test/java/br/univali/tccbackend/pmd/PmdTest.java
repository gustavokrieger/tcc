package br.univali.tccbackend.pmd;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.io.IOException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public abstract class PmdTest {

  final protected String PMD_VERSION = "6.29.0";
  final protected String PMD_RULES_URL =
      "https://pmd.github.io/pmd-" + PMD_VERSION + "/pmd_rules_java_design.html";

  @Test
  void testCompleteExecutionTemplateMethod() throws IOException {
    String code = getInputCode();
    PmdAnalysisResult pmdAnalysisResult = getPmdAnalysisResult(code);
    String expectedResult = getExpectedResult();
    Assertions.assertEquals(expectedResult, pmdAnalysisResult.toString());
  }

  protected abstract String getInputCode();

  private PmdAnalysisResult getPmdAnalysisResult(String code) throws IOException {
    PmdRunner pmdRunner = new TextPmdRunner(code);
    PmdAnalysisResult pmdAnalysisResult = pmdRunner.run();
    removeDataThatVaries(pmdAnalysisResult);
    return pmdAnalysisResult;
  }

  private void removeDataThatVaries(PmdAnalysisResult pmdAnalysisResult) {
    removeTimestamp(pmdAnalysisResult);
    removeFilenames(pmdAnalysisResult);
  }

  private void removeTimestamp(PmdAnalysisResult pmdAnalysisResult) {
    pmdAnalysisResult.addProperty("timestamp", "");
  }

  private void removeFilenames(PmdAnalysisResult pmdAnalysisResult) {
    JsonArray files = pmdAnalysisResult.getAsJsonArray("files");
    for (JsonElement file : files) {
      JsonObject fileAsJsonObject = file.getAsJsonObject();
      fileAsJsonObject.addProperty("filename", "");
    }
  }

  protected String getExpectedResult() {
    return "{\"formatVersion\":0,"
        + "\"pmdVersion\":\"" + PMD_VERSION + "\","
        + "\"timestamp\":\"\","
        + "\"files\":[],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }

}
