export default class SynchronousFile {
  private readonly file: File;
  private readonly _text: string;

  private constructor(file: File, text: string) {
    this.file = file;
    this._text = text;
  }

  static async fromFile(file: File) {
    const text = await file.text();
    return new SynchronousFile(file, text);
  }

  get text(): string {
    return this._text;
  }

  name(): string {
    return this.file.name;
  }
}
