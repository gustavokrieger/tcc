package com;

import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

class Violations {

    private List<JsonObject> violations = new ArrayList<>();

    void add(JsonObject jsonObject) {
        violations.add(jsonObject);
    }

}
