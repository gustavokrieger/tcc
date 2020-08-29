package test.com;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.pmd.PmdAnalysisResult;
import com.pmd.PmdRunner;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class TestPmdResult {

  @Test
  void testLongParameterList() throws IOException {
    Path codeFile = getCodeFileWithLongParameterList();
    PmdAnalysisResult actualResult = runPmdAndDeleteFile(codeFile);
    removeDataThatVaries(actualResult);
    String expectedResult = getLongParameterListExpectedResult();
    Assertions.assertEquals(expectedResult, actualResult.toString());
  }

  private Path getCodeFileWithLongParameterList() throws IOException {
    String code = getCodeWithLongParameterList();
    Path codeFile = Files.createTempFile("test-code", "");
    try {
      writeTextToFile(code, codeFile);
    } catch (Exception e) {
      Files.delete(codeFile);
      throw e;
    }
    return codeFile;
  }

  private String getCodeWithLongParameterList() {
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

  private void writeTextToFile(String text, Path file) throws IOException {
    try (BufferedWriter bufferedWriter = Files.newBufferedWriter(file)) {
      bufferedWriter.write(text);
    }
  }

  private PmdAnalysisResult runPmdAndDeleteFile(Path codeFile) throws IOException {
    try {
      return runPmd(codeFile);
    } finally {
      Files.delete(codeFile);
    }
  }

  private PmdAnalysisResult runPmd(Path file) throws IOException {
    PmdRunner pmdRunner = new PmdRunner(file);
    return pmdRunner.run();
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

  private String getLongParameterListExpectedResult() {
    return "{\"formatVersion\":0,"
        + "\"pmdVersion\":\"6.25.0\","
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
        + "\"externalInfoUrl\":\"https://pmd.github.io/pmd-6.25.0/pmd_rules_java_design.html#excessiveparameterlist\"}]}],"
        + "\"suppressedViolations\":[],"
        + "\"processingErrors\":[],"
        + "\"configurationErrors\":[]}";
  }

}
