import assert from 'assert';
import * as pmdOutput from './pmdOutput';
import JavaFiles from './JavaFiles';

export default class CodeAnalysisRequester {
  private readonly javaFiles: JavaFiles;

  constructor(javaFiles: JavaFiles) {
    this.javaFiles = javaFiles;
  }

  async sendAndGetReport(): Promise<pmdOutput.Report> {
    const request = this.createRequest();
    const response = await CodeAnalysisRequester.sendRequest(request);
    return response.json();
  }

  private createRequest(): Request {
    const input = 'http://localhost:8080/tcc_backend_war_exploded/code-files';
    const formData = this.createFormDataWithFiles();
    const init = {
      method: 'POST',
      body: formData,
    };
    return new Request(input, init);
  }

  private createFormDataWithFiles(): FormData {
    const formData = new FormData();
    for (const file of this.javaFiles.getAll()) {
      // @ts-ignore
      const relativePath = file.webkitRelativePath; // Non-standard.
      formData.append(file.name, file, relativePath);
    }
    return formData;
  }

  private static async sendRequest(request: Request) {
    const response = await fetch(request);
    assert(response.ok);
    return response;
  }
}
