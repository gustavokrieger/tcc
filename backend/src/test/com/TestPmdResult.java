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
    // todo revisar daqui para baixo
  void name() throws IOException {

    String code = "package com;\n"
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

    Path pmdResultFile = Files.createTempFile("pmd-report", "");
    PmdAnalysisResult actualResult;
    try {
      try (BufferedWriter bufferedWriter = Files.newBufferedWriter(pmdResultFile)) {
        bufferedWriter.write(code);
      }
      PmdRunner pmdRunner = new PmdRunner(pmdResultFile);
      actualResult = pmdRunner.run();
    } finally {
      Files.delete(pmdResultFile);
    }
    removeVariableData(actualResult);
    String expectedResult = "{\"formatVersion\":0,\"pmdVersion\":\"6.25.0\",\"timestamp\":\"\",\"files\":[{\"filename\":\"\",\"violations\":[{\"beginline\":5,\"begincolumn\":24,\"endline\":7,\"endcolumn\":19,\"description\":\"Avoid long parameter lists.\",\"rule\":\"ExcessiveParameterList\",\"ruleset\":\"Design\",\"priority\":3,\"externalInfoUrl\":\"https://pmd.github.io/pmd-6.25.0/pmd_rules_java_design.html#excessiveparameterlist\"}]}],\"suppressedViolations\":[],\"processingErrors\":[],\"configurationErrors\":[]}";
    Assertions.assertEquals(expectedResult, actualResult.toString());
  }

  private void removeVariableData(PmdAnalysisResult pmdAnalysisResult) {
    pmdAnalysisResult.addProperty("timestamp", "");
    JsonArray jsonArray = pmdAnalysisResult.getAsJsonArray("files");
    for (JsonElement jsonElement : jsonArray) {
      JsonObject jsonObject = jsonElement.getAsJsonObject();
      jsonObject.addProperty("filename", "");
    }
  }

}
