package com.pmd;

import com.CodeAnalysisParser;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class PmdRunner {

  private final String directoryWithFilesToAnalyze;

  public PmdRunner(Path directoryWithFilesToAnalyze) {
    this(directoryWithFilesToAnalyze.toString());
  }

  PmdRunner(String directoryWithFilesToAnalyze) {
    this.directoryWithFilesToAnalyze = directoryWithFilesToAnalyze;
  }

  public JsonObject run() throws IOException {
    // todo trocar essa parte por decorator pattern ou AOP
    Path pmdResultFile = Files.createTempFile("pmd-report", null);
    try {
      return runPmd(pmdResultFile);
    } finally {
      Files.delete(pmdResultFile);
    }
  }

  private JsonObject runPmd(Path fileToWriteTheResult) throws IOException {
    getPmdResult(fileToWriteTheResult);
    return convertPmdResult(fileToWriteTheResult);
  }

  private void getPmdResult(Path fileToWriteTheResult) {
    Pmd pmd = new Pmd();
    pmd.configure(this.directoryWithFilesToAnalyze, fileToWriteTheResult.toString());
    pmd.analyze();
  }

  private JsonObject convertPmdResult(Path pmdResultFile) throws IOException {
    try (BufferedReader bufferedReader = Files.newBufferedReader(pmdResultFile)) {
      return CodeAnalysisParser.parseJson(bufferedReader);
    }
  }

}
