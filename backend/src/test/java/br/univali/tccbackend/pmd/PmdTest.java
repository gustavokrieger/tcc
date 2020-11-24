package br.univali.tccbackend.pmd;

import br.univali.tccbackend.ContextValues;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.nio.file.Path;
import javax.naming.NamingException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public abstract class PmdTest {

  final protected String PMD_VERSION = "6.29.0";
  final protected String PMD_RULES_URL =
      "https://pmd.github.io/pmd-" + PMD_VERSION + "/pmd_rules_java_design.html";

  @Test
  void testCompleteExecutionTemplateMethod() throws IOException, NamingException {
    String code = getInputCode();
    PmdAnalysisResult pmdAnalysisResult = getPmdAnalysisResult(code);
    String expectedResult = getExpectedResult();
    Assertions.assertEquals(expectedResult, pmdAnalysisResult.toString());
  }

  protected abstract String getInputCode();

  private PmdAnalysisResult getPmdAnalysisResult(String code) throws IOException, NamingException {
    ContextValues contextValues = getMockedContextValues();
    PmdRunner pmdRunner = new TextPmdRunner(code, contextValues);
    PmdAnalysisResult pmdAnalysisResult = pmdRunner.run();
    removeDataThatVaries(pmdAnalysisResult);
    return pmdAnalysisResult;
  }

  private ContextValues getMockedContextValues() throws NamingException {
    ContextValues contextValues = Mockito.mock(ContextValues.class);
    Path rulesetFile = Path.of("pmd-ruleset.xml").toAbsolutePath();
    Mockito.when(contextValues.lookupPmdRulesetPath()).thenReturn(rulesetFile.toString());
    return contextValues;
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
