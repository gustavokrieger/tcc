package com.pmd;

import com.google.gson.JsonObject;

public class PmdAnalysisResult {

  private final JsonObject pmdAnalysisResult;

  PmdAnalysisResult(JsonObject pmdAnalysisResult) {
    this.pmdAnalysisResult = pmdAnalysisResult;
  }

  public String toString() {
    return pmdAnalysisResult.toString();
  }

}
