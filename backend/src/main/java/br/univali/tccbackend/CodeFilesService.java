package br.univali.tccbackend;

import br.univali.tccbackend.pmd.PmdAnalysisResult;
import br.univali.tccbackend.pmd.FilePmdRunner;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import javax.servlet.http.Part;

public class CodeFilesService {

  private final Iterable<Part> requestParts;

  public CodeFilesService(Iterable<Part> requestParts) {
    this.requestParts = requestParts;
  }

  public PmdAnalysisResult runPmdAnalysis() throws IOException {
    // m todo trocar essa parte por decorator pattern ou AOP (olhar anotação)
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
      Path fileLocation = this.joinPath(directory, relativeFileLocation);
      Files.createDirectories(fileLocation);
      Path filePath = fileLocation.resolve(fileName);
      part.write(filePath.toString());
    }
  }

  private Path joinPath(Path root, String... pathToAppend) {
    Path path = Path.of("", pathToAppend);
    return root.resolve(path);
  }

  private PmdAnalysisResult runPmdAnalysisOnDirectory(Path directory) throws IOException {
    FilePmdRunner filePmdRunner = new FilePmdRunner(directory);
    return filePmdRunner.run();
  }

}
