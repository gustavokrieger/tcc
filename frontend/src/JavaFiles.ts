export default class JavaFiles {
  private readonly array: File[];

  private constructor(files: File[]) {
    this.array = files;
  }

  static createEmpty(): JavaFiles {
    return new JavaFiles([]);
  }

  static fromListRemovingNonJava(fileList: FileList): JavaFiles {
    const files = Array.from(fileList);
    return this.createRemovingNonJava(files);
  }

  private static createRemovingNonJava(files: File[]): JavaFiles {
    const javaFiles = files.filter(this.hasJavaExtension);
    return new JavaFiles(javaFiles);
  }

  private static hasJavaExtension(file: File) {
    const fileNameParts = file.name.split('.');
    if (fileNameParts.length === 0) {
      return false;
    }
    return fileNameParts[fileNameParts.length - 1] === 'java';
  }

  getAll(): readonly File[] {
    const copy = [...this.array];
    return Object.freeze(copy);
  }

  isEmpty() {
    return this.array.length === 0;
  }
}
