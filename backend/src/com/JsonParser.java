package com;

import com.wrappers.gson.JsonObject;

import java.io.Reader;

final class JsonParser {

    private JsonParser() {
    }

    static JsonObject parse(Reader json) {
        var jsonParser = new com.google.gson.JsonParser();
        return new JsonObject(jsonParser.parse(json).getAsJsonObject());
    }

}
