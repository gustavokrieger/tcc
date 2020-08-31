package br.univali.tccbackend.pmd;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class PmdAnalysisResult {

  private final JsonObject pmdAnalysisResult;

  PmdAnalysisResult(JsonObject pmdAnalysisResult) {
    this.pmdAnalysisResult = pmdAnalysisResult;
  }

  public String toString() {
    return pmdAnalysisResult.toString();
  }

  public void addProperty(String property, String value) {
    pmdAnalysisResult.addProperty(property, value);
  }

  public JsonArray getAsJsonArray(String memberName) {
    return pmdAnalysisResult.getAsJsonArray(memberName);
  }

}
