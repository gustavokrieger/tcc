package br.univali.tccbackend;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.stream.Stream;

public final class FileUtilities {

  private FileUtilities() {
  }

  public static void deleteDirectoryRecursively(Path directory) throws IOException {
    try (Stream<Path> directoryStream = Files.walk(directory)) {
      FileUtilities.deleteInnerFilesThanDirectory(directoryStream);
    }
  }

  private static void deleteInnerFilesThanDirectory(Stream<Path> directoryStream) {
    directoryStream
        .sorted(Comparator.reverseOrder())
        .map(Path::toFile)
        .forEach(File::delete);
  }

}
