package br.univali.tccbackend.pmd;

import br.univali.tccbackend.CodeAnalysisParser;
import br.univali.tccbackend.ContextValues;
import com.google.gson.JsonObject;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import javax.naming.NamingException;

public class FilePmdRunner implements PmdRunner {

  private final String fileOrDirectoryToAnalyze;
  private final ContextValues contextValues;

  public FilePmdRunner(Path fileOrDirectoryToAnalyze, ContextValues contextValues) {
    this(fileOrDirectoryToAnalyze.toString(), contextValues);
  }

  private FilePmdRunner(String fileOrDirectoryToAnalyze, ContextValues contextValues) {
    this.fileOrDirectoryToAnalyze = fileOrDirectoryToAnalyze;
    this.contextValues = contextValues;
  }

  public PmdAnalysisResult run() throws IOException, NamingException {
    Path pmdResultFile = Files.createTempFile("pmd-report", "");
    try {
      return runPmd(pmdResultFile);
    } finally {
      Files.delete(pmdResultFile);
    }
  }

  private PmdAnalysisResult runPmd(Path fileToWriteTheResultInto)
      throws IOException, NamingException {
    getPmdResult(fileToWriteTheResultInto);
    return convertPmdResult(fileToWriteTheResultInto);
  }

  private void getPmdResult(Path fileToWriteTheResultInto) throws NamingException {
    Pmd pmd = new Pmd(contextValues);
    pmd.configure(this.fileOrDirectoryToAnalyze, fileToWriteTheResultInto.toString());
    pmd.analyze();
  }

  private static PmdAnalysisResult convertPmdResult(Path pmdResultFile) throws IOException {
    JsonObject pmdAnalysisResult;
    try (BufferedReader bufferedReader = Files.newBufferedReader(pmdResultFile)) {
      pmdAnalysisResult = CodeAnalysisParser.parseJson(bufferedReader);
    }
    return new PmdAnalysisResult(pmdAnalysisResult);
  }

}
