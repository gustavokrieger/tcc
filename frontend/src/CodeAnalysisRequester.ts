import assert from 'assert';
import * as pmdTypes from './pmdTypes';
import JavaFiles from './JavaFiles';
import EnvironmentVariablesUtility from './EnvironmentVariablesUtility';

export default class CodeAnalysisRequester {
  private readonly javaFiles: JavaFiles;

  constructor(javaFiles: JavaFiles) {
    this.javaFiles = javaFiles;
  }

  async sendAndGetReport(): Promise<pmdTypes.Report> {
    const request = this.createRequest();
    const response = await CodeAnalysisRequester.sendRequest(request);
    return response.json();
  }

  private createRequest(): Request {
    const input = EnvironmentVariablesUtility.backEndUrl;
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
