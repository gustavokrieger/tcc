package com;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.Reader;

public final class CodeAnalysisParser {

  private CodeAnalysisParser() {
  }

  public static JsonObject parseJson(Reader json) {
    JsonParser jsonParser = new JsonParser();
    return jsonParser.parse(json).getAsJsonObject();
  }

}
