package br.univali.tccbackend;

import br.univali.tccbackend.pmd.PmdAnalysisResult;
import br.univali.tccbackend.pmd.PmdRunner;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collection;
import javax.servlet.http.Part;

public class CodeFilesService {

  private final Collection<Part> requestParts;

  public CodeFilesService(Collection<Part> requestParts) {
    this.requestParts = requestParts;
  }

  public PmdAnalysisResult runPmdAnalysis() throws IOException {
    // m todo trocar essa parte por decorator pattern ou AOP (olhar anotação)
    Path directoryToHoldCodeFiles = Files.createTempDirectory("");
    try {
      writeRequestFilesIntoDirectory(directoryToHoldCodeFiles);
      return runPmdAnalysisOnDirectory(directoryToHoldCodeFiles);
    } finally {
      FileUtilities.deleteDirectoryRecursively(directoryToHoldCodeFiles);
    }
  }

  private void writeRequestFilesIntoDirectory(Path directory) throws IOException {
    for (Part part : this.requestParts) {
      String fileName = part.getSubmittedFileName();
      Path pathToWriteFileInto = directory.resolve(fileName);
      part.write(pathToWriteFileInto.toString());
    }
  }

  private PmdAnalysisResult runPmdAnalysisOnDirectory(Path directory) throws IOException {
    PmdRunner pmdRunner = new PmdRunner(directory);
    return pmdRunner.run();
  }

}
