package br.univali.tccbackend.pmd;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class PmdAnalysisResult {

  private final JsonObject jsonObject;

  PmdAnalysisResult(JsonObject jsonObject) {
    this.jsonObject = jsonObject;
  }

  public String toString() {
    return jsonObject.toString();
  }

  public void addProperty(String property, String value) {
    jsonObject.addProperty(property, value);
  }

  public JsonArray getAsJsonArray(String memberName) {
    return jsonObject.getAsJsonArray(memberName);
  }

}
