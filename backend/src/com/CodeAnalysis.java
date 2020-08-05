package com;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

final class CodeAnalysis {

    private final JsonObject jsonObject;

    CodeAnalysis(JsonObject jsonObject) {
        this.jsonObject = jsonObject;
    }

    public JsonArray getAsJsonArray(String memberName) {
        return jsonObject.getAsJsonArray(memberName);
    }

}
