package com.pmd;

import com.CodeAnalysisParser;
import com.google.gson.JsonObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class PmdRunner {

    public JsonObject run(String inputPaths) throws IOException {
        // todo passar para métodos
        Path reportFile = Files.createTempFile("pmd-report", null);

        try {
            Pmd pmd = new Pmd();
            pmd.configure(inputPaths, reportFile.toString());
            pmd.analyze();

            try (BufferedReader bufferedReader = Files.newBufferedReader(reportFile)) {
                return CodeAnalysisParser.parseJson(bufferedReader);
            }
        } finally {
            Files.delete(reportFile);
        }
    }

}
