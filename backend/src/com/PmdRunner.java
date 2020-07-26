package com;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

final class PmdRunner {

    CodeAnalysis run(String inputPaths) throws IOException {
        // todo passar para métodos
        File file = File.createTempFile("pmd-report", null);
        file.deleteOnExit();
        String reportFile = file.getPath();

        Pmd pmd = new Pmd();
        pmd.configure(inputPaths, reportFile);
        pmd.analyze();

        try (BufferedReader bufferedReader = new BufferedReader(new FileReader(reportFile))) {
            return CodeAnalysisParser.parseJson(bufferedReader);
        }
    }

}
