package br.univali.tccbackend;

import br.univali.tccbackend.pmd.FilePmdRunner;
import br.univali.tccbackend.pmd.PmdAnalysisResult;
import br.univali.tccbackend.pmd.PmdRunner;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import javax.naming.NamingException;
import javax.servlet.http.Part;

public class CodeFilesService {

  private final Iterable<Part> requestParts;

  public CodeFilesService(Iterable<Part> requestParts) {
    this.requestParts = requestParts;
  }

  public PmdAnalysisResult runPmdAnalysis() throws IOException, NamingException {
    String directoryId = "CyXWc8mDSV";
    Path directoryToHoldCodeFiles = Files.createTempDirectory(directoryId);
    try {
      writeRequestFilesIntoDirectory(directoryToHoldCodeFiles);
      return runPmdAnalysisOnDirectory(directoryToHoldCodeFiles);
    } finally {
      FileUtilities.deleteDirectoryRecursively(directoryToHoldCodeFiles);
    }
  }

  private void writeRequestFilesIntoDirectory(Path directory) throws IOException {
    for (Part part : this.requestParts) {
      String[] relativeFilePath = part.getSubmittedFileName().split("/");
      String fileName = relativeFilePath[relativeFilePath.length - 1];
      String[] relativeFileLocation = Arrays.copyOf(
          relativeFilePath,
          relativeFilePath.length - 1
      );
      Path fileLocation = joinPath(directory, relativeFileLocation);
      Files.createDirectories(fileLocation);
      Path filePath = fileLocation.resolve(fileName);
      part.write(filePath.toString());
    }
  }

  private static Path joinPath(Path root, String... pathToAppend) {
    Path path = Path.of("", pathToAppend);
    return root.resolve(path);
  }

  private static PmdAnalysisResult runPmdAnalysisOnDirectory(Path directory)
      throws IOException, NamingException {
    PmdRunner pmdRunner = new FilePmdRunner(directory);
    return pmdRunner.run();
  }

}
