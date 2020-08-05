package com;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.Reader;

final class CodeAnalysisParser {

    private CodeAnalysisParser() {
    }

    static CodeAnalysis parseJson(Reader json) {
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = jsonParser.parse(json).getAsJsonObject();
        return new CodeAnalysis(jsonObject);
    }

}
