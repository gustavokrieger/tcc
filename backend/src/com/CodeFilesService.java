package com;

import com.google.gson.JsonObject;
import com.pmd.PmdRunner;
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

  public JsonObject runPmdAnalysis() throws IOException {
    // m todo trocar essa parte por decorator pattern ou AOP
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

  private JsonObject runPmdAnalysisOnDirectory(Path directory) throws IOException {
    PmdRunner pmdRunner = new PmdRunner(directory);
    return pmdRunner.run();
  }

}
