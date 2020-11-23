package br.univali.tccbackend.pmd;

import br.univali.tccbackend.ContextValues;
import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import javax.naming.NamingException;

class TextPmdRunner implements PmdRunner {

  private final String code;
  private final ContextValues contextValues;

  TextPmdRunner(String code, ContextValues contextValues) {
    this.code = code;
    this.contextValues = contextValues;
  }

  public PmdAnalysisResult run() throws IOException, NamingException {
    Path codeFile = createTemporaryFileWithCode();
    return runPmdAndDeleteFile(codeFile);
  }

  private Path createTemporaryFileWithCode() throws IOException {
    Path codeFile = Files.createTempFile("test-code", "");
    try {
      writeTextToFile(this.code, codeFile);
    } catch (IOException | RuntimeException e) {
      Files.delete(codeFile);
      throw e;
    }
    return codeFile;
  }

  private static void writeTextToFile(String text, Path file) throws IOException {
    try (BufferedWriter bufferedWriter = Files.newBufferedWriter(file)) {
      bufferedWriter.write(text);
    }
  }

  private PmdAnalysisResult runPmdAndDeleteFile(Path codeFile)
      throws IOException, NamingException {
    try {
      return runPmd(codeFile);
    } finally {
      Files.delete(codeFile);
    }
  }

  private PmdAnalysisResult runPmd(Path file) throws IOException, NamingException {
    PmdRunner pmdRunner = new FilePmdRunner(file, contextValues);
    return pmdRunner.run();
  }

}
