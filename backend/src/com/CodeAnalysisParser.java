package com;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.Reader;

final class CodeAnalysisParser {

    private CodeAnalysisParser() {
    }

    static CodeAnalysis parseJson(Reader json) {
        JsonParser jsonParser = new JsonParser();
        JsonElement jsonElement = jsonParser.parse(json);
        JsonObject jsonObject = jsonElement.getAsJsonObject();
        return new CodeAnalysis(jsonObject);
    }

}
