package com.wrappers.gson;

public final class JsonObject {

    private final com.google.gson.JsonObject innerJsonObject;

    public JsonObject() {
        innerJsonObject = new com.google.gson.JsonObject();
    }

    public JsonObject(com.google.gson.JsonObject innerJsonObject) {
        this.innerJsonObject = innerJsonObject;
    }

}
