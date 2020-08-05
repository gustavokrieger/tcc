package com.pmd;

import com.CodeAnalysis;
import com.CodeSmellOccurrences;
import com.CodeSmellType;
import com.Violations;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

class PmdCodeSmellOccurrences implements CodeSmellOccurrences {

    CodeAnalysis codeAnalysis;

    PmdCodeSmellOccurrences(CodeAnalysis codeAnalysis) {
        this.codeAnalysis = codeAnalysis;
    }

    @Override
    public Violations getAllOfType(CodeSmellType codeSmellType) {
        JsonArray files = codeAnalysis.getAsJsonArray("files");
        Violations matches = new Violations();

        for (JsonElement file : files) {
            JsonArray violations = file.getAsJsonObject().getAsJsonArray("violations");
            for (JsonElement violation : violations) {
                String rule = violation.getAsJsonObject().getAsJsonPrimitive("rule").getAsString();
                if (rule.equals(codeSmellType.value())) {
                    // todo fazer conversão para objeto Violation
                }
            }
        }

        return matches;
    }

}
