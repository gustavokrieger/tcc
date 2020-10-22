package br.univali.tccbackend.pmd;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

class TextPmdRunner implements PmdRunner {

  private final String code;

  TextPmdRunner(String code) {
    this.code = code;
  }

  public PmdAnalysisResult run() throws IOException {
    Path codeFile = createTemporaryFileWithCode();
    return runPmdAndDeleteFile(codeFile);
  }

  private Path createTemporaryFileWithCode() throws IOException {
    Path codeFile = Files.createTempFile("test-code", "");
    try {
      writeTextToFile(this.code, codeFile);
    } catch (Exception e) {
      Files.delete(codeFile);
      throw e;
    }
    return codeFile;
  }

  private void writeTextToFile(String text, Path file) throws IOException {
    try (BufferedWriter bufferedWriter = Files.newBufferedWriter(file)) {
      bufferedWriter.write(text);
    }
  }

  private PmdAnalysisResult runPmdAndDeleteFile(Path codeFile) throws IOException {
    try {
      return runPmd(codeFile);
    } finally {
      Files.delete(codeFile);
    }
  }

  private PmdAnalysisResult runPmd(Path file) throws IOException {
    PmdRunner pmdRunner = new FilePmdRunner(file);
    return pmdRunner.run();
  }

}
