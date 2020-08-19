package com.pmd;

import com.CodeAnalysisParser;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class PmdRunner {

  private final String directoryWithFilesToAnalyze;

  PmdRunner(String directoryWithFilesToAnalyze) {
    this.directoryWithFilesToAnalyze = directoryWithFilesToAnalyze;
  }

  public PmdRunner(Path directoryWithFilesToAnalyze) {
    this(directoryWithFilesToAnalyze.toString());
  }

  public PmdAnalysisResult run() throws IOException {
    // m todo trocar essa parte por decorator pattern ou AOP (olhar anotação)
    Path pmdResultFile = Files.createTempFile("pmd-report", "");
    try {
      return runPmd(pmdResultFile);
    } finally {
      Files.delete(pmdResultFile);
    }
  }

  private PmdAnalysisResult runPmd(Path fileToWriteTheResult) throws IOException {
    getPmdResult(fileToWriteTheResult);
    return convertPmdResult(fileToWriteTheResult);
  }

  private void getPmdResult(Path fileToWriteTheResult) {
    Pmd pmd = new Pmd();
    pmd.configure(this.directoryWithFilesToAnalyze, fileToWriteTheResult.toString());
    pmd.analyze();
  }

  private PmdAnalysisResult convertPmdResult(Path pmdResultFile) throws IOException {
    JsonObject pmdAnalysisResult;
    try (BufferedReader bufferedReader = Files.newBufferedReader(pmdResultFile)) {
      pmdAnalysisResult = CodeAnalysisParser.parseJson(bufferedReader);
    }
    return new PmdAnalysisResult(pmdAnalysisResult);
  }

}
